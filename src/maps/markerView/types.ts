/**
 * Copyright 2025 Google LLC
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

import type { PropsWithChildren } from 'react';
import type { LatLng, Point } from '../../shared';
import type { ImageURISource } from 'react-native';

export type MarkerViewProps = PropsWithChildren & {
  renderId?: string;
  /** On Android, setting MarkerOptions.position throws an error so we move the value into MarkerOptions.positionAndroid and undefine MarkerOptions.position. */
  readonly positionAndroid?: LatLng;
  /** Optional custom identifier for this marker. If provided, this ID will be used instead of the auto-generated one. Can be used to update/replace an existing marker with the same ID. */
  readonly id?: string;
  /** The LatLng value for the marker's position on the map. You can change this value at any time if you want to move the marker. */
  readonly position: LatLng;
  /** Path to a local image asset that should be displayed in the marker instead of using the default marker pin. */
  readonly imgPath?: string;
  /** A text string that's displayed in an info window when the user taps the marker. You can change this value at any time. */
  readonly title?: string;
  /** Additional text that's displayed below the title. You can change this value at any time. */
  readonly snippet?: string;
  /** Sets the opacity of the marker. Defaults to 1.0. */
  readonly alpha?: number;
  /** The rotation of the marker in degrees clockwise about the marker's anchor point. The axis of rotation is perpendicular to the marker. A rotation of 0 corresponds to the default position of the marker. When the marker is flat on the map, the default position is North aligned and the rotation is such that the marker always remains flat on the map. When the marker is a billboard, the default position is pointing up and the rotation is such that the marker is always facing the camera. The default value is 0. */
  readonly rotation?: number;
  /** Indicates whether this marker is draggable. False by default. */
  readonly draggable?: boolean;
  /** Indicates whether this marker should be flat against the map true or a billboard facing the camera false. */
  readonly flat?: boolean;
  /** Indicates the visibility of the polygon. True by default. */
  readonly visible?: boolean;
  /** Ground overlay zIndex. */
  readonly zIndex?: number;
  /** Where the marker view is anchored on the map. Defaults to the bottom center of the marker view. */
  readonly groundAnchor?: Point;
  /** Source of an image to use as marker. */
  readonly imageSrc?: ImageURISource | null;
  /** Prevent defaults like centering the map on the marker when it's clicked. */
  readonly preventDefaultOnClick?: boolean;

  /** Triggered when map marker is pressed. */
  readonly onMarkerPress?: () => void;
};
