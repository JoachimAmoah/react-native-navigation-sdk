/**
 * Copyright 2025 Google LLC
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

#import "MarkerViewManager.h"
#import <React/RCTConvert+CoreLocation.h>
#import "MarkerView.h"
#import "ObjectTranslationUtil.h"

@implementation MarkerViewManager

RCT_EXPORT_MODULE();

RCT_EXPORT_VIEW_PROPERTY(visible, BOOL);
RCT_EXPORT_VIEW_PROPERTY(imgPath, NSString);
RCT_EXPORT_VIEW_PROPERTY(title, NSString);
RCT_EXPORT_VIEW_PROPERTY(snippet, NSString);
RCT_EXPORT_VIEW_PROPERTY(alpha, float);
RCT_EXPORT_VIEW_PROPERTY(rotation, float);
RCT_EXPORT_VIEW_PROPERTY(draggable, BOOL);
RCT_EXPORT_VIEW_PROPERTY(flat, BOOL);
RCT_EXPORT_VIEW_PROPERTY(position, NSDictionary);
RCT_EXPORT_VIEW_PROPERTY(groundAnchor, NSArray);

- (UIView *)view {
  return [[MarkerView alloc] init];
}

@end
