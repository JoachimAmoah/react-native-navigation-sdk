"use strict";

/**
 * Copyright 2026 Google LLC
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

import { TurboModuleRegistry } from 'react-native';

// Note: Using Double instead of Int32 as codegen for TurboModules currently
// fails to unbox values to Integer on iOS. Transporting the value to integer is
// done in the native code.

// Explicitly define the types for codegen objects, to
// have exact types for the generated native code.
// Codegen currently cannot crawl through the files to infer types,
// and therefore we need to explicitly define all types here used in the
// codegen objects. This is a limitation of the current codegen system.
var RouteStatusSpec = /*#__PURE__*/function (RouteStatusSpec) {
  RouteStatusSpec[RouteStatusSpec["OK"] = 0] = "OK";
  RouteStatusSpec[RouteStatusSpec["NO_ROUTE_FOUND"] = 1] = "NO_ROUTE_FOUND";
  RouteStatusSpec[RouteStatusSpec["NETWORK_ERROR"] = 2] = "NETWORK_ERROR";
  RouteStatusSpec[RouteStatusSpec["QUOTA_CHECK_FAILED"] = 3] = "QUOTA_CHECK_FAILED";
  RouteStatusSpec[RouteStatusSpec["ROUTE_CANCELED"] = 4] = "ROUTE_CANCELED";
  RouteStatusSpec[RouteStatusSpec["LOCATION_DISABLED"] = 5] = "LOCATION_DISABLED";
  RouteStatusSpec[RouteStatusSpec["LOCATION_UNKNOWN"] = 6] = "LOCATION_UNKNOWN";
  RouteStatusSpec[RouteStatusSpec["WAYPOINT_ERROR"] = 7] = "WAYPOINT_ERROR";
  RouteStatusSpec[RouteStatusSpec["INVALID_PLACE_ID"] = 8] = "INVALID_PLACE_ID";
  RouteStatusSpec[RouteStatusSpec["DUPLICATE_WAYPOINTS_ERROR"] = 9] = "DUPLICATE_WAYPOINTS_ERROR";
  RouteStatusSpec[RouteStatusSpec["UNKNOWN"] = 10] = "UNKNOWN";
  return RouteStatusSpec;
}(RouteStatusSpec || {});
export default TurboModuleRegistry.getEnforcing('NavModule');
//# sourceMappingURL=NativeNavModule.js.map