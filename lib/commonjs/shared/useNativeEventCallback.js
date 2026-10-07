"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useNativeEventCallback = void 0;
var _react = require("react");
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

const useNativeEventCallback = listener => {
  return (0, _react.useCallback)(event => {
    listener?.(event.nativeEvent);
  }, [listener]);
};
exports.useNativeEventCallback = useNativeEventCallback;
//# sourceMappingURL=useNativeEventCallback.js.map