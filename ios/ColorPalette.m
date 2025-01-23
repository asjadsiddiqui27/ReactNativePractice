//
//  ColorPalette.m
//  reactNativePlus
//
//  Created by MohdAsjadSiddiqui-INT066 on 1/22/25.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(ColorPalette, NSObject)

RCT_EXTERN_METHOD(getDominantColorFromUrl:(NSString *)imageUrl
                  resolver:(RCTPromiseResolveBlock)resolver
                  rejecter:(RCTPromiseRejectBlock)rejecter)

@end
