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

import React, { useRef } from 'react';
import type { MarkerViewProps } from './types';
import NativeMarkerView from '../../native/NativeMarkerViewComponent';
import { useNativeEventCallback } from '../../shared';

export const MarkerView = (props: MarkerViewProps): React.JSX.Element => {
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

  const { zIndex, children, ...filteredProps } = props;
  const onMarkerPress = useNativeEventCallback(filteredProps.onMarkerPress);

  return (
    <NativeMarkerView
      ref={onRefAssign}
      {...filteredProps}
      onMarkerPress={onMarkerPress}
      overlayZIndex={zIndex}
    >
      {children}
    </NativeMarkerView>
  );
};

export default MarkerView;
