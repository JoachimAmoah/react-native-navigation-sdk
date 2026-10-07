"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
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
// Note: Using Double instead of Int32 as codegen for TurboModules currently
// fails to unbox values to Integer on iOS. Transporting the value to integer is
// done in the native code.
/**
 * TurboModule for map view operations.
 *
 * All methods take a `nativeID` string parameter to identify which view instance
 * to operate on. The native implementation maintains a registry mapping nativeIDs
 * to view instances.
 */
var _default = exports.default = _reactNative.TurboModuleRegistry.getEnforcing('NavViewModule');
//# sourceMappingURL=NativeNavViewModule.js.map