//
//  ColorPalette.swift
//  reactNativePlus
//
//  Created by MohdAsjadSiddiqui-INT066 on 1/22/25.
//

import Foundation

import UIKit
import React

@objc(ColorPalette)
class ColorPalette: NSObject {

    @objc func getDominantColorFromUrl(_ imageUrl: String, resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
        guard let url = URL(string: imageUrl) else {
            rejecter("Error", "Invalid URL", nil)
            return
        }

        // Download the image
        let task = URLSession.shared.dataTask(with: url) { data, _, error in
            if let error = error {
                rejecter("Error", error.localizedDescription, nil)
                return
            }

            guard let data = data, let image = UIImage(data: data) else {
                rejecter("Error", "Unable to load image", nil)
                return
            }

            // Calculate the dominant color
            let scaledImage = image.scaled(to: CGSize(width: 100, height: 100)) // Optional: Scale the image
            if let dominantColor = scaledImage?.getDominantColor() {
                let hexColor = dominantColor.toHex() // Convert the color to hex
                resolver(hexColor) // Return the hex string
            } else {
                rejecter("Error", "No color found", nil)
            }
        }
        task.resume()
    }
}

extension UIImage {
    func scaled(to size: CGSize) -> UIImage? {
        UIGraphicsBeginImageContextWithOptions(size, false, 0)
        self.draw(in: CGRect(origin: .zero, size: size))
        let scaledImage = UIGraphicsGetImageFromCurrentImageContext()
        UIGraphicsEndImageContext()
        return scaledImage
    }

    func getDominantColor() -> UIColor? {
        guard let cgImage = self.cgImage else { return nil }
        
        // Extracting the pixel data
        let width = cgImage.width
        let height = cgImage.height
        let rawData = UnsafeMutablePointer<UInt8>.allocate(capacity: width * height * 4)
        let colorSpace = CGColorSpaceCreateDeviceRGB()
        let context = CGContext(data: rawData, width: width, height: height, bitsPerComponent: 8, bytesPerRow: 4 * width, space: colorSpace, bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)

        context?.draw(cgImage, in: CGRect(x: 0, y: 0, width: width, height: height))

        // Analyze pixel data
        var r = 0, g = 0, b = 0, count = 0
        for x in 0..<width {
            for y in 0..<height {
                let pixelIndex = (y * width + x) * 4
                let red = rawData[pixelIndex]
                let green = rawData[pixelIndex + 1]
                let blue = rawData[pixelIndex + 2]
                
                // Summing up the colors (excluding alpha if transparent)
                if rawData[pixelIndex + 3] > 0 { // Ignore fully transparent pixels
                    r += Int(red)
                    g += Int(green)
                    b += Int(blue)
                    count += 1
                }
            }
        }

        // Free the memory used by rawData
        rawData.deallocate()

        // If no valid pixels, return nil
        guard count > 0 else { return nil }

        // Calculate average color
        let averageRed = CGFloat(r / count)
        let averageGreen = CGFloat(g / count)
        let averageBlue = CGFloat(b / count)

        // Adjust brightness if the color is too light
        let adjustedRed = max(averageRed, 0)   // Ensure RGB values are within valid range
        let adjustedGreen = max(averageGreen, 0)
        let adjustedBlue = max(averageBlue, 0)

        return UIColor(red: adjustedRed / 255.0, green: adjustedGreen / 255.0, blue: adjustedBlue / 255.0, alpha: 1.0)
    }
}

extension UIColor {
    func toHex() -> String? {
        var red: CGFloat = 0
        var green: CGFloat = 0
        var blue: CGFloat = 0
        var alpha: CGFloat = 0

        guard self.getRed(&red, green: &green, blue: &blue, alpha: &alpha) else { return nil }

        let r = Int(red * 255)
        let g = Int(green * 255)
        let b = Int(blue * 255)
        return String(format: "#%02X%02X%02X", r, g, b)
    }
}


/////////// too light
//
//import UIKit
//import React
//
//@objc(ColorPalette)
//class ColorPalette: NSObject {
//
//    @objc func getDominantColorFromUrl(_ imageUrl: String, resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
//        guard let url = URL(string: imageUrl) else {
//            rejecter("Error", "Invalid URL", nil)
//            return
//        }
//
//        // Download the image
//        let task = URLSession.shared.dataTask(with: url) { data, _, error in
//            if let error = error {
//                rejecter("Error", error.localizedDescription, nil)
//                return
//            }
//
//            guard let data = data, let image = UIImage(data: data) else {
//                rejecter("Error", "Unable to load image", nil)
//                return
//            }
//
//            // Calculate the dominant color
////            let scaledImage = image.scaled(to: CGSize(width: 100, height: 100)) // Optional: Scale the image
//            if let dominantColor = image.getDominantColor() {
//                let hexColor = dominantColor.toHex() // Convert the color to hex
//                resolver(hexColor) // Return the hex string
//            } else {
//                rejecter("Error", "No color found", nil)
//            }
//        }
//        task.resume()
//    }
//}
//
//extension UIImage {
//    func scaled(to size: CGSize) -> UIImage? {
//        UIGraphicsBeginImageContextWithOptions(size, false, 0)
//        self.draw(in: CGRect(origin: .zero, size: size))
//        let scaledImage = UIGraphicsGetImageFromCurrentImageContext()
//        UIGraphicsEndImageContext()
//        return scaledImage
//    }
//
//    func getDominantColor() -> UIColor? {
//        guard let cgImage = self.cgImage else { return nil }
//        
//        // Extracting the pixel data
//        let width = cgImage.width
//        let height = cgImage.height
//        let rawData = UnsafeMutablePointer<UInt8>.allocate(capacity: width * height * 4)
//        let colorSpace = CGColorSpaceCreateDeviceRGB()
//        let context = CGContext(data: rawData, width: width, height: height, bitsPerComponent: 8, bytesPerRow: 4 * width, space: colorSpace, bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)
//
//        context?.draw(cgImage, in: CGRect(x: 0, y: 0, width: width, height: height))
//
//        // Analyze pixel data
//        var r = 0, g = 0, b = 0, count = 0
//        for x in 0..<width {
//            for y in 0..<height {
//                let pixelIndex = (y * width + x) * 4
//                let red = rawData[pixelIndex]
//                let green = rawData[pixelIndex + 1]
//                let blue = rawData[pixelIndex + 2]
//                
//                // Summing up the colors
//                r += Int(red)
//                g += Int(green)
//                b += Int(blue)
//                count += 1
//            }
//        }
//
//        // Free the memory used by rawData
//        rawData.deallocate()
//
//        // Calculate average color
//        let averageRed = CGFloat(r / count)
//        let averageGreen = CGFloat(g / count)
//        let averageBlue = CGFloat(b / count)
//
//        return UIColor(red: averageRed / 255.0, green: averageGreen / 255.0, blue: averageBlue / 255.0, alpha: 1.0)
//    }
//}
//
//extension UIColor {
//    func toHex() -> String? {
//        var red: CGFloat = 0
//        var green: CGFloat = 0
//        var blue: CGFloat = 0
//        var alpha: CGFloat = 0
//
//        guard self.getRed(&red, green: &green, blue: &blue, alpha: &alpha) else { return nil }
//
//        let r = Int(red * 255)
//        let g = Int(green * 255)
//        let b = Int(blue * 255)
//        return String(format: "#%02X%02X%02X", r, g, b)
//    }
//}
//
//




////dark oooo


//import UIKit
//import React
//
//@objc(ColorPalette)
//class ColorPalette: NSObject {
//
//    @objc func getDominantColorFromUrl(_ imageUrl: String, resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
//        guard let url = URL(string: imageUrl) else {
//            rejecter("Error", "Invalid URL", nil)
//            return
//        }
//
//        // Download the image
//        let task = URLSession.shared.dataTask(with: url) { data, _, error in
//            if let error = error {
//                rejecter("Error", error.localizedDescription, nil)
//                return
//            }
//
//            guard let data = data, let image = UIImage(data: data) else {
//                rejecter("Error", "Unable to load image", nil)
//                return
//            }
//
//            // Calculate the dominant color
//            let scaledImage = image.scaled(to: CGSize(width: 100, height: 100)) // Optionally scale the image
//            if let dominantColor = scaledImage?.averageColor() {
//                let hexColor = dominantColor.toHex() // Convert the color to hex
//                resolver(hexColor) // Return the hex string
//            } else {
//                rejecter("Error", "No color found", nil)
//            }
//        }
//        task.resume()
//    }
//}
//
//extension UIImage {
//    func scaled(to size: CGSize) -> UIImage? {
//        UIGraphicsBeginImageContextWithOptions(size, false, 0)
//        self.draw(in: CGRect(origin: .zero, size: size))
//        let scaledImage = UIGraphicsGetImageFromCurrentImageContext()
//        UIGraphicsEndImageContext()
//        return scaledImage
//    }
//
//    func averageColor() -> UIColor? {
//        guard let cgImage = self.cgImage else { return nil }
//
//        let context = CIContext()
//        let inputImage = CIImage(cgImage: cgImage)
//        let extent = inputImage.extent
//        let parameters = [kCIInputExtentKey: CIVector(cgRect: extent)]
//        guard let filter = CIFilter(name: "CIAreaAverage", parameters: parameters) else { return nil }
//        guard let outputImage = filter.outputImage else { return nil }
//
//        var bitmap = [UInt8](repeating: 0, count: 4)
//        let outputExtent = CGRect(x: 0, y: 0, width: 1, height: 1)
//        context.render(outputImage, toBitmap: &bitmap, rowBytes: 4, bounds: outputExtent, format: .RGBA8, colorSpace: nil)
//
//        return UIColor(red: CGFloat(bitmap[0]) / 255.0,
//                       green: CGFloat(bitmap[1]) / 255.0,
//                       blue: CGFloat(bitmap[2]) / 255.0,
//                       alpha: CGFloat(bitmap[3]) / 255.0)
//    }
//}
//
//extension UIColor {
//    func toHex() -> String? {
//        var red: CGFloat = 0
//        var green: CGFloat = 0
//        var blue: CGFloat = 0
//        var alpha: CGFloat = 0
//
//        guard self.getRed(&red, green: &green, blue: &blue, alpha: &alpha) else { return nil }
//
//        let r = Int(red * 255)
//        let g = Int(green * 255)
//        let b = Int(blue * 255)
//        return String(format: "#%02X%02X%02X", r, g, b)
//    }
//}
