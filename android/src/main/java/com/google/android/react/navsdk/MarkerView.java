/**
 * Copyright 2025 Google LLC
 *
 * <p>Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file
 * except in compliance with the License. You may obtain a copy of the License at
 *
 * <p>http://www.apache.org/licenses/LICENSE-2.0
 *
 * <p>Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.google.android.react.navsdk;

import static java.security.AccessController.getContext;

import android.animation.ValueAnimator;
import android.annotation.SuppressLint;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.net.Uri;
import android.util.Base64;
import android.view.View;
import android.view.ViewGroup;
import android.view.animation.LinearInterpolator;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.constraintlayout.widget.ConstraintLayout;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.UiThreadUtil;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.UIManagerHelper;
import com.facebook.react.uimanager.events.Event;
import com.facebook.react.uimanager.events.EventDispatcher;
import com.facebook.react.views.view.ReactViewGroup;
import com.google.android.gms.maps.model.BitmapDescriptor;
import com.google.android.gms.maps.model.BitmapDescriptorFactory;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.Marker;
import com.google.android.gms.maps.model.MarkerOptions;
import java.io.InputStream;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

@SuppressLint("ViewConstructor")
public class MarkerView extends ConstraintLayout {
  private static final String TAG = "MarkerView";
  private static final Map<Marker, MarkerView> markers = new HashMap<>();
  private static final Map<View, View> iconViewSubViews = new HashMap<>();

  private final MarkerOptions options =
      new MarkerOptions().position(new LatLng(0, 0)).visible(true);
  private Marker marker;
  private final ViewGroup iconView;
  private boolean preventDefaultOnClick = false;
  @Nullable private MapViewController mapViewController;

  public MarkerView(ReactContext context) {
    super(context);

    iconView = new ReactViewGroup(getContext());
  }

  public void setMapViewController(@Nullable MapViewController mapViewController) {
    this.mapViewController = mapViewController;
  }

  public static MarkerView getMarkerView(Marker marker) {
    return markers.get(marker);
  }

  public boolean isPreventDefaultOnClick() {
    return preventDefaultOnClick;
  }

  public void setPreventDefaultOnClick(boolean preventDefaultOnClick) {
    this.preventDefaultOnClick = preventDefaultOnClick;
  }

  public void setVisible(boolean visible) {
    options.visible(visible);
    if (marker == null) {
      return;
    }

    marker.setVisible(visible);
  }

  public void setPosition(ReadableMap positionMap) {
    LatLng endPosition = ObjectTranslationUtil.getLatLngFromMap(positionMap.toHashMap());
    if (endPosition == null) {
      return;
    }

    options.position(endPosition);
    if (marker == null) {
      return;
    }

    ValueAnimator animator = ValueAnimator.ofFloat(0, 1);
    animator.setDuration(500);
    animator.setInterpolator(new LinearInterpolator());

    LatLng startPosition = marker.getPosition();
    double latDelta = endPosition.latitude - startPosition.latitude;
    double lngDelta = endPosition.longitude - startPosition.longitude;
    animator.addUpdateListener(
        animation -> {
          float fraction = animation.getAnimatedFraction();
          double lat = startPosition.latitude + latDelta * fraction;
          double lng = startPosition.longitude + lngDelta * fraction;
          marker.setPosition(new LatLng(lat, lng));
        });

    animator.start();
  }

  public void setImgPath(String imgPath) {
    if (imgPath == null || imgPath.isEmpty()) {
      return;
    }

    BitmapDescriptor bitmapDescriptor = BitmapDescriptorFactory.fromAsset(imgPath);
    options.icon(bitmapDescriptor);
    if (marker == null) {
      return;
    }

    marker.setIcon(bitmapDescriptor);
  }

  private synchronized void setIcon(BitmapDescriptor bitmapDescriptor) {
    options.icon(bitmapDescriptor);
    if (marker == null) {
      return;
    }

    marker.setIcon(bitmapDescriptor);
  }

  public void setImageSrc(ReadableMap imageSrcMap) {
    if (!imageSrcMap.hasKey(Constants.URI_KEY)) {
      return;
    }

    String uriString = imageSrcMap.getString(Constants.URI_KEY);
    Uri uri = Uri.parse(uriString);

    if (uri.getScheme() != null
        && (uri.getScheme().startsWith("http") || uri.getScheme().startsWith("https"))) {
      new Thread(
              () -> {
                try {
                  InputStream inputStream = new URL(uriString).openStream();
                  Bitmap bitmap = BitmapFactory.decodeStream(inputStream);
                  BitmapDescriptor bitmapDescriptor = BitmapDescriptorFactory.fromBitmap(bitmap);
                  setIcon(bitmapDescriptor);
                } catch (Exception e) {
                  throw new RuntimeException(e);
                }
              })
          .start();
    } else if (uri.getScheme() != null
        && (uri.getScheme().equals("file")
            || uri.getScheme().equals("content")
            || uri.getScheme().startsWith("data"))) {
      try {
        Bitmap bitmap;

        if (uriString != null && uri.getScheme().startsWith("data")) { // assuming base64 data
          final String base64Encoded = uriString.substring(uriString.indexOf(',') + 1);
          byte[] decodedBytes = Base64.decode(base64Encoded, Base64.DEFAULT);
          bitmap = BitmapFactory.decodeByteArray(decodedBytes, 0, decodedBytes.length);
        } else {
          InputStream inputStream = getContext().getContentResolver().openInputStream(uri);
          bitmap = BitmapFactory.decodeStream(inputStream);
        }

        if (bitmap == null) {
          return;
        }

        BitmapDescriptor bitmapDescriptor = BitmapDescriptorFactory.fromBitmap(bitmap);
        setIcon(bitmapDescriptor);
      } catch (Exception e) {
        throw new RuntimeException(e);
      }
    }
  }

  public void setTitle(String title) {
    options.title(title);
    if (marker == null) {
      return;
    }

    marker.setTitle(title);
  }

  public void setSnippet(String snippet) {
    options.snippet(snippet);
    if (marker == null) {
      return;
    }

    marker.setSnippet(snippet);
  }

  public void setAlpha(float alpha) {
    options.alpha(alpha);
    if (marker == null) {
      return;
    }

    marker.setAlpha(alpha);
  }

  public void setRotation(float rotation) {
    options.rotation(rotation);
    if (marker == null) {
      return;
    }

    ValueAnimator animator = ValueAnimator.ofFloat(0, 1);
    animator.setDuration(500);
    animator.setInterpolator(new LinearInterpolator());

    float startRotation = marker.getRotation();
    float delta = rotation - startRotation;
    animator.addUpdateListener(
        animation -> {
          float fraction = animation.getAnimatedFraction();
          marker.setRotation(startRotation + delta * fraction);
        });

    animator.start();
  }

  public void setDraggable(boolean draggable) {
    options.draggable(draggable);
    if (marker == null) {
      return;
    }

    marker.setDraggable(draggable);
  }

  public void setFlat(boolean flat) {
    options.flat(flat);
    if (marker == null) {
      return;
    }

    marker.setFlat(flat);
  }

  public void setGroundAnchor(@Nullable ReadableMap groundAnchorMap) {
    float x = (float) (groundAnchorMap != null ? groundAnchorMap.getDouble(Constants.X_KEY) : 0.5);
    float y = (float) (groundAnchorMap != null ? groundAnchorMap.getDouble(Constants.Y_KEY) : 1);

    options.anchor(x, y);
    if (marker == null) {
      return;
    }

    marker.setAnchor(x, y);
  }

  public void setZIndex(float zIndex) {
    options.zIndex(zIndex);
    if (marker == null) {
      return;
    }

    marker.setZIndex(zIndex);
  }

  public void handleOnPress() {
    emitEvent("onMarkerPress", null);
  }

  @Override
  protected void onDetachedFromWindow() {
    super.onDetachedFromWindow();

    if (marker != null) {
      marker.remove();
      markers.remove(marker);
    }

    iconViewSubViews.clear();
  }

  @Override
  public void addView(View iconSubView, int index) {
    iconView.addView(iconSubView, index);

    View viewKey = new View(getContext());
    iconViewSubViews.put(viewKey, iconSubView);

    super.addView(viewKey, index);
  }

  @Override
  public void removeView(View viewKey) {
    View iconSubView = iconViewSubViews.get(viewKey);
    if (iconSubView != null) {
      iconViewSubViews.remove(viewKey);
      iconView.removeView(iconSubView);
    }

    super.removeView(viewKey);
  }

  @Override
  protected void onLayout(boolean changed, int left, int top, int right, int bottom) {
    draw();
  }

  public void draw() {
    UiThreadUtil.runOnUiThread(
        () -> {
          int width = 0;
          int height = 0;

          for (Map.Entry<View, View> entry : iconViewSubViews.entrySet()) {
            height = Math.max(height, entry.getValue().getTop() + entry.getValue().getHeight());
            width = Math.max(width, entry.getValue().getLeft() + entry.getValue().getWidth());
          }

          if (width > 0 && height > 0) {
            iconView.layout(0, 0, width, height);

            Bitmap bitmap = Bitmap.createBitmap(width, height, Bitmap.Config.ARGB_8888);
            Canvas canvas = new Canvas(bitmap);
            iconView.draw(canvas);

            options.icon(BitmapDescriptorFactory.fromBitmap(bitmap));
          }

          if (marker == null && this.mapViewController != null) {
            marker = this.mapViewController.addMarkerView(options, null);
            markers.put(marker, this);
          } else if (marker != null) {
            marker.setIcon(options.getIcon());
          }
        });
  }

  private void emitEvent(String eventName, @Nullable WritableMap data) {
    if (getContext() != null) {
      ReactContext reactContext = (ReactContext) getContext();
      EventDispatcher dispatcher = UIManagerHelper.getEventDispatcher(reactContext, getId());

      if (dispatcher != null) {
        int surfaceId = UIManagerHelper.getSurfaceId(reactContext);
        dispatcher.dispatchEvent(new MarkerEvent(surfaceId, getId(), eventName, data));
      }
    }
  }

  private static class MarkerEvent extends Event<MarkerEvent> {
    private final String eventName;
    private final @Nullable WritableMap eventData;

    public MarkerEvent(
        int surfaceId, int viewId, String eventName, @Nullable WritableMap eventData) {
      super(surfaceId, viewId);
      this.eventName = eventName;
      this.eventData = eventData;
    }

    @NonNull
    @Override
    public String getEventName() {
      return eventName;
    }

    @Override
    public WritableMap getEventData() {
      if (eventData == null) {
        return Arguments.createMap();
      }

      return eventData;
    }
  }
}
