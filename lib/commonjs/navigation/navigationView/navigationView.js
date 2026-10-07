"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.NavigationView = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _shared = require("../../shared");
var _navigationViewController = require("./navigationViewController");
var _types = require("./types");
var _maps = require("../../maps");
var _NativeNavViewComponent = _interopRequireDefault(require("../../native/NativeNavViewComponent"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const NavigationView = props => {
  const viewCreatedRef = (0, _react.useRef)(false);
  const nativeIDRef = (0, _react.useRef)((0, _shared.getUniqueMapViewId)());
  const mapViewRef = (0, _react.useRef)(null);
  const {
    onMapViewControllerCreated,
    androidStylingOptions,
    iOSStylingOptions,
    onNavigationViewControllerCreated
  } = props;

  // Convert styling options colors from ColorValue to color integers
  const convertedAndroidStyling = (0, _react.useMemo)(() => {
    if (!androidStylingOptions) return undefined;
    return {
      primaryDayModeThemeColor: (0, _shared.processColorValue)(androidStylingOptions.primaryDayModeThemeColor) ?? undefined,
      secondaryDayModeThemeColor: (0, _shared.processColorValue)(androidStylingOptions.secondaryDayModeThemeColor) ?? undefined,
      primaryNightModeThemeColor: (0, _shared.processColorValue)(androidStylingOptions.primaryNightModeThemeColor) ?? undefined,
      secondaryNightModeThemeColor: (0, _shared.processColorValue)(androidStylingOptions.secondaryNightModeThemeColor) ?? undefined,
      headerLargeManeuverIconColor: (0, _shared.processColorValue)(androidStylingOptions.headerLargeManeuverIconColor) ?? undefined,
      headerSmallManeuverIconColor: (0, _shared.processColorValue)(androidStylingOptions.headerSmallManeuverIconColor) ?? undefined,
      headerNextStepTextColor: (0, _shared.processColorValue)(androidStylingOptions.headerNextStepTextColor) ?? undefined,
      headerNextStepTextSize: androidStylingOptions.headerNextStepTextSize,
      headerDistanceValueTextColor: (0, _shared.processColorValue)(androidStylingOptions.headerDistanceValueTextColor) ?? undefined,
      headerDistanceUnitsTextColor: (0, _shared.processColorValue)(androidStylingOptions.headerDistanceUnitsTextColor) ?? undefined,
      headerDistanceValueTextSize: androidStylingOptions.headerDistanceValueTextSize,
      headerDistanceUnitsTextSize: androidStylingOptions.headerDistanceUnitsTextSize,
      headerInstructionsTextColor: (0, _shared.processColorValue)(androidStylingOptions.headerInstructionsTextColor) ?? undefined,
      headerInstructionsFirstRowTextSize: androidStylingOptions.headerInstructionsFirstRowTextSize,
      headerInstructionsSecondRowTextSize: androidStylingOptions.headerInstructionsSecondRowTextSize,
      headerGuidanceRecommendedLaneColor: (0, _shared.processColorValue)(androidStylingOptions.headerGuidanceRecommendedLaneColor) ?? undefined
    };
  }, [androidStylingOptions]);
  const convertedIOSStyling = (0, _react.useMemo)(() => {
    if (!iOSStylingOptions) return undefined;
    return {
      navigationHeaderPrimaryBackgroundColor: (0, _shared.processColorValue)(iOSStylingOptions.navigationHeaderPrimaryBackgroundColor) ?? undefined,
      navigationHeaderSecondaryBackgroundColor: (0, _shared.processColorValue)(iOSStylingOptions.navigationHeaderSecondaryBackgroundColor) ?? undefined,
      navigationHeaderPrimaryBackgroundColorNightMode: (0, _shared.processColorValue)(iOSStylingOptions.navigationHeaderPrimaryBackgroundColorNightMode) ?? undefined,
      navigationHeaderSecondaryBackgroundColorNightMode: (0, _shared.processColorValue)(iOSStylingOptions.navigationHeaderSecondaryBackgroundColorNightMode) ?? undefined,
      navigationHeaderLargeManeuverIconColor: (0, _shared.processColorValue)(iOSStylingOptions.navigationHeaderLargeManeuverIconColor) ?? undefined,
      navigationHeaderSmallManeuverIconColor: (0, _shared.processColorValue)(iOSStylingOptions.navigationHeaderSmallManeuverIconColor) ?? undefined,
      navigationHeaderGuidanceRecommendedLaneColor: (0, _shared.processColorValue)(iOSStylingOptions.navigationHeaderGuidanceRecommendedLaneColor) ?? undefined,
      navigationHeaderNextStepTextColor: (0, _shared.processColorValue)(iOSStylingOptions.navigationHeaderNextStepTextColor) ?? undefined,
      navigationHeaderDistanceValueTextColor: (0, _shared.processColorValue)(iOSStylingOptions.navigationHeaderDistanceValueTextColor) ?? undefined,
      navigationHeaderDistanceUnitsTextColor: (0, _shared.processColorValue)(iOSStylingOptions.navigationHeaderDistanceUnitsTextColor) ?? undefined,
      navigationHeaderInstructionsTextColor: (0, _shared.processColorValue)(iOSStylingOptions.navigationHeaderInstructionsTextColor) ?? undefined
    };
  }, [iOSStylingOptions]);

  // Initialize params once using lazy state initialization
  const [viewInitializationParams] = (0, _react.useState)(() => {
    const hasInitialCamera = !!props.initialCameraPosition;
    const hasTarget = hasInitialCamera && !!props.initialCameraPosition?.target;
    return {
      viewType: _maps.MapViewType.NAVIGATION,
      mapId: props.mapId,
      mapType: props.mapType,
      navigationUIEnabledPreference: props.navigationUIEnabledPreference ?? _types.NavigationUIEnabledPreference.AUTOMATIC,
      mapColorScheme: props.mapColorScheme ?? _maps.MapColorScheme.FOLLOW_SYSTEM,
      navigationNightMode: props.navigationNightMode ?? _types.NavigationNightMode.AUTO,
      hasCameraPosition: hasInitialCamera,
      ...(hasInitialCamera && {
        cameraPosition: {
          hasTarget,
          target: props.initialCameraPosition?.target ?? null,
          bearing: props.initialCameraPosition?.bearing ?? 0.0,
          tilt: props.initialCameraPosition?.tilt ?? 0.0,
          zoom: props.initialCameraPosition?.zoom ?? 0.0
        }
      })
    };
  });
  (0, _react.useEffect)(() => {
    if (!mapViewRef.current || viewCreatedRef.current) {
      return;
    }
    viewCreatedRef.current = true;

    // Initialize controllers with nativeID
    onNavigationViewControllerCreated?.((0, _navigationViewController.getNavigationViewController)(nativeIDRef.current));
    onMapViewControllerCreated?.((0, _maps.getMapViewController)(nativeIDRef.current));
  }, [onMapViewControllerCreated, onNavigationViewControllerCreated, mapViewRef]);

  // Use the new architecture event callback hook
  const onMapClick = (0, _shared.useNativeEventCallback)(props.onMapClick);
  const onMapReady = (0, _shared.useNativeEventCallback)(props.onMapReady);
  const onMapDrag = (0, _shared.useNativeEventCallback)(props.onMapDrag);
  const onMapDragEnd = (0, _shared.useNativeEventCallback)(props.onMapDragEnd);
  const onMarkerClick = (0, _shared.useNativeEventCallback)(props.onMarkerClick);
  const onPolylineClick = (0, _shared.useNativeEventCallback)(props.onPolylineClick);
  const onPolygonClick = (0, _shared.useNativeEventCallback)(props.onPolygonClick);
  const onCircleClick = (0, _shared.useNativeEventCallback)(props.onCircleClick);
  const onGroundOverlayClick = (0, _shared.useNativeEventCallback)(props.onGroundOverlayClick);
  const onMarkerInfoWindowTapped = (0, _shared.useNativeEventCallback)(props.onMarkerInfoWindowTapped);
  const onRecenterButtonClick = (0, _shared.useNativeEventCallback)(props.onRecenterButtonClick);

  // Extract the visible field of the onPromptVisibilityChanged event.
  const {
    onPromptVisibilityChanged: onPromptVisibilityChangedProp
  } = props;
  const onPromptVisibilityChanged = (0, _react.useCallback)(event => {
    onPromptVisibilityChangedProp?.(event.nativeEvent.visible);
  }, [onPromptVisibilityChangedProp]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_NativeNavViewComponent.default, {
    style: props.style ?? styles.defaultStyle,
    nativeID: nativeIDRef.current,
    ref: mapViewRef,
    viewInitializationParams: viewInitializationParams,
    mapType: props.mapType,
    mapColorScheme: props.mapColorScheme ?? _maps.MapColorScheme.FOLLOW_SYSTEM,
    navigationNightMode: props.navigationNightMode ?? _types.NavigationNightMode.AUTO,
    mapPadding: props.mapPadding,
    tripProgressBarEnabled: props.tripProgressBarEnabled,
    trafficPromptsEnabled: props.trafficPromptsEnabled,
    trafficIncidentCardsEnabled: props.trafficIncidentCardsEnabled,
    headerEnabled: props.headerEnabled,
    footerEnabled: props.footerEnabled,
    speedometerEnabled: props.speedometerEnabled,
    speedLimitIconEnabled: props.speedLimitIconEnabled,
    recenterButtonEnabled: props.recenterButtonEnabled,
    navigationViewStylingOptions: _reactNative.Platform.OS === 'android' ? convertedAndroidStyling : convertedIOSStyling,
    mapStyle: props.mapStyle,
    mapToolbarEnabled: props.mapToolbarEnabled,
    indoorEnabled: props.indoorEnabled,
    indoorLevelPickerEnabled: props.indoorLevelPickerEnabled,
    trafficEnabled: props.trafficEnabled,
    compassEnabled: props.compassEnabled,
    myLocationButtonEnabled: props.myLocationButtonEnabled,
    myLocationEnabled: props.myLocationEnabled,
    rotateGesturesEnabled: props.rotateGesturesEnabled,
    scrollGesturesEnabled: props.scrollGesturesEnabled,
    scrollGesturesEnabledDuringRotateOrZoom: props.scrollGesturesDuringRotateOrZoomEnabled,
    tiltGesturesEnabled: props.tiltGesturesEnabled,
    zoomControlsEnabled: props.zoomControlsEnabled,
    zoomGesturesEnabled: props.zoomGesturesEnabled,
    buildingsEnabled: props.buildingsEnabled,
    reportIncidentButtonEnabled: props.reportIncidentButtonEnabled,
    minZoomLevel: props.minZoomLevel,
    maxZoomLevel: props.maxZoomLevel,
    onMapClick: onMapClick,
    onMapReady: onMapReady,
    onMapDrag: onMapDrag,
    onMapDragEnd: onMapDragEnd,
    onMarkerClick: onMarkerClick,
    onPolylineClick: onPolylineClick,
    onPolygonClick: onPolygonClick,
    onCircleClick: onCircleClick,
    onGroundOverlayClick: onGroundOverlayClick,
    onMarkerInfoWindowTapped: onMarkerInfoWindowTapped,
    onRecenterButtonClick: onRecenterButtonClick,
    onPromptVisibilityChanged: onPromptVisibilityChanged
  });
};
exports.NavigationView = NavigationView;
const styles = _reactNative.StyleSheet.create({
  defaultStyle: {
    flex: 1
  }
});
var _default = exports.default = NavigationView;
//# sourceMappingURL=navigationView.js.map