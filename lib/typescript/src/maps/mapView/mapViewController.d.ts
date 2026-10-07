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
import type { MapViewController } from './types';
/**
 * Creates a MapViewController for a specific view instance.
 *
 * @param nativeID - The string-based nativeID that identifies the view instance.
 *                   This is used by the TurboModule to look up the view in the native registry.
 * @returns A MapViewController with methods to control the map view.
 */
export declare const getMapViewController: (nativeID: string) => MapViewController;
//# sourceMappingURL=mapViewController.d.ts.map