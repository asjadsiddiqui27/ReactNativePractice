package com.reactnativeplus;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class ReverseStringModule extends ReactContextBaseJavaModule {

    public ReverseStringModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "ReverseStringNative";
    }

    @ReactMethod
    public String reverseString(String input) {
        if (input == null) return null;
        return new StringBuilder(input).reverse().toString();
    }
}
