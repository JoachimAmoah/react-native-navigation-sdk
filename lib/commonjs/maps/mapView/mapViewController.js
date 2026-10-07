"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMapViewController = void 0;
var _NativeNavViewModule = _interopRequireDefault(require("../../native/NativeNavViewModule"));
var _shared = require("../../shared");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
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
 * Creates a MapViewController for a specific view instance.
 *
 * @param nativeID - The string-based nativeID that identifies the view instance.
 *                   This is used by the TurboModule to look up the view in the native registry.
 * @returns A MapViewController with methods to control the map view.
 */
const getMapViewController = nativeID => {
  return {
    clearMapView: async () => {
      return await _NativeNavViewModule.default.clearMapView(nativeID);
    },
    addCircle: async circleOptions => {
      const circle = await _NativeNavViewModule.default.addCircle(nativeID, {
        ...circleOptions,
        strokeColor: (0, _shared.processColorValue)(circleOptions.strokeColor) ?? undefined,
        fillColor: (0, _shared.processColorValue)(circleOptions.fillColor) ?? undefined
      });
      return {
        ...circle,
        fillColor: circle.fillColor ? (0, _shared.colorIntToRGBA)(circle.fillColor) : undefined,
        strokeColor: circle.strokeColor ? (0, _shared.colorIntToRGBA)(circle.strokeColor) : undefined
      };
    },
    coordinateForPoint: async point => {
      return await _NativeNavViewModule.default.coordinateForPoint(nativeID, point);
    },
    pointForCoordinate: async coordinate => {
      return await _NativeNavViewModule.default.pointForCoordinate(nativeID, coordinate);
    },
    fitBounds: async boundsOptions => {
      return await _NativeNavViewModule.default.fitBounds(nativeID, boundsOptions);
    },
    getBounds: async () => {
      return await _NativeNavViewModule.default.getBounds(nativeID);
    },
    addMarker: async markerOptions => {
      return await _NativeNavViewModule.default.addMarker(nativeID, markerOptions);
    },
    addPolyline: async polylineOptions => {
      const polyline = await _NativeNavViewModule.default.addPolyline(nativeID, {
        ...polylineOptions,
        points: polylineOptions.points || [],
        color: (0, _shared.processColorValue)(polylineOptions.color) ?? undefined
      });
      return {
        ...polyline,
        color: polyline.color ? (0, _shared.colorIntToRGBA)(polyline.color) : undefined
      };
    },
    addPolygon: async polygonOptions => {
      const polygon = await _NativeNavViewModule.default.addPolygon(nativeID, {
        ...polygonOptions,
        holes: polygonOptions.holes || [],
        points: polygonOptions.points || [],
        strokeColor: (0, _shared.processColorValue)(polygonOptions.strokeColor) ?? undefined,
        fillColor: (0, _shared.processColorValue)(polygonOptions.fillColor) ?? undefined
      });
      return {
        ...polygon,
        fillColor: polygon.fillColor ? (0, _shared.colorIntToRGBA)(polygon.fillColor) : undefined,
        strokeColor: polygon.strokeColor ? (0, _shared.colorIntToRGBA)(polygon.strokeColor) : undefined
      };
    },
    addGroundOverlay: async groundOverlayOptions => {
      // Determine if using bounds-based or position-based positioning
      const isBoundsBased = 'bounds' in groundOverlayOptions;
      if (isBoundsBased) {
        // Bounds-based positioning
        const boundsOptions = groundOverlayOptions;
        return await _NativeNavViewModule.default.addGroundOverlay(nativeID, {
          id: boundsOptions.id,
          imgPath: boundsOptions.imgPath,
          bounds: {
            northEast: boundsOptions.bounds.northEast,
            southWest: boundsOptions.bounds.southWest
          },
          bearing: boundsOptions.bearing,
          transparency: boundsOptions.transparency,
          anchor: boundsOptions.anchor,
          clickable: boundsOptions.clickable,
          visible: boundsOptions.visible,
          zIndex: boundsOptions.zIndex
        });
      } else {
        // Position-based positioning
        const positionOptions = groundOverlayOptions;
        return await _NativeNavViewModule.default.addGroundOverlay(nativeID, {
          id: positionOptions.id,
          imgPath: positionOptions.imgPath,
          location: positionOptions.location,
          width: positionOptions.width,
          height: positionOptions.height,
          zoomLevel: positionOptions.zoomLevel,
          bearing: positionOptions.bearing,
          transparency: positionOptions.transparency,
          anchor: positionOptions.anchor,
          clickable: positionOptions.clickable,
          visible: positionOptions.visible,
          zIndex: positionOptions.zIndex
        });
      }
    },
    removeMarker: async id => {
      return await _NativeNavViewModule.default.removeMarker(nativeID, id);
    },
    removePolyline: async id => {
      return await _NativeNavViewModule.default.removePolyline(nativeID, id);
    },
    removePolygon: async id => {
      return await _NativeNavViewModule.default.removePolygon(nativeID, id);
    },
    removeCircle: async id => {
      return await _NativeNavViewModule.default.removeCircle(nativeID, id);
    },
    removeGroundOverlay: async id => {
      return await _NativeNavViewModule.default.removeGroundOverlay(nativeID, id);
    },
    setZoomLevel: async level => {
      return await _NativeNavViewModule.default.setZoomLevel(nativeID, level);
    },
    getCameraPosition: async () => {
      return await _NativeNavViewModule.default.getCameraPosition(nativeID);
    },
    getMyLocation: async () => {
      return await _NativeNavViewModule.default.getMyLocation(nativeID);
    },
    getUiSettings: async () => {
      return await _NativeNavViewModule.default.getUiSettings(nativeID);
    },
    isMyLocationEnabled: async () => {
      return await _NativeNavViewModule.default.isMyLocationEnabled(nativeID);
    },
    moveCamera: async cameraPosition => {
      return await _NativeNavViewModule.default.moveCamera(nativeID, cameraPosition);
    },
    setPadding: async _padding => {
      console.warn('setPadding should be set via props in new architecture');
    },
    getMarkers: async () => {
      return await _NativeNavViewModule.default.getMarkers(nativeID);
    },
    getCircles: async () => {
      const circles = await _NativeNavViewModule.default.getCircles(nativeID);
      return circles.map(circle => ({
        ...circle,
        fillColor: circle.fillColor ? (0, _shared.colorIntToRGBA)(circle.fillColor) : undefined,
        strokeColor: circle.strokeColor ? (0, _shared.colorIntToRGBA)(circle.strokeColor) : undefined
      }));
    },
    getPolylines: async () => {
      const polylines = await _NativeNavViewModule.default.getPolylines(nativeID);
      return polylines.map(polyline => ({
        ...polyline,
        color: polyline.color ? (0, _shared.colorIntToRGBA)(polyline.color) : undefined
      }));
    },
    getPolygons: async () => {
      const polygons = await _NativeNavViewModule.default.getPolygons(nativeID);
      return polygons.map(polygon => ({
        ...polygon,
        fillColor: polygon.fillColor ? (0, _shared.colorIntToRGBA)(polygon.fillColor) : undefined,
        strokeColor: polygon.strokeColor ? (0, _shared.colorIntToRGBA)(polygon.strokeColor) : undefined
      }));
    },
    getGroundOverlays: async () => {
      return await _NativeNavViewModule.default.getGroundOverlays(nativeID);
    }
  };
};
exports.getMapViewController = getMapViewController;
//# sourceMappingURL=mapViewController.js.map