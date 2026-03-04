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
#import <React/RCTConvert.h>
#import <UIKit/UIKit.h>
#import <react/renderer/components/RNNavigationSdkSpec/ComponentDescriptors.h>
#import <react/renderer/components/RNNavigationSdkSpec/EventEmitters.h>
#import <react/renderer/components/RNNavigationSdkSpec/Props.h>
#import <react/renderer/components/RNNavigationSdkSpec/RCTComponentViewHelpers.h>

using namespace facebook::react;

@interface MarkerView () <RCTMarkerViewViewProtocol>
+ (NSMapTable *)markers;
@end

@implementation MarkerView {
  UIView *_iconView;
  GMSMarker *_marker;
  GMSMapView *_mapView;
  NavViewController *_mapViewController;
  NSMapTable *_iconViewSubviews;
  bool _visible;
}

- (instancetype)init {
  self = [super init];
  if (self) {
    _marker = [GMSMarker markerWithPosition:CLLocationCoordinate2DMake(0, 0)];
    _marker.tracksViewChanges = true;
    _visible = true;
    _preventDefaultOnClick = false;

    _iconView = [[UIView alloc] init];
    _iconViewSubviews = [[NSMapTable alloc] initWithKeyOptions:NSMapTableStrongMemory
                                                  valueOptions:NSMapTableStrongMemory
                                                      capacity:0];
  }

  return self;
}

+ (NSMapTable *)markers {
  static NSMapTable *_markers = nil;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    _markers = [[NSMapTable alloc] initWithKeyOptions:NSMapTableStrongMemory
                                         valueOptions:NSMapTableStrongMemory
                                             capacity:0];
  });

  return _markers;
}

- (void)mountChildComponentView:(UIView *)subView index:(NSInteger)index {
  [_iconView addSubview:subView];

  UIView *subviewKey = [[UIView alloc] init];
  [_iconViewSubviews setObject:subView forKey:subviewKey];

  [super mountChildComponentView:subviewKey index:index];
}

- (void)unmountChildComponentView:(UIView *)subView index:(NSInteger)index {
  [subView removeFromSuperview];

  UIView *iconSubView = [_iconViewSubviews objectForKey:subView];
  if (iconSubView != nil) {
    [iconSubView removeFromSuperview];
    [_iconViewSubviews removeObjectForKey:subView];
  }
}

- (void)removeFromSuperview {
  [[MarkerView markers] removeObjectForKey:_marker];
  _marker.map = nil;

  [[_iconView subviews] makeObjectsPerformSelector:@selector(removeFromSuperview)];
  [_iconViewSubviews removeAllObjects];

  [super removeFromSuperview];
}

+ (BOOL)shouldBeRecycled {
  return NO;
}

- (void)createMarker:(NavViewController *)mapViewController {
  if (_mapViewController == nil) {
    _mapViewController = mapViewController;
  } else if (_mapViewController != mapViewController) {
    [[NSException exceptionWithName:@"Cannot move marker to different map"
                             reason:@"Attempt to change mapViewController"
                           userInfo:nil] raise];
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
  _marker.iconView = _iconView;

  _mapView = _mapViewController.mapView;
  if (_visible) {
    _marker.map = _mapView;
  }

  [[MarkerView markers] setObject:self forKey:_marker];
}

+ (MarkerView *)getMarkerView:(GMSMarker *)marker {
  return [[MarkerView markers] objectForKey:marker];
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps {
  const auto &oldViewProps = *std::static_pointer_cast<MarkerViewProps const>(_props);
  const auto &newViewProps = *std::static_pointer_cast<MarkerViewProps const>(props);
  BOOL hasChildren = [[_iconView subviews] count] > 0;

  if (&oldViewProps.position != &newViewProps.position) {
    CLLocationCoordinate2D coord =
        CLLocationCoordinate2DMake(newViewProps.position.lat, newViewProps.position.lng);
    [CATransaction begin];
    [CATransaction setAnimationDuration:0.5];
    _marker.position = coord;
    [CATransaction commit];
  }

  if (oldViewProps.visible != newViewProps.visible) {
    _visible = newViewProps.visible;
    _marker.map = _visible ? _mapView : nil;
  }

  if (&oldViewProps.groundAnchor != &newViewProps.groundAnchor) {
    _marker.groundAnchor = CGPointMake(newViewProps.groundAnchor.x, newViewProps.groundAnchor.y);
  }

  if (!hasChildren && oldViewProps.imgPath != newViewProps.imgPath) {
    UIImage *icon =
        [UIImage imageNamed:[NSString stringWithUTF8String:newViewProps.imgPath.c_str()]];
    _marker.icon = icon;
  }

  if (!hasChildren && &oldViewProps.imageSrc != &newViewProps.imageSrc) {
    NSURL *imageURL =
        [RCTConvert NSURL:[NSString stringWithUTF8String:newViewProps.imageSrc.uri.c_str()]];
    NSURLSession *session = [NSURLSession sharedSession];
    NSURLSessionDataTask *dataTask =
        [session dataTaskWithURL:imageURL
               completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
                 if (!error && data) {
                   CGFloat scale = [UIScreen mainScreen].scale;
                   UIImage *image = [UIImage imageWithData:data scale:scale];
                   dispatch_async(dispatch_get_main_queue(), ^{
                     self->_marker.icon = image;
                   });
                 } else {
                   NSLog(@"Error fetching image: %@", error.localizedDescription);
                 }
               }];
    [dataTask resume];
  }

  if (oldViewProps.title != newViewProps.title) {
    _marker.title = [NSString stringWithUTF8String:newViewProps.title.c_str()];
  }

  if (oldViewProps.snippet != newViewProps.snippet) {
    _marker.snippet = [NSString stringWithUTF8String:newViewProps.snippet.c_str()];
  }

  if (oldViewProps.alpha != newViewProps.alpha) {
    _marker.opacity = newViewProps.alpha;
  }

  if (oldViewProps.rotation != newViewProps.rotation) {
    [CATransaction begin];
    [CATransaction setAnimationDuration:0.5];
    _marker.rotation = newViewProps.rotation;
    [CATransaction commit];
  }

  if (oldViewProps.draggable != newViewProps.draggable) {
    _marker.draggable = newViewProps.draggable;
  }

  if (oldViewProps.flat != newViewProps.flat) {
    _marker.flat = newViewProps.flat;
  }

  if (oldViewProps.overlayZIndex != newViewProps.overlayZIndex) {
    _marker.zIndex = newViewProps.overlayZIndex;
  }

  if (oldViewProps.preventDefaultOnClick != newViewProps.preventDefaultOnClick) {
    _preventDefaultOnClick = newViewProps.preventDefaultOnClick;
  }

  [super updateProps:props oldProps:oldProps];
}

- (void)handleOnPress {
  MarkerViewEventEmitter::OnMarkerPress result = {};
  self.eventEmitter.onMarkerPress(result);
}

- (const MarkerViewEventEmitter &)eventEmitter {
  return static_cast<const MarkerViewEventEmitter &>(*_eventEmitter);
}

+ (ComponentDescriptorProvider)componentDescriptorProvider {
  return concreteComponentDescriptorProvider<MarkerViewComponentDescriptor>();
}

@end
