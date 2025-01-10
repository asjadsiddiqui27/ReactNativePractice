package com.reactnativeplus;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.uimanager.ViewManager;  // Add this import
import java.util.Collections;
import java.util.List;

public class TronTransactionPackage implements ReactPackage {

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        return Collections.singletonList(new TronTransaction(reactContext)); // Register your module here
    }


    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList(); // No view managers needed here
    }
}
