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
import { type Location } from '../../shared';
import type { TimeAndDistance } from '../types';
import { TaskRemovedBehavior, type TurnByTurnEvent, type TermsAndConditionsDialogOptions, type NavigationController, type ArrivalEvent } from './types';
/**
 * Individual listener setters type - maps each callback key to a setter function.
 */
export type NavigationListenerSetters = {
    setOnStartGuidance: (callback: (() => void) | null | undefined) => void;
    setOnArrival: (callback: ((arrivalEvent: ArrivalEvent) => void) | null | undefined) => void;
    setOnLocationChanged: (callback: ((location: Location) => void) | null | undefined) => void;
    setOnRawLocationChanged: (callback: ((location: Location) => void) | null | undefined) => void;
    setOnNavigationReady: (callback: (() => void) | null | undefined) => void;
    setOnRouteChanged: (callback: (() => void) | null | undefined) => void;
    setOnReroutingRequestedByOffRoute: (callback: (() => void) | null | undefined) => void;
    setOnTrafficUpdated: (callback: (() => void) | null | undefined) => void;
    setOnRemainingTimeOrDistanceChanged: (callback: ((timeAndDistance: TimeAndDistance) => void) | null | undefined) => void;
    setOnTurnByTurn: (callback: ((turnByTurnEvents: TurnByTurnEvent[]) => void) | null | undefined) => void;
    setLogDebugInfo: (callback: ((message: string) => void) | null | undefined) => void;
};
/**
 * Hook result that provides navigation controller and event setters.
 */
export interface UseNavigationControllerResult extends NavigationListenerSetters {
    /** Controller for navigation operations */
    navigationController: NavigationController;
    /** Removes all registered listeners */
    removeAllListeners: () => void;
}
/**
 * Hook to create and manage a navigation controller with event subscriptions.
 *
 * @param taskRemovedBehavior - Behavior when task is removed (Android only)
 * @returns Navigation controller and event setter functions
 *
 * @example
 * ```tsx
 * const {
 *   navigationController,
 *   setOnLocationChanged,
 *   setOnArrival,
 *   setOnNavigationReady,
 *   removeAllListeners,
 * } = useNavigationController(
 *   { title: 'Terms of Service', companyName: 'My Company' },
 *   TaskRemovedBehavior.CONTINUE_SERVICE
 * );
 *
 * // Set up event listeners
 * useEffect(() => {
 *   setOnLocationChanged((location) => console.log('Location:', location));
 *   setOnArrival((event) => console.log('Arrived at:', event.waypoint));
 *   setOnNavigationReady(() => console.log('Navigation ready'));
 *
 *   return () => removeAllListeners();
 * }, []);
 *
 * // Use navigation controller - first show ToS dialog, then initialize
 * const termsAccepted = await navigationController.showTermsAndConditionsDialog();
 * // Or override specific options:
 * // const termsAccepted = await navigationController.showTermsAndConditionsDialog({
 * //   uiParams: { backgroundColor: '#FFFFFF' },
 * // });
 *
 * if (termsAccepted) {
 *   await navigationController.init(); // Throws if terms not accepted or other error
 *   await navigationController.setDestination({ placeId: 'ChIJ...' });
 *   await navigationController.startGuidance();
 * }
 * ```
 */
export declare const useNavigationController: (termsAndConditionsDialogOptions: TermsAndConditionsDialogOptions, taskRemovedBehavior?: TaskRemovedBehavior) => UseNavigationControllerResult;
//# sourceMappingURL=useNavigationController.d.ts.map