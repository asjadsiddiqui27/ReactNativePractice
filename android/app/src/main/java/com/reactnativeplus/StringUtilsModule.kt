package com.reactnativeplus

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.Promise

class StringUtilsModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "StringUtils"
    }

    @ReactMethod
    fun reverseStringNative(input: String, promise: Promise) {
        try {
            val reversedString = input.reversed()
            promise.resolve(reversedString)
        } catch (e: Exception) {
            promise.reject("ERROR", e.message)
        }
    }
}
