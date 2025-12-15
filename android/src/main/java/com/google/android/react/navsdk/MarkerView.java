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

import android.animation.ValueAnimator;
import android.annotation.SuppressLint;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.util.Base64;
import android.view.View;
import android.view.ViewGroup;
import android.view.animation.LinearInterpolator;
import android.widget.FrameLayout;
import androidx.annotation.Nullable;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.google.android.gms.maps.model.AdvancedMarker;
import com.google.android.gms.maps.model.AdvancedMarkerOptions;
import com.google.android.gms.maps.model.BitmapDescriptor;
import com.google.android.gms.maps.model.BitmapDescriptorFactory;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.Marker;
import java.io.InputStream;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

@SuppressLint("ViewConstructor")
public class MarkerView extends FrameLayout {
  private static final String TAG = "MarkerView";
  private static final Map<String, MarkerView> markers = new HashMap<>();

  private final AdvancedMarkerOptions options = new AdvancedMarkerOptions().visible(true);
  private AdvancedMarker marker;
  private final ViewGroup iconView;

  public MarkerView(ReactContext context) {
    super(context);

    iconView =
        new ViewGroup(context) {
          @Override
          protected void onLayout(boolean b, int i, int i1, int i2, int i3) {}
        };
  }

  public void createMarker(MapViewController viewController) {
    marker = viewController.addMarkerView(options, null);
    markers.put(marker.getId(), this);
  }

  public static MarkerView getMarkerView(Marker marker) {
    return markers.get(marker.getId());
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
                }
              })
          .start();
    } else if (uri.getScheme() != null
        && (uri.getScheme().equals("file")
            || uri.getScheme().equals("content")
            || uri.getScheme().startsWith("data"))) {
      try {
        Bitmap bitmap;

        if (uri.getScheme().startsWith("data")) { // assuming base64 data
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

  public void setGroundAnchor(@Nullable ReadableArray groundAnchorArray) {
    float x = (float) (groundAnchorArray != null ? groundAnchorArray.getDouble(0) : 0.5);
    float y = (float) (groundAnchorArray != null ? groundAnchorArray.getDouble(1) : 1);

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

  public void onPress() {
    ReactContext reactContext = (ReactContext) getContext();
    reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(getId(), "onPress", null);
  }

  @Override
  protected void onLayout(boolean b, int i, int i1, int i2, int i3) {
    if (marker == null) {
      return;
    }

    marker.setIconView(iconView);
  }

  public void detach() {
    if (marker != null) {
      marker.remove();
      markers.remove(marker.getId());
    }
  }

  @Override
  public void addView(View child, int index) {
    iconView.addView(child, index);

    ViewWrapper wrapper = new ViewWrapper(this.getContext());
    wrapper.content = child;

    super.addView(wrapper, index);
  }

  @Override
  public void removeView(View child) {
    ViewWrapper wrapper = (ViewWrapper) child;
    iconView.removeView(wrapper.content);

    super.removeView(wrapper);
  }

  @Override
  protected void onDetachedFromWindow() {
    detach();

    super.onDetachedFromWindow();
  }
}
