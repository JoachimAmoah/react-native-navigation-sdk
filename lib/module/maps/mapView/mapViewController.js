"use strict";

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

import NavViewModule from '../../native/NativeNavViewModule';
import { processColorValue, colorIntToRGBA } from '../../shared';
/**
 * Creates a MapViewController for a specific view instance.
 *
 * @param nativeID - The string-based nativeID that identifies the view instance.
 *                   This is used by the TurboModule to look up the view in the native registry.
 * @returns A MapViewController with methods to control the map view.
 */
export const getMapViewController = nativeID => {
  return {
    clearMapView: async () => {
      return await NavViewModule.clearMapView(nativeID);
    },
    addCircle: async circleOptions => {
      const circle = await NavViewModule.addCircle(nativeID, {
        ...circleOptions,
        strokeColor: processColorValue(circleOptions.strokeColor) ?? undefined,
        fillColor: processColorValue(circleOptions.fillColor) ?? undefined
      });
      return {
        ...circle,
        fillColor: circle.fillColor ? colorIntToRGBA(circle.fillColor) : undefined,
        strokeColor: circle.strokeColor ? colorIntToRGBA(circle.strokeColor) : undefined
      };
    },
    coordinateForPoint: async point => {
      return await NavViewModule.coordinateForPoint(nativeID, point);
    },
    pointForCoordinate: async coordinate => {
      return await NavViewModule.pointForCoordinate(nativeID, coordinate);
    },
    fitBounds: async boundsOptions => {
      return await NavViewModule.fitBounds(nativeID, boundsOptions);
    },
    getBounds: async () => {
      return await NavViewModule.getBounds(nativeID);
    },
    addMarker: async markerOptions => {
      return await NavViewModule.addMarker(nativeID, markerOptions);
    },
    addPolyline: async polylineOptions => {
      const polyline = await NavViewModule.addPolyline(nativeID, {
        ...polylineOptions,
        points: polylineOptions.points || [],
        color: processColorValue(polylineOptions.color) ?? undefined
      });
      return {
        ...polyline,
        color: polyline.color ? colorIntToRGBA(polyline.color) : undefined
      };
    },
    addPolygon: async polygonOptions => {
      const polygon = await NavViewModule.addPolygon(nativeID, {
        ...polygonOptions,
        holes: polygonOptions.holes || [],
        points: polygonOptions.points || [],
        strokeColor: processColorValue(polygonOptions.strokeColor) ?? undefined,
        fillColor: processColorValue(polygonOptions.fillColor) ?? undefined
      });
      return {
        ...polygon,
        fillColor: polygon.fillColor ? colorIntToRGBA(polygon.fillColor) : undefined,
        strokeColor: polygon.strokeColor ? colorIntToRGBA(polygon.strokeColor) : undefined
      };
    },
    addGroundOverlay: async groundOverlayOptions => {
      // Determine if using bounds-based or position-based positioning
      const isBoundsBased = 'bounds' in groundOverlayOptions;
      if (isBoundsBased) {
        // Bounds-based positioning
        const boundsOptions = groundOverlayOptions;
        return await NavViewModule.addGroundOverlay(nativeID, {
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
        return await NavViewModule.addGroundOverlay(nativeID, {
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
      return await NavViewModule.removeMarker(nativeID, id);
    },
    removePolyline: async id => {
      return await NavViewModule.removePolyline(nativeID, id);
    },
    removePolygon: async id => {
      return await NavViewModule.removePolygon(nativeID, id);
    },
    removeCircle: async id => {
      return await NavViewModule.removeCircle(nativeID, id);
    },
    removeGroundOverlay: async id => {
      return await NavViewModule.removeGroundOverlay(nativeID, id);
    },
    setZoomLevel: async level => {
      return await NavViewModule.setZoomLevel(nativeID, level);
    },
    getCameraPosition: async () => {
      return await NavViewModule.getCameraPosition(nativeID);
    },
    getMyLocation: async () => {
      return await NavViewModule.getMyLocation(nativeID);
    },
    getUiSettings: async () => {
      return await NavViewModule.getUiSettings(nativeID);
    },
    isMyLocationEnabled: async () => {
      return await NavViewModule.isMyLocationEnabled(nativeID);
    },
    moveCamera: async cameraPosition => {
      return await NavViewModule.moveCamera(nativeID, cameraPosition);
    },
    setPadding: async _padding => {
      console.warn('setPadding should be set via props in new architecture');
    },
    getMarkers: async () => {
      return await NavViewModule.getMarkers(nativeID);
    },
    getCircles: async () => {
      const circles = await NavViewModule.getCircles(nativeID);
      return circles.map(circle => ({
        ...circle,
        fillColor: circle.fillColor ? colorIntToRGBA(circle.fillColor) : undefined,
        strokeColor: circle.strokeColor ? colorIntToRGBA(circle.strokeColor) : undefined
      }));
    },
    getPolylines: async () => {
      const polylines = await NavViewModule.getPolylines(nativeID);
      return polylines.map(polyline => ({
        ...polyline,
        color: polyline.color ? colorIntToRGBA(polyline.color) : undefined
      }));
    },
    getPolygons: async () => {
      const polygons = await NavViewModule.getPolygons(nativeID);
      return polygons.map(polygon => ({
        ...polygon,
        fillColor: polygon.fillColor ? colorIntToRGBA(polygon.fillColor) : undefined,
        strokeColor: polygon.strokeColor ? colorIntToRGBA(polygon.strokeColor) : undefined
      }));
    },
    getGroundOverlays: async () => {
      return await NavViewModule.getGroundOverlays(nativeID);
    }
  };
};
//# sourceMappingURL=mapViewController.js.map