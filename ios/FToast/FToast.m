//
//  FToast.m
//  FToast
//
//  Created by luoruidong on 16/6/30.
//  Copyright © 2016年 luoruidong. All rights reserved.
//
#import <UIKit/UIKit.h>
#import <React/RCTBridgeModule.h>
#import "UIView+Toast.h"

NSInteger const FToastBottomOffset = 40;
double const FToastShortDuration = 3.0;
double const FToastLongDuration = 5.0;
NSInteger const FToastGravityBottom = 1;
NSInteger const FToastGravityCenter = 2;
NSInteger const FToastGravityTop = 3;

@interface FToast : NSObject <RCTBridgeModule>
@end

@implementation FToast {
    CGFloat _keyOffset;
}

- (instancetype)init {
    if (self = [super init]) {
        _keyOffset = 0;
        [[NSNotificationCenter defaultCenter] addObserver:self
                                                 selector:@selector(keyboardWasShown:)
                                                     name:UIKeyboardDidShowNotification
                                                   object:nil];
        [[NSNotificationCenter defaultCenter] addObserver:self
                                                 selector:@selector(keyboardWillHiden:)
                                                     name:UIKeyboardWillHideNotification
                                                   object:nil];
    }
    return self;
}

- (void)keyboardWasShown:(NSNotification *)notification {

    CGSize keyboardSize = [[[notification userInfo] objectForKey:UIKeyboardFrameBeginUserInfoKey] CGRectValue].size;

    int height = MIN(keyboardSize.height,keyboardSize.width);
    int width = MAX(keyboardSize.height,keyboardSize.width);

    _keyOffset = height;
}

- (void)keyboardWillHiden:(NSNotification *)notification {
    _keyOffset = 0;
}


RCT_EXPORT_MODULE()

- (NSDictionary *)constantsToExport {
    return @{
             @"SHORT": [NSNumber numberWithDouble:FToastShortDuration],
             @"LONG": [NSNumber numberWithDouble:FToastLongDuration],
             @"BOTTOM": [NSNumber numberWithInteger:FToastGravityBottom],
             @"CENTER": [NSNumber numberWithInteger:FToastGravityCenter],
             @"TOP": [NSNumber numberWithInteger:FToastGravityTop]
             };
}

+ (BOOL)requiresMainQueueSetup
{
    return NO;
}

RCT_EXPORT_METHOD(show:(NSString *)msg duration:(double)duration {
  [self _show:msg duration:duration gravity:FToastGravityBottom yOffset:0 backgroundColor:@"#000000"];
});

RCT_EXPORT_METHOD(showWithGravity:(NSString *)msg duration:(double)duration gravity:(nonnull NSNumber *)gravity{
  [self _show:msg duration:duration gravity:gravity.intValue yOffset:0 backgroundColor:@"#000000"];
});

RCT_EXPORT_METHOD(showCustom:(NSString *)msg duration:(double)duration gravity:(nonnull NSNumber *)gravity yOffset:(nonnull NSNumber *)yOffset backgroundColor:(NSString *)backgroundColor{
    [self _show:msg duration:duration gravity:gravity.intValue yOffset:yOffset backgroundColor:backgroundColor];
});

- (UIViewController *)visibleViewController:(UIViewController *)rootViewController
{
    if (rootViewController.presentedViewController == nil)
    {
        return rootViewController;
    }
    if ([rootViewController.presentedViewController isKindOfClass:[UINavigationController class]])
    {
        UINavigationController *navigationController = (UINavigationController *)rootViewController.presentedViewController;
        UIViewController *lastViewController = [[navigationController viewControllers] lastObject];

        return [self visibleViewController:lastViewController];
    }
    if ([rootViewController.presentedViewController isKindOfClass:[UITabBarController class]])
    {
        UITabBarController *tabBarController = (UITabBarController *)rootViewController.presentedViewController;
        UIViewController *selectedViewController = tabBarController.selectedViewController;

        return [self visibleViewController:selectedViewController];
    }

    UIViewController *presentedViewController = (UIViewController *)rootViewController.presentedViewController;

    return [self visibleViewController:presentedViewController];
}

- (void)_show:(NSString *)msg duration:(NSTimeInterval)duration gravity:(NSInteger)gravity yOffset:(NSNumber *)yOffset backgroundColor:(NSString *)backgroundColor{
    dispatch_async(dispatch_get_main_queue(), ^{
        //UIView *root = [[[[[UIApplication sharedApplication] delegate] window] rootViewController] view];
        UIViewController *ctrl = [self visibleViewController:[UIApplication sharedApplication].keyWindow.rootViewController];
        UIView *root = [ctrl view];
        CGRect bound = root.bounds;
        bound.size.height -= _keyOffset;
        if (bound.size.height > FToastBottomOffset*2) {
            bound.origin.y += FToastBottomOffset;
            bound.size.height -= FToastBottomOffset*2;
        }
        UIView *view = [[UIView alloc] initWithFrame:bound];
        view.userInteractionEnabled = NO;
        [root addSubview:view];
        UIView __weak *blockView = view;
        id position;
        if (gravity == FToastGravityTop) {
            position = CSToastPositionTop;
        } else if (gravity == FToastGravityCenter) {
            position = CSToastPositionCenter;
        } else {
            position = CSToastPositionBottom;
        }
      // create a new style
      CSToastStyle *style = [[CSToastStyle alloc] initWithDefaultStyle];
      UIColor *bgColor = [self getUIColorObjectFromHexString:backgroundColor alpha:.9];
      style.backgroundColor = bgColor;
        [view makeToast:msg
            duration:duration
            position:position
            title:nil
            image:nil
            style:style
            completion:^(BOOL didTap) {
                [blockView removeFromSuperview];
            }];
    });
}

- (UIColor *)getUIColorObjectFromHexString:(NSString *)hexStr alpha:(CGFloat)alpha
{
  // Convert hex string to an integer
  unsigned int hexint = [self intFromHexString:hexStr];
  
  // Create color object, specifying alpha as well
  UIColor *color =
  [UIColor colorWithRed:((CGFloat) ((hexint & 0xFF0000) >> 16))/255
                  green:((CGFloat) ((hexint & 0xFF00) >> 8))/255
                   blue:((CGFloat) (hexint & 0xFF))/255
                  alpha:alpha];
  
  return color;
}

- (unsigned int)intFromHexString:(NSString *)hexStr
{
  unsigned int hexInt = 0;
  
  // Create scanner
  NSScanner *scanner = [NSScanner scannerWithString:hexStr];
  
  // Tell scanner to skip the # character
  [scanner setCharactersToBeSkipped:[NSCharacterSet characterSetWithCharactersInString:@"#"]];
  
  // Scan hex value
  [scanner scanHexInt:&hexInt];
  
  return hexInt;
}

@end
