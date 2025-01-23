
package com.reactnativeplus;

import android.graphics.Bitmap;
import androidx.annotation.NonNull;
import androidx.palette.graphics.Palette;

import com.bumptech.glide.Glide;
import com.bumptech.glide.request.target.Target;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ColorPalette extends ReactContextBaseJavaModule {

    private final ExecutorService executorService = Executors.newSingleThreadExecutor();

    public ColorPalette(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "ColorPalette";
    }

    @ReactMethod
    public void getDominantColorFromUrl(String imageUrl, Promise promise) {
        executorService.execute(() -> {
            try {
                // Download the image using Glide
                Bitmap bitmap = Glide.with(getReactApplicationContext())
                        .asBitmap()
                        .load(imageUrl)
                        .submit(Target.SIZE_ORIGINAL, Target.SIZE_ORIGINAL)
                        .get();

                // Generate a color palette
                Palette palette = Palette.from(bitmap).generate();
                int dominantColor = palette.getDominantColor(0x000000); // Default to black if no color found

                String hexColor = String.format("#%06X", (0xFFFFFF & dominantColor));

                promise.resolve(hexColor); // Resolve the hex color string
           // Resolve the color as an integer
            } catch (Exception e) {
                promise.reject("ERROR", e.getMessage());
            }
        });
    }
}
