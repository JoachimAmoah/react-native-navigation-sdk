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
import type { HostComponent, ViewProps } from 'react-native';
import type { DirectEventHandler, Double, Float, Int32, UnsafeMixed, WithDefault } from 'react-native/Libraries/Types/CodegenTypesNamespace';
export interface AndroidNavigationViewStylingOptionsProp {
    primaryDayModeThemeColor?: Double;
    secondaryDayModeThemeColor?: Double;
    primaryNightModeThemeColor?: Double;
    secondaryNightModeThemeColor?: Double;
    headerLargeManeuverIconColor?: Double;
    headerSmallManeuverIconColor?: Double;
    headerNextStepTextColor?: Double;
    headerNextStepTextSize?: string;
    headerDistanceValueTextColor?: Double;
    headerDistanceUnitsTextColor?: Double;
    headerDistanceValueTextSize?: string;
    headerDistanceUnitsTextSize?: string;
    headerInstructionsTextColor?: Double;
    headerInstructionsFirstRowTextSize?: string;
    headerInstructionsSecondRowTextSize?: string;
    headerGuidanceRecommendedLaneColor?: Double;
}
export interface iOSNavigationViewStylingOptionsProp {
    navigationHeaderPrimaryBackgroundColor?: Double;
    navigationHeaderSecondaryBackgroundColor?: Double;
    navigationHeaderPrimaryBackgroundColorNightMode?: Double;
    navigationHeaderSecondaryBackgroundColorNightMode?: Double;
    navigationHeaderLargeManeuverIconColor?: Double;
    navigationHeaderSmallManeuverIconColor?: Double;
    navigationHeaderGuidanceRecommendedLaneColor?: Double;
    navigationHeaderNextStepTextColor?: Double;
    navigationHeaderDistanceValueTextColor?: Double;
    navigationHeaderDistanceUnitsTextColor?: Double;
    navigationHeaderInstructionsTextColor?: Double;
}
export interface NativeNavViewProps extends ViewProps {
    nativeID: string;
    viewInitializationParams: Readonly<{
        viewType?: WithDefault<Int32, -1>;
        mapId?: WithDefault<string, ''>;
        mapType?: WithDefault<Int32, 1>;
        navigationUIEnabledPreference?: WithDefault<Int32, 0>;
        mapColorScheme?: WithDefault<Int32, 0>;
        navigationNightMode?: WithDefault<Int32, 0>;
        hasCameraPosition?: WithDefault<boolean, false>;
        cameraPosition?: Readonly<{
            hasTarget?: WithDefault<boolean, false>;
            target?: Readonly<{
                lat?: Float;
                lng?: Float;
            }> | null;
            bearing?: WithDefault<Float, 0.0>;
            tilt?: WithDefault<Float, 0.0>;
            zoom?: WithDefault<Float, 0.0>;
        }>;
    }>;
    mapType?: WithDefault<Int32, 1>;
    mapColorScheme?: WithDefault<Int32, 0>;
    navigationNightMode?: WithDefault<Int32, 0>;
    mapPadding?: Readonly<{
        top?: Int32;
        left?: Int32;
        bottom?: Int32;
        right?: Int32;
    }> | null;
    mapStyle?: WithDefault<string, ''>;
    mapToolbarEnabled?: WithDefault<boolean, true>;
    indoorEnabled?: WithDefault<boolean, true>;
    indoorLevelPickerEnabled?: WithDefault<boolean, true>;
    trafficEnabled?: WithDefault<boolean, false>;
    compassEnabled?: WithDefault<boolean, true>;
    myLocationButtonEnabled?: WithDefault<boolean, true>;
    myLocationEnabled?: WithDefault<boolean, false>;
    rotateGesturesEnabled?: WithDefault<boolean, true>;
    scrollGesturesEnabled?: WithDefault<boolean, true>;
    scrollGesturesEnabledDuringRotateOrZoom?: WithDefault<boolean, true>;
    tiltGesturesEnabled?: WithDefault<boolean, true>;
    zoomControlsEnabled?: WithDefault<boolean, true>;
    zoomGesturesEnabled?: WithDefault<boolean, true>;
    buildingsEnabled?: WithDefault<boolean, true>;
    tripProgressBarEnabled?: WithDefault<boolean, false>;
    trafficPromptsEnabled?: WithDefault<boolean, true>;
    trafficIncidentCardsEnabled?: WithDefault<boolean, true>;
    headerEnabled?: WithDefault<boolean, true>;
    footerEnabled?: WithDefault<boolean, true>;
    speedometerEnabled?: WithDefault<boolean, true>;
    speedLimitIconEnabled?: WithDefault<boolean, true>;
    recenterButtonEnabled?: WithDefault<boolean, true>;
    reportIncidentButtonEnabled?: WithDefault<boolean, true>;
    navigationViewStylingOptions?: UnsafeMixed;
    minZoomLevel?: WithDefault<Float, -1>;
    maxZoomLevel?: WithDefault<Float, -1>;
    onMapReady?: DirectEventHandler<null>;
    onMapClick?: DirectEventHandler<{
        lat: Float;
        lng: Float;
    }>;
    onMapDrag?: DirectEventHandler<{
        cameraPosition: {
            target: {
                lat: Float;
                lng: Float;
            };
            bearing?: Float;
            tilt?: Float;
            zoom?: Float;
        };
    }>;
    onMapDragEnd?: DirectEventHandler<{
        cameraPosition: {
            target: {
                lat: Float;
                lng: Float;
            };
            bearing?: Float;
            tilt?: Float;
            zoom?: Float;
        };
    }>;
    onMarkerClick?: DirectEventHandler<{
        position: {
            lat: Float;
            lng: Float;
        };
        id: string;
        title?: string;
        alpha?: Float;
        rotation?: Float;
        snippet?: string;
        zIndex?: Int32;
    }>;
    onPolylineClick?: DirectEventHandler<{
        points: {
            lat: Float;
            lng: Float;
        }[];
        id: string;
        color?: string;
        width?: Float;
        jointType?: Int32;
        zIndex?: Int32;
    }>;
    onPolygonClick?: DirectEventHandler<{
        points: {
            lat: Float;
            lng: Float;
        }[];
        holes: {
            lat: Float;
            lng: Float;
        }[][];
        id: string;
        fillColor?: string;
        strokeWidth?: Float;
        strokeColor?: string;
        strokeJointType?: Int32;
        zIndex?: Int32;
        geodesic?: boolean;
    }>;
    onCircleClick?: DirectEventHandler<{
        center: {
            lat: Float;
            lng: Float;
        };
        id: string;
        fillColor?: string;
        strokeWidth?: Float;
        strokeColor?: string;
        radius?: Float;
        zIndex?: Int32;
    }>;
    onGroundOverlayClick?: DirectEventHandler<{
        id: string;
        position?: {
            lat: Float;
            lng: Float;
        };
        bounds?: {
            northEast: {
                lat: Float;
                lng: Float;
            };
            southWest: {
                lat: Float;
                lng: Float;
            };
            center: {
                lat: Float;
                lng: Float;
            };
        };
        height?: Float;
        width?: Float;
        bearing: Float;
        transparency: Float;
        zIndex?: Int32;
    }>;
    onMarkerInfoWindowTapped?: DirectEventHandler<{
        position: {
            lat: Float;
            lng: Float;
        };
        id: string;
        title?: string;
        alpha?: Float;
        rotation?: Float;
        snippet?: string;
        zIndex?: Int32;
    }>;
    onRecenterButtonClick?: DirectEventHandler<null>;
    onPromptVisibilityChanged?: DirectEventHandler<{
        visible: boolean;
    }>;
}
export type NativeNavViewType = HostComponent<NativeNavViewProps>;
declare const _default: NativeNavViewType;
export default _default;
//# sourceMappingURL=NativeNavViewComponent.d.ts.map