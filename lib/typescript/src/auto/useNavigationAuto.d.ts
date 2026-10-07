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
import type { MapViewAutoController, CustomNavigationAutoEvent } from './types';
/**
 * Individual listener setters type for auto events.
 */
export type NavigationAutoListenerSetters = {
    setOnAutoScreenAvailabilityChanged: (callback: ((available: boolean) => void) | null | undefined) => void;
    setOnCustomNavigationAutoEvent: (callback: ((event: CustomNavigationAutoEvent) => void) | null | undefined) => void;
};
/**
 * Hook result that provides auto controller and event setters.
 */
export interface UseNavigationAutoResult extends NavigationAutoListenerSetters {
    /** Controller for auto screen map operations */
    mapViewAutoController: MapViewAutoController;
    /** Removes all registered listeners */
    removeAllListeners: () => void;
}
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
export declare const useNavigationAuto: () => UseNavigationAutoResult;
//# sourceMappingURL=useNavigationAuto.d.ts.map