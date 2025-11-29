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

import React, { useMemo, useRef } from 'react';
import { type MarkerProps } from '..';
import {
  Platform,
  requireNativeComponent,
  type HostComponent,
} from 'react-native';

type NativeMarkerViewManagerComponentType = HostComponent<MarkerProps>;


const MarkerViewManager = requireNativeComponent<MarkerProps>('MarkerView') as NativeMarkerViewManagerComponentType;

export const MarkerView = (props: MarkerProps): React.JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markerViewRef = useRef<any>(null);

  /**
   * @param ref - The reference to the MarkerViewManager component.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onRefAssign = (ref: any): void => {
    if (markerViewRef.current !== ref) {
      markerViewRef.current = ref;
    }
  };

  const sanitizedProps = useMemo(() => (Platform.OS === 'android' ? {
    ...props,
    positionAndroid: props.position,
    position: undefined!,
  } : props), [props]);

  return <MarkerViewManager ref={onRefAssign} {...sanitizedProps} />;
};

export default MarkerView;
