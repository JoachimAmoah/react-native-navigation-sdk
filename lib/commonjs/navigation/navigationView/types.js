"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationUIEnabledPreference = exports.NavigationNightMode = exports.CameraPerspective = void 0;
/**
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Determines the initial visibility of the navigation UI on map initialization.
 */
let NavigationUIEnabledPreference = exports.NavigationUIEnabledPreference = /*#__PURE__*/function (NavigationUIEnabledPreference) {
  /**
   * Navigation UI gets enabled if the navigation
   * session has already been successfully started.
   */
  NavigationUIEnabledPreference[NavigationUIEnabledPreference["AUTOMATIC"] = 0] = "AUTOMATIC";
  /** Navigation UI is disabled. */
  NavigationUIEnabledPreference[NavigationUIEnabledPreference["DISABLED"] = 1] = "DISABLED";
  return NavigationUIEnabledPreference;
}({});
/**
 * The perspective that the camera will be looking at the GoogleMap.
 * Default: TILTED
 */
let CameraPerspective = exports.CameraPerspective = /*#__PURE__*/function (CameraPerspective) {
  /** A tilted perspective facing in the same direction as the user. */
  CameraPerspective[CameraPerspective["TILTED"] = 0] = "TILTED";
  /** A north-facing top-down perspective of the camera's target. */
  CameraPerspective[CameraPerspective["TOP_DOWN_NORTH_UP"] = 1] = "TOP_DOWN_NORTH_UP";
  /** A heading-facing top-down perspective of the camera's target. */
  CameraPerspective[CameraPerspective["TOP_DOWN_HEADING_UP"] = 2] = "TOP_DOWN_HEADING_UP";
  return CameraPerspective;
}({});
/**
 * `NavigationViewProps` interface extends `MapViewProps` to provide
 * additional methods focused on managing navigation events and state changes.
 */
/**
 * Represents the navigation UI lighting mode.
 *
 * Android ref https://developers.google.com/maps/documentation/navigation/android-sdk/reference/com/google/android/libraries/navigation/ForceNightMode
 * iOS ref https://developers.google.com/maps/documentation/navigation/ios-sdk/reference/objc/Enums/GMSNavigationLightingMode
 */
let NavigationNightMode = exports.NavigationNightMode = /*#__PURE__*/function (NavigationNightMode) {
  /** Let the SDK automatically determine day or night. */
  NavigationNightMode[NavigationNightMode["AUTO"] = 0] = "AUTO";
  /** Force day mode regardless of time or location. */
  NavigationNightMode[NavigationNightMode["FORCE_DAY"] = 1] = "FORCE_DAY";
  /** Force night mode regardless of time or location. */
  NavigationNightMode[NavigationNightMode["FORCE_NIGHT"] = 2] = "FORCE_NIGHT";
  return NavigationNightMode;
}({});
/**
 * Allows you to access Navigator methods.
 */
//# sourceMappingURL=types.js.map