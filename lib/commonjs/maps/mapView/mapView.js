"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MapView = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _shared = require("../../shared");
var _ = require("..");
var _NativeNavViewComponent = _interopRequireDefault(require("../../native/NativeNavViewComponent"));
var _navigation = require("../../navigation");
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

const MapView = props => {
  const viewCreatedRef = (0, _react.useRef)(false);
  const nativeIDRef = (0, _react.useRef)((0, _shared.getUniqueMapViewId)());
  const mapViewRef = (0, _react.useRef)(null);
  const {
    onMapViewControllerCreated
  } = props;

  // Initialize params once using lazy state initialization
  const [viewInitializationParams] = (0, _react.useState)(() => {
    const hasInitialCamera = !!props.initialCameraPosition;
    const hasTarget = hasInitialCamera && !!props.initialCameraPosition?.target;
    return {
      viewType: _.MapViewType.MAP,
      mapId: props.mapId,
      mapType: props.mapType,
      navigationUIEnabledPreference: _navigation.NavigationUIEnabledPreference.DISABLED,
      // navigation UI is always disabled for MapView
      mapColorScheme: props.mapColorScheme ?? _.MapColorScheme.FOLLOW_SYSTEM,
      navigationNightMode: 0,
      // Not used for MAP views
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

    // Initialize map view controller with nativeID
    onMapViewControllerCreated?.((0, _.getMapViewController)(nativeIDRef.current));
  }, [onMapViewControllerCreated, mapViewRef]);

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
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_NativeNavViewComponent.default, {
    style: props.style ?? styles.defaultStyle,
    nativeID: nativeIDRef.current,
    ref: mapViewRef,
    viewInitializationParams: viewInitializationParams,
    mapType: props.mapType,
    mapColorScheme: props.mapColorScheme ?? _.MapColorScheme.FOLLOW_SYSTEM,
    mapPadding: props.mapPadding,
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
    children: props.children
  });
};
exports.MapView = MapView;
const styles = _reactNative.StyleSheet.create({
  defaultStyle: {
    flex: 1
  }
});
var _default = exports.default = MapView;
//# sourceMappingURL=mapView.js.map