"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useNavigationController = void 0;
var _reactNative = require("react-native");
var _react = require("react");
var _shared = require("../../shared");
var _types = require("../types");
var _types2 = require("./types");
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

const {
  NavModule
} = _reactNative.NativeModules;

/**
 * Individual listener setters type - maps each callback key to a setter function.
 */

/**
 * Hook result that provides navigation controller and event setters.
 */

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
const useNavigationController = (termsAndConditionsDialogOptions, taskRemovedBehavior = _types2.TaskRemovedBehavior.CONTINUE_SERVICE) => {
  // Store callbacks in refs so they can be updated without re-subscribing
  const onStartGuidanceRef = (0, _react.useRef)(null);
  const onArrivalRef = (0, _react.useRef)(null);
  const onLocationChangedRef = (0, _react.useRef)(null);
  const onRawLocationChangedRef = (0, _react.useRef)(null);
  const onNavigationReadyRef = (0, _react.useRef)(null);
  const onRouteChangedRef = (0, _react.useRef)(null);
  const onReroutingRequestedByOffRouteRef = (0, _react.useRef)(null);
  const onTrafficUpdatedRef = (0, _react.useRef)(null);
  const onRemainingTimeOrDistanceChangedRef = (0, _react.useRef)(null);
  const onTurnByTurnRef = (0, _react.useRef)(null);
  const logDebugInfoRef = (0, _react.useRef)(null);

  // Subscribe to events at the top level, routing to refs
  (0, _shared.useEventSubscription)('NavModule', 'onStartGuidance', () => {
    onStartGuidanceRef.current?.();
  });
  (0, _shared.useEventSubscription)('NavModule', 'onLocationChanged', payload => {
    onLocationChangedRef.current?.(payload.location);
  });
  (0, _shared.useEventSubscription)('NavModule', 'onRawLocationChanged', payload => {
    onRawLocationChangedRef.current?.(payload.location);
  });
  (0, _shared.useEventSubscription)('NavModule', 'onRouteChanged', () => {
    onRouteChangedRef.current?.();
  });
  (0, _shared.useEventSubscription)('NavModule', 'onReroutingRequestedByOffRoute', () => {
    onReroutingRequestedByOffRouteRef.current?.();
  });
  (0, _shared.useEventSubscription)('NavModule', 'onTrafficUpdated', () => {
    onTrafficUpdatedRef.current?.();
  });
  (0, _shared.useEventSubscription)('NavModule', 'onRemainingTimeOrDistanceChanged', payload => {
    onRemainingTimeOrDistanceChangedRef.current?.(payload.timeAndDistance);
  });
  (0, _shared.useEventSubscription)('NavModule', 'onArrival', payload => {
    onArrivalRef.current?.(payload.arrivalEvent);
  });
  (0, _shared.useEventSubscription)('NavModule', 'onTurnByTurn', payload => {
    onTurnByTurnRef.current?.(payload.turnByTurnEvents);
  });
  (0, _shared.useEventSubscription)('NavModule', 'logDebugInfo', payload => {
    logDebugInfoRef.current?.(payload.message);
  });

  // Create setter functions
  const setOnStartGuidance = (0, _react.useCallback)(callback => {
    onStartGuidanceRef.current = callback ?? null;
  }, []);
  const setOnArrival = (0, _react.useCallback)(callback => {
    onArrivalRef.current = callback ?? null;
  }, []);
  const setOnLocationChanged = (0, _react.useCallback)(callback => {
    onLocationChangedRef.current = callback ?? null;
  }, []);
  const setOnRawLocationChanged = (0, _react.useCallback)(callback => {
    onRawLocationChangedRef.current = callback ?? null;
  }, []);
  const setOnNavigationReady = (0, _react.useCallback)(callback => {
    onNavigationReadyRef.current = callback ?? null;
  }, []);
  const setOnRouteChanged = (0, _react.useCallback)(callback => {
    onRouteChangedRef.current = callback ?? null;
  }, []);
  const setOnReroutingRequestedByOffRoute = (0, _react.useCallback)(callback => {
    onReroutingRequestedByOffRouteRef.current = callback ?? null;
  }, []);
  const setOnTrafficUpdated = (0, _react.useCallback)(callback => {
    onTrafficUpdatedRef.current = callback ?? null;
  }, []);
  const setOnRemainingTimeOrDistanceChanged = (0, _react.useCallback)(callback => {
    onRemainingTimeOrDistanceChangedRef.current = callback ?? null;
  }, []);
  const setOnTurnByTurn = (0, _react.useCallback)(callback => {
    onTurnByTurnRef.current = callback ?? null;
  }, []);
  const setLogDebugInfo = (0, _react.useCallback)(callback => {
    logDebugInfoRef.current = callback ?? null;
  }, []);
  const removeAllListeners = (0, _react.useCallback)(() => {
    onStartGuidanceRef.current = null;
    onArrivalRef.current = null;
    onLocationChangedRef.current = null;
    onRawLocationChangedRef.current = null;
    onNavigationReadyRef.current = null;
    onRouteChangedRef.current = null;
    onReroutingRequestedByOffRouteRef.current = null;
    onTrafficUpdatedRef.current = null;
    onRemainingTimeOrDistanceChangedRef.current = null;
    onTurnByTurnRef.current = null;
    logDebugInfoRef.current = null;
  }, []);
  const setDestinationsImpl = async (waypoints, options) => {
    const {
      routingOptions,
      displayOptions,
      routeTokenOptions
    } = options ?? {};
    if (routingOptions && routeTokenOptions) {
      throw new Error('Only one of routingOptions or routeTokenOptions can be provided, not both.');
    }
    // Always send objects with defaults (never null) to ensure safe copying on native side
    const result = await NavModule.setDestinations(waypoints, routingOptions ? {
      ...routingOptions,
      valid: true
    } : {
      valid: false
    }, displayOptions ? {
      ...displayOptions,
      valid: true
    } : {
      valid: false
    }, routeTokenOptions ? {
      ...routeTokenOptions,
      valid: true
    } : {
      valid: false,
      routeToken: ''
    });
    // Native module returns a string that matches RouteStatus enum values
    return result;
  };
  const navigationController = (0, _react.useMemo)(() => ({
    areTermsAccepted: async () => {
      return await NavModule.areTermsAccepted();
    },
    showTermsAndConditionsDialog: async optionsOverride => {
      // Merge provider options with any override options
      const mergedOptions = {
        ...termsAndConditionsDialogOptions,
        ...optionsOverride,
        // Deep merge uiParams if both exist
        uiParams: optionsOverride?.uiParams || termsAndConditionsDialogOptions.uiParams ? {
          ...termsAndConditionsDialogOptions.uiParams,
          ...optionsOverride?.uiParams
        } : undefined
      };

      // Convert ColorValue parameters to color integers for native module
      const uiParams = mergedOptions.uiParams ? {
        valid: true,
        backgroundColor: (0, _shared.processColorValue)(mergedOptions.uiParams.backgroundColor) ?? undefined,
        titleColor: (0, _shared.processColorValue)(mergedOptions.uiParams.titleColor) ?? undefined,
        mainTextColor: (0, _shared.processColorValue)(mergedOptions.uiParams.mainTextColor) ?? undefined,
        acceptButtonTextColor: (0, _shared.processColorValue)(mergedOptions.uiParams.acceptButtonTextColor) ?? undefined,
        cancelButtonTextColor: (0, _shared.processColorValue)(mergedOptions.uiParams.cancelButtonTextColor) ?? undefined
      } : {
        valid: false
      };
      return await NavModule.showTermsAndConditionsDialog(mergedOptions.title, mergedOptions.companyName, mergedOptions.showOnlyDisclaimer ?? false, uiParams);
    },
    resetTermsAccepted: async () => {
      return await NavModule.resetTermsAccepted();
    },
    init: async () => {
      try {
        await NavModule.initializeNavigationSession(true,
        // abnormalTerminationReportingEnabled - default to true
        taskRemovedBehavior);
        // Call the onNavigationReady callback after successful initialization
        onNavigationReadyRef.current?.();
        return _types.NavigationSessionStatus.OK;
      } catch (error) {
        // Convert native error code to NavigationSessionStatus
        if (error && typeof error === 'object' && 'code' in error) {
          const code = error.code;
          // Map native error codes to NavigationSessionStatus
          const statusMap = {
            notAuthorized: _types.NavigationSessionStatus.NOT_AUTHORIZED,
            termsNotAccepted: _types.NavigationSessionStatus.TERMS_NOT_ACCEPTED,
            networkError: _types.NavigationSessionStatus.NETWORK_ERROR,
            locationPermissionMissing: _types.NavigationSessionStatus.LOCATION_PERMISSION_MISSING
          };
          return statusMap[code] ?? _types.NavigationSessionStatus.UNKNOWN_ERROR;
        }
        return _types.NavigationSessionStatus.UNKNOWN_ERROR;
      }
    },
    cleanup: async () => {
      await NavModule.cleanup();
    },
    setDestination: async (waypoint, options) => {
      return await setDestinationsImpl([waypoint], options);
    },
    setDestinations: async (waypoints, options) => {
      return await setDestinationsImpl(waypoints, options);
    },
    continueToNextDestination: async () => {
      return await NavModule.continueToNextDestination();
    },
    clearDestinations: async () => {
      return await NavModule.clearDestinations();
    },
    startGuidance: async () => {
      return await NavModule.startGuidance();
    },
    stopGuidance: async () => {
      return await NavModule.stopGuidance();
    },
    setSpeedAlertOptions: async alertOptions => {
      return await NavModule.setSpeedAlertOptions(alertOptions ? {
        ...alertOptions,
        valid: true
      } : {
        valid: false,
        majorSpeedAlertPercentThreshold: 0,
        minorSpeedAlertPercentThreshold: 0,
        severityUpgradeDurationSeconds: 0
      });
    },
    setAbnormalTerminatingReportingEnabled: enabled => {
      return NavModule.setAbnormalTerminatingReportingEnabled(enabled);
    },
    setAudioGuidanceType: index => {
      NavModule.setAudioGuidanceType(index);
    },
    setBackgroundLocationUpdatesEnabled: isEnabled => {
      if (_reactNative.Platform.OS === 'ios') {
        NavModule.setBackgroundLocationUpdatesEnabled(isEnabled);
      }
    },
    setTurnByTurnLoggingEnabled: isEnabled => {
      NavModule.setTurnByTurnLoggingEnabled(isEnabled);
    },
    getCurrentRouteSegment: async () => {
      return await NavModule.getCurrentRouteSegment();
    },
    getRouteSegments: async () => {
      return await NavModule.getRouteSegments();
    },
    getCurrentTimeAndDistance: async () => {
      return await NavModule.getCurrentTimeAndDistance();
    },
    getTraveledPath: async () => {
      return await NavModule.getTraveledPath();
    },
    getNavSDKVersion: async () => {
      return await NavModule.getNavSDKVersion();
    },
    stopUpdatingLocation: () => {
      NavModule.stopUpdatingLocation();
    },
    startUpdatingLocation: () => {
      NavModule.startUpdatingLocation();
    },
    simulator: {
      simulateLocation: location => {
        NavModule.simulateLocation(location);
      },
      resumeLocationSimulation: () => {
        NavModule.resumeLocationSimulation();
      },
      pauseLocationSimulation: () => {
        NavModule.pauseLocationSimulation();
      },
      simulateLocationsAlongExistingRoute: ({
        speedMultiplier
      }) => {
        NavModule.simulateLocationsAlongExistingRoute({
          speedMultiplier
        });
      },
      stopLocationSimulation: () => {
        NavModule.stopLocationSimulation();
      }
    }
  }), [termsAndConditionsDialogOptions, taskRemovedBehavior]);
  return {
    navigationController,
    removeAllListeners,
    setOnStartGuidance,
    setOnArrival,
    setOnLocationChanged,
    setOnRawLocationChanged,
    setOnNavigationReady,
    setOnRouteChanged,
    setOnReroutingRequestedByOffRoute,
    setOnTrafficUpdated,
    setOnRemainingTimeOrDistanceChanged,
    setOnTurnByTurn,
    setLogDebugInfo
  };
};
exports.useNavigationController = useNavigationController;
//# sourceMappingURL=useNavigationController.js.map