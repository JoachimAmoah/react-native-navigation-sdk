"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapViewType = exports.MapType = void 0;
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
/**
 * Defines options for a Circle.
 */
/**
 * Defines MarkerOptions for a marker.
 */
/**
 * Defines PolygonOptions for a polygon.
 */
/**
 * Defines PolylineOptions for a Polyline.
 */
/**
 * Base options shared by all ground overlay positioning methods.
 */
/**
 * Options for creating a ground overlay using a position with dimensions.
 * The overlay is positioned at a specific location with width/height in meters.
 *
 * Note: This method is fully supported on Android. On iOS, the zoomLevel
 * parameter is used instead of width/height when creating the overlay.
 */
/**
 * Options for creating a ground overlay using bounds.
 * The overlay is stretched to fit within the specified LatLngBounds.
 * This is the most reliable cross-platform method for positioning ground overlays.
 */
/**
 * Defines options for a GroundOverlay.
 * A ground overlay is an image that is fixed to a map.
 *
 * There are two ways to position a ground overlay:
 * 1. Using `location` with `width`/`height` (position-based): The overlay is anchored
 *    to a specific location with dimensions in meters.
 * 2. Using `bounds` (bounds-based): The overlay is stretched to fit within the
 *    specified LatLngBounds. This is the most reliable cross-platform method.
 *
 * You must specify either `location` or `bounds`, but not both.
 */
/**
 * Defines the styling of the base map.
 */
let MapType = exports.MapType = /*#__PURE__*/function (MapType) {
  /** No base map tiles. */
  MapType[MapType["NONE"] = 0] = "NONE";
  /** Default GoogleMap style - Basic maps. */
  MapType[MapType["NORMAL"] = 1] = "NORMAL";
  /** Satellite maps with a transparent layer of major streets. */
  MapType[MapType["SATELLITE"] = 2] = "SATELLITE";
  /** Shows the terrain of the map only. This map type does not work during navigation. */
  MapType[MapType["TERRAIN"] = 3] = "TERRAIN";
  /** Satellite maps with a transparent layer of major streets. */
  MapType[MapType["HYBRID"] = 4] = "HYBRID";
  return MapType;
}({});
/**
 * Defines the padding options for a map.
 */
/**
 * Defines bounds options for a geographical bounds with padding.
 */
/**
 * Defines the type of the map view.
 */
let MapViewType = exports.MapViewType = /*#__PURE__*/function (MapViewType) {
  /** Regular Google map view without navigation */
  MapViewType[MapViewType["MAP"] = 0] = "MAP";
  /** Google map view with navigation */
  MapViewType[MapViewType["NAVIGATION"] = 1] = "NAVIGATION";
  return MapViewType;
}({});
//# sourceMappingURL=types.js.map