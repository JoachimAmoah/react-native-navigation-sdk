// Copyright 2025 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

#import "MarkerView.h"
#import "UIViewWrapper.h"

@import GoogleNavigation;

@implementation MarkerView {
  UIView *_iconView;
  GMSMarker *_marker;
  __weak GMSMapView *_mapView;
  BOOL _visible;
}

- (instancetype)init {
  self = [super init];
  if (self) {
    _marker = [GMSMarker markerWithPosition:CLLocationCoordinate2DMake(0, 0)];
    _marker.tracksViewChanges = true;
  }

  return self;
}

- (void)insertReactSubview:(UIView *)subView atIndex:(NSInteger)atIndex {
  if (!_iconView) {
    _iconView = [[UIView alloc] init];
  }

  [_iconView insertSubview:subView atIndex:atIndex];

  UIViewWrapper *wrapper = [[UIViewWrapper alloc] init];
  wrapper.content = subView;

  [super insertReactSubview:wrapper atIndex:atIndex];
}

- (void)removeReactSubview:(id<RCTComponent>)subView {
  UIViewWrapper *wrapper = subView;
  [_iconView removeReactSubview:wrapper.content];

  [super removeReactSubview:wrapper];
}

- (void)didMoveToSuperview {
  if (self.superview != nil) {
    return;
  }

  _marker.map = nil;
}

- (void)layoutSubviews {
  if (!_iconView) {
    _iconView = [[UIView alloc] init];
  }

  float width = 0;
  float height = 0;

  for (UIView *v in [_iconView subviews]) {
    float fw = v.frame.origin.x + v.frame.size.width;
    float fh = v.frame.origin.y + v.frame.size.height;

    width = MAX(fw, width);
    height = MAX(fh, height);
  }

  [_iconView setFrame:CGRectMake(0, 0, width, height)];

  if (_marker != nil) {
    _marker.map = nil;
  }

  if (!_marker.iconView) {
    _marker.iconView = _iconView;
  }

  [_mapViewController addGMSMarker:_marker visible:_visible];
  _mapView = _marker.map;
}

- (void)setVisible:(BOOL)visible {
  _visible = visible;
  _marker.map = visible ? _mapView : nil;
}

- (void)setPosition:(NSObject *)position {
  CLLocationCoordinate2D coord = [ObjectTranslationUtil getLocationCoordinateFrom:position];

  [CATransaction begin];
  [CATransaction setAnimationDuration:0.5];
  _marker.position = coord;
  [CATransaction commit];
}

- (void)setGroundAnchor:(NSArray *)groundAnchor {
  _marker.groundAnchor = CGPointMake([groundAnchor[0] floatValue], [groundAnchor[1] floatValue]);
}

- (void)setImgPath:(NSString *)imgPath {
  UIImage *icon = [UIImage imageNamed:imgPath];
  _marker.icon = icon;
}

- (void)setTitle:(NSString *)title {
  _marker.title = title;
}

- (void)setSnippet:(NSString *)snippet {
  _marker.snippet = snippet;
}

- (void)setAlpha:(float)alpha {
  _marker.opacity = alpha;
}

- (void)setRotation:(float)rotation {
  [CATransaction begin];
  [CATransaction setAnimationDuration:0.5];
  _marker.rotation = rotation;
  [CATransaction commit];
}

- (void)setDraggable:(BOOL)draggable {
  _marker.draggable = draggable;
}

- (void)setFlat:(BOOL)flat {
  _marker.flat = flat;
}

@end
