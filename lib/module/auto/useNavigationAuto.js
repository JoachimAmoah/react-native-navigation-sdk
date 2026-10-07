"use strict";

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

import { NativeModules } from 'react-native';
import { useEventSubscription, colorIntToRGBA, processColorValue } from '../shared';
import { useMemo, useCallback, useRef } from 'react';
const {
  NavAutoModule
} = NativeModules;

/**
 * Individual listener setters type for auto events.
 */

/**
 * Hook result that provides auto controller and event setters.
 */

/**
 * Hook to create and manage navigation auto (Android Auto/CarPlay) functionality.
 *
 * @returns Auto controller and event setter functions
 *
 * @example
 * ```tsx
 * const {
 *   mapViewAutoController,
 *   setOnAutoScreenAvailabilityChanged,
 *   setOnCustomNavigationAutoEvent,
 *   removeAllListeners,
 * } = useNavigationAuto();
 *
 * // Set up event listeners
 * useEffect(() => {
 *   setOnAutoScreenAvailabilityChanged((available) => {
 *     console.log('Auto screen available:', available);
 *   });
 *   setOnCustomNavigationAutoEvent((event) => {
 *     console.log('Custom event:', event.type, event.data);
 *   });
 *
 *   return () => removeAllListeners();
 * }, []);
 *
 * // Use auto controller
 * const available = await mapViewAutoController.isAutoScreenAvailable();
 * mapViewAutoController.setMapType(MapType.NORMAL);
 * ```
 */
export const useNavigationAuto = () => {
  // Store callbacks in refs
  const onAutoScreenAvailabilityChangedRef = useRef(null);
  const onCustomNavigationAutoEventRef = useRef(null);

  // Subscribe to events at the top level, routing to refs
  useEventSubscription('NavAutoModule', 'onAutoScreenAvailabilityChanged', available => {
    onAutoScreenAvailabilityChangedRef.current?.(available);
  });
  useEventSubscription('NavAutoModule', 'onCustomNavigationAutoEvent', payload => {
    if (onCustomNavigationAutoEventRef.current) {
      const event = {
        type: payload.type,
        data: payload.data ? JSON.parse(payload.data) : undefined
      };
      onCustomNavigationAutoEventRef.current(event);
    }
  });

  // Create setter functions
  const setOnAutoScreenAvailabilityChanged = useCallback(callback => {
    onAutoScreenAvailabilityChangedRef.current = callback ?? null;
  }, []);
  const setOnCustomNavigationAutoEvent = useCallback(callback => {
    onCustomNavigationAutoEventRef.current = callback ?? null;
  }, []);
  const removeAllListeners = useCallback(() => {
    onAutoScreenAvailabilityChangedRef.current = null;
    onCustomNavigationAutoEventRef.current = null;
  }, []);
  const mapViewAutoController = useMemo(() => ({
    cleanup: async () => {
      removeAllListeners();
    },
    isAutoScreenAvailable: async () => {
      return await NavAutoModule.isAutoScreenAvailable();
    },
    setFollowingPerspective: perspective => {
      NavAutoModule.setFollowingPerspective(perspective);
    },
    sendCustomMessage: (type, data) => {
      const dataString = data ? JSON.stringify(data) : null;
      NavAutoModule.sendCustomMessage(type, dataString);
    },
    setMapType: mapType => {
      NavAutoModule.setMapType(mapType);
    },
    setMapStyle: mapStyle => {
      NavAutoModule.setMapStyle(mapStyle);
    },
    clearMapView: () => {
      NavAutoModule.clearMapView();
    },
    addCircle: async circleOptions => {
      const circle = await NavAutoModule.addCircle({
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
      return await NavAutoModule.coordinateForPoint(point);
    },
    pointForCoordinate: async coordinate => {
      return await NavAutoModule.pointForCoordinate(coordinate);
    },
    fitBounds: async boundsOptions => {
      return await NavAutoModule.fitBounds(boundsOptions);
    },
    getBounds: async () => {
      return await NavAutoModule.getBounds();
    },
    addMarker: async markerOptions => {
      return await NavAutoModule.addMarker(markerOptions);
    },
    addPolyline: async polylineOptions => {
      const polyline = await NavAutoModule.addPolyline({
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
      const polygon = await NavAutoModule.addPolygon({
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
        return await NavAutoModule.addGroundOverlay({
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
        return await NavAutoModule.addGroundOverlay({
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
    removeMarker: id => {
      return NavAutoModule.removeMarker(id);
    },
    removePolyline: id => {
      return NavAutoModule.removePolyline(id);
    },
    removePolygon: id => {
      return NavAutoModule.removePolygon(id);
    },
    removeCircle: id => {
      return NavAutoModule.removeCircle(id);
    },
    removeGroundOverlay: id => {
      return NavAutoModule.removeGroundOverlay(id);
    },
    setIndoorEnabled: enabled => {
      return NavAutoModule.setIndoorEnabled(enabled);
    },
    setTrafficEnabled: enabled => {
      return NavAutoModule.setTrafficEnabled(enabled);
    },
    setCompassEnabled: enabled => {
      return NavAutoModule.setCompassEnabled(enabled);
    },
    setMyLocationEnabled: enabled => {
      return NavAutoModule.setMyLocationEnabled(enabled);
    },
    setMyLocationButtonEnabled: enabled => {
      return NavAutoModule.setMyLocationButtonEnabled(enabled);
    },
    setMapColorScheme: colorScheme => {
      return NavAutoModule.setMapColorScheme(colorScheme);
    },
    setNightMode: nightMode => {
      return NavAutoModule.setNightMode(nightMode);
    },
    setZoomLevel: async level => {
      return NavAutoModule.setZoomLevel(level);
    },
    setBuildingsEnabled: enabled => {
      return NavAutoModule.setBuildingsEnabled(enabled);
    },
    getCameraPosition: async () => {
      return await NavAutoModule.getCameraPosition();
    },
    getMyLocation: async () => {
      return await NavAutoModule.getMyLocation();
    },
    getUiSettings: async () => {
      return await NavAutoModule.getUiSettings();
    },
    isMyLocationEnabled: async () => {
      return await NavAutoModule.isMyLocationEnabled();
    },
    moveCamera: cameraPosition => {
      return NavAutoModule.moveCamera(cameraPosition);
    },
    setPadding: padding => {
      const {
        top = 0,
        left = 0,
        bottom = 0,
        right = 0
      } = padding;
      return NavAutoModule.setMapPadding(top, left, bottom, right);
    },
    getMarkers: async () => {
      return await NavAutoModule.getMarkers();
    },
    getCircles: async () => {
      const circles = await NavAutoModule.getCircles();
      return circles.map(circle => ({
        ...circle,
        fillColor: circle.fillColor ? colorIntToRGBA(circle.fillColor) : undefined,
        strokeColor: circle.strokeColor ? colorIntToRGBA(circle.strokeColor) : undefined
      }));
    },
    getPolylines: async () => {
      const polylines = await NavAutoModule.getPolylines();
      return polylines.map(polyline => ({
        ...polyline,
        color: polyline.color ? colorIntToRGBA(polyline.color) : undefined
      }));
    },
    getPolygons: async () => {
      const polygons = await NavAutoModule.getPolygons();
      return polygons.map(polygon => ({
        ...polygon,
        fillColor: polygon.fillColor ? colorIntToRGBA(polygon.fillColor) : undefined,
        strokeColor: polygon.strokeColor ? colorIntToRGBA(polygon.strokeColor) : undefined
      }));
    },
    getGroundOverlays: async () => {
      return await NavAutoModule.getGroundOverlays();
    }
  }), [removeAllListeners]);
  return {
    mapViewAutoController,
    removeAllListeners,
    setOnAutoScreenAvailabilityChanged,
    setOnCustomNavigationAutoEvent
  };
};
//# sourceMappingURL=useNavigationAuto.js.map