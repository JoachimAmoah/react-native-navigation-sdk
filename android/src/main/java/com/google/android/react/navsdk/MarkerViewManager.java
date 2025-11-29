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

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import java.util.Map;

public class MarkerViewManager extends ViewGroupManager<MarkerView> {
  public static final String REACT_CLASS = "MarkerView";

  @Override
  public String getName() {
    return REACT_CLASS;
  }

  @NonNull
  @Override
  public MarkerView createViewInstance(@NonNull ThemedReactContext context) {
    return new MarkerView(context);
  }

  @Override
  public void onDropViewInstance(MarkerView view) {
    super.onDropViewInstance(view);
  }

  @ReactProp(name = "visible")
  public void setVisible(MarkerView view, boolean visible) {
    view.setVisible(visible);
  }

  @ReactProp(name = "imgPath")
  public void setImgPath(MarkerView view, String imgPath) {
    view.setImgPath(imgPath);
  }

  @ReactProp(name = "imageSrc")
  public void setImageSrc(MarkerView view, ReadableMap imageSrc) {
    view.setImageSrc(imageSrc);
  }

  @ReactProp(name = "title")
  public void setTitle(MarkerView view, String title) {
    view.setTitle(title);
  }

  @ReactProp(name = "snippet")
  public void setSnippet(MarkerView view, String snippet) {
    view.setSnippet(snippet);
  }

  @ReactProp(name = "alpha")
  public void setAlpha(MarkerView view, float alpha) {
    view.setAlpha(alpha);
  }

  @ReactProp(name = "rotation")
  public void setMarkerRotation(MarkerView view, float rotation) {
    view.setRotation(rotation);
  }

  @ReactProp(name = "draggable")
  public void setDraggable(MarkerView view, boolean draggable) {
    view.setDraggable(draggable);
  }

  @ReactProp(name = "flat")
  public void setFlat(MarkerView view, boolean flat) {
    view.setFlat(flat);
  }

  @ReactProp(name = "positionAndroid")
  public void setPosition(MarkerView view, ReadableMap position) {
    view.setPosition(position);
  }

  @ReactProp(name = "groundAnchor")
  public void setGroundAnchor(MarkerView view, @Nullable ReadableArray groundAnchor) {
    view.setGroundAnchor(groundAnchor);
  }

  @ReactProp(name = "zIndex")
  public void setZIndex(MarkerView view, float zIndex) {
    view.setZIndex(zIndex);
  }

  @Override
  public Map getExportedCustomBubblingEventTypeConstants() {
    return MapBuilder.builder()
        .put(
            "onPress",
            MapBuilder.of("phasedRegistrationNames", MapBuilder.of("bubbled", "onPress")))
        .build();
  }
}
