/*
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

#import <React/RCTBridge.h>
#import <React/RCTComponent.h>
#import <React/RCTViewManager.h>
#import <UIKit/UIKit.h>
#import "NavViewController.h"

@interface MarkerView : UIView

@property(nonatomic, assign) NavViewController *mapViewController;
@property(nonatomic, assign) UIView *container;

@property(nonatomic, copy) RCTBubblingEventBlock onPress;

+ (MarkerView *)getMarkerView:(NSString *)markerViewId;
- (void)setVisible:(BOOL)visible;
- (void)setPosition:(NSObject *)position;
- (void)setGroundAnchor:(NSArray *)groundAnchor;
- (void)setImgPath:(NSString *)imgPath;
- (void)setImageSrc:(NSDictionary *)imageSrc;
- (void)setTitle:(NSString *)title;
- (void)setSnippet:(NSString *)snippet;
- (void)setImgPath:(NSString *)imgPath;
- (void)setAlpha:(float)alpha;
- (void)setRotation:(float)rotation;
- (void)setDraggable:(BOOL)draggable;
- (void)setFlat:(BOOL)flat;
- (void)setZIndex:(float)zIndex;

@end
