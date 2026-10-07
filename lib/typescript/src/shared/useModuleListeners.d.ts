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
import { type EventSubscription } from 'react-native';
/**
 * Hook to subscribe to a single TurboModule event.
 *
 * In the new React Native architecture, TurboModules with EventEmitter<T> types expose
 * events as callable functions that accept a handler and return an EventSubscription.
 *
 * @param moduleName - The TurboModule name (e.g., 'NavModule', 'NavAutoModule')
 * @param eventName - The name of the event to subscribe to
 * @param handler - The callback function to handle the event, or null/undefined to skip subscription
 * @returns An object with an `unsubscribe` function to manually remove the subscription
 *
 * @example
 * ```tsx
 * // Subscribe to location changes
 * useEventSubscription('NavModule', 'onLocationChanged', (payload) => {
 *   console.log('Location:', payload.location);
 * });
 *
 * // Conditional subscription - only subscribes when handler is provided
 * const [enableTracking, setEnableTracking] = useState(false);
 * useEventSubscription('NavModule', 'onLocationChanged',
 *   enableTracking ? (payload) => console.log(payload.location) : undefined
 * );
 * ```
 */
export declare function useEventSubscription<T = any>(moduleName: string, eventName: string, handler: ((payload: T) => void) | null | undefined): {
    unsubscribe: () => void;
};
/**
 * Creates a subscription function for a TurboModule event (non-hook version).
 *
 * This is useful when you need to subscribe to events outside of React components
 * or when you want more control over the subscription lifecycle.
 *
 * @param moduleName - The TurboModule name (e.g., 'NavModule', 'NavAutoModule')
 * @param eventName - The name of the event to subscribe to
 * @param handler - The callback function to handle the event
 * @returns An EventSubscription that can be used to unsubscribe
 *
 * @example
 * ```ts
 * // Subscribe to an event
 * const subscription = subscribeToEvent('NavModule', 'onLocationChanged', (payload) => {
 *   console.log('Location:', payload.location);
 * });
 *
 * // Later, unsubscribe
 * subscription.remove();
 * ```
 */
export declare function subscribeToEvent<T = any>(moduleName: string, eventName: string, handler: (payload: T) => void): EventSubscription;
//# sourceMappingURL=useModuleListeners.d.ts.map