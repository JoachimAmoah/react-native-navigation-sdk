/**
 * Copyright 2023 Google LLC
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

import android.content.Context;
import android.view.View;
import android.widget.FrameLayout;
import androidx.annotation.Nullable;
import com.google.android.libraries.navigation.StylingOptions;

public class NavViewLayout extends FrameLayout {
  private CustomTypes.FragmentType fragmentType;
  private StylingOptions stylingOptions;
  private boolean isFragmentCreated = false;
  private MapViewController mapViewController;

  public NavViewLayout(Context context) {
    super(context);
  }

  public void initializeMapViewController(MapViewController mapViewController) {
    this.mapViewController = mapViewController;
  }

  public void drawOverlays() {
    if (this.mapViewController == null) {
      return;
    }

    int childCount = this.getChildCount();
    for (int i = 0; i < childCount; i++) {
      View child = this.getChildAt(i);
      if (!(child instanceof MarkerView)) {
        continue;
      }

      ((MarkerView) child).createMarker(this.mapViewController);
    }
  }

  public void setFragmentType(CustomTypes.FragmentType type) {
    this.fragmentType = type;
  }

  @Nullable
  public CustomTypes.FragmentType getFragmentType() {
    return this.fragmentType;
  }

  public void setStylingOptions(@Nullable StylingOptions options) {
    this.stylingOptions = options;
  }

  @Nullable
  public StylingOptions getStylingOptions() {
    return this.stylingOptions;
  }

  public boolean isFragmentCreated() {
    return this.isFragmentCreated;
  }

  public void setFragmentCreated(boolean created) {
    this.isFragmentCreated = created;
  }

  @Override
  public void addView(View child, int index) {
    if (!(child instanceof MarkerView)) {
      super.addView(child, index);
      return;
    }

    MarkerView markerView = (MarkerView) child;
    if (this.mapViewController != null) {
      markerView.createMarker(this.mapViewController);
    }

    // Add the marker to the view hierarchy.
    super.addView(markerView, index);

    // Replace MarkerView with the invisible wrapper. Inside the wrapper is the marker View
    // that'll be set to GMSMarker.iconView.
    ViewWrapper wrapper = new ViewWrapper(getContext());
    wrapper.content = child;
    super.addView(wrapper, index);
  }

  @Override
  public void onViewRemoved(View child) {
    if (!(child instanceof ViewWrapper)) {
      super.onViewRemoved(child);
      return;
    }

    ViewWrapper wrapper = (ViewWrapper) child;
    if (wrapper.content instanceof MarkerView) {
      ((MarkerView) wrapper.content).detach();
    }

    super.onViewRemoved(wrapper);
  }
}
