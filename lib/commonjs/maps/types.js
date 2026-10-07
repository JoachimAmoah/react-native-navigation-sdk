"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapColorScheme = void 0;
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
 * An immutable class that aggregates all camera position parameters such as
 * location, zoom level, tilt angle, and bearing.
 */
/**
 * An immutable class representing a latitude/longitude aligned rectangle.
 */
/**
 * A polygon on the earth's surface. A polygon can be convex or concave,
 * it may span the 180 meridian and it can have holes that are not filled in.
 */
/**
 * A circle on the earth's surface (spherical cap).
 */
/**
 * A ground overlay is an image that is fixed to a map.
 * Ground overlays are oriented against the Earth's surface rather than the screen.
 */
/**
 * An icon placed at a particular point on the map's surface. A marker icon is drawn
 * oriented against the device's screen rather than the map's surface;
 * i.e., it will not necessarily change orientation due to map rotations, tilting, or zooming.
 */
/**
 * A polyline is a list of points, where line segments are drawn between consecutive points.
 */
/**
 * Settings for the user interface of a GoogleMap.
 */
/**
 * Defines the color scheme to be applied to the rendered map.
 */
let MapColorScheme = exports.MapColorScheme = /*#__PURE__*/function (MapColorScheme) {
  /** Follows the system or SDK default (automatic). */
  MapColorScheme[MapColorScheme["FOLLOW_SYSTEM"] = 0] = "FOLLOW_SYSTEM";
  /** Forces the light color scheme. */
  MapColorScheme[MapColorScheme["LIGHT"] = 1] = "LIGHT";
  /** Forces the dark color scheme. */
  MapColorScheme[MapColorScheme["DARK"] = 2] = "DARK";
  return MapColorScheme;
}({});
/**
 * Defines the results of a map drag event.
 */
/**
 * `MapViewProps` interface provides methods focused on managing map events and state changes.
 */
//# sourceMappingURL=types.js.map