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

import type {
  HostComponent,
  ImageSourcePropType as ImageSource,
  ViewProps,
} from 'react-native';
import type {
  DirectEventHandler,
  Float,
  WithDefault,
  Int32,
  Double,
} from 'react-native/Libraries/Types/CodegenTypesNamespace';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

export interface NativeMarkerViewProps extends ViewProps {
  renderId?: string;

  position: Readonly<{ lat: Double; lng: Double }>;
  imgPath?: WithDefault<string, null>;
  title?: WithDefault<string, null>;
  snippet?: WithDefault<string, null>;
  alpha?: WithDefault<Float, 1>;
  rotation?: WithDefault<Float, 0.0>;
  draggable?: WithDefault<boolean, false>;
  flat?: WithDefault<boolean, false>;
  visible?: WithDefault<boolean, true>;
  overlayZIndex?: WithDefault<Int32, 0>;
  groundAnchor?: Readonly<{ x: Float; y: Float }>;
  imageSrc?: ImageSource | null;
  preventDefaultOnClick?: WithDefault<boolean, false>;

  // Event handlers

  onMarkerPress?: DirectEventHandler<null>;
}

export type NativeMarkerViewType = HostComponent<NativeMarkerViewProps>;

export default codegenNativeComponent<NativeMarkerViewProps>(
  'MarkerView'
) as NativeMarkerViewType;
