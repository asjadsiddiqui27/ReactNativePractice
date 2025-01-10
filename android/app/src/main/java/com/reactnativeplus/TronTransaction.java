package com.reactnativeplus;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

import wallet.core.jni.HDWallet;
import wallet.core.jni.PrivateKey;
import wallet.core.jni.proto.Tron;
import wallet.core.jni.AnyAddress;
import wallet.core.jni.TronMessageSigner;

import wallet.core.jni.proto.Common;
import android.util.Base64;

import okhttp3.*;
import org.json.JSONObject;

public class TronTransaction extends ReactContextBaseJavaModule {

    public TronTransaction(ReactApplicationContext reactContext) {
        super(reactContext);
        System.loadLibrary("TrustWalletCore");
    }

    @Override
    public String getName() {
        return "TronTransaction";
    }

    @ReactMethod
    public void signTransaction(final Callback successCallback, final Callback errorCallback) {
        try {
            String result = "signTransaction executed successfully";
            successCallback.invoke(result); // Just call invoke without 'return'
        } catch (Exception e) {
            errorCallback.invoke(e.getMessage()); // Just call invoke without 'return'
        }
    }

    @ReactMethod
    public void trxTransactions() {
        // try{

        OkHttpClient client = new OkHttpClient();
        Request request = new Request.Builder()
                .url("https://api.trongrid.io/wallet/getnowblock")
                .post(RequestBody.create("", MediaType.parse("application/json")))
                .build();

        try (Response response = client.newCall(request).execute()) {
            if (response.isSuccessful() && response.body() != null) {
                String responseBody = response.body().string();
                JSONObject jsonResponse = new JSONObject(responseBody);

                // Extract block hash and block number
                String latestBlockHash = jsonResponse.getString("blockID"); // Hexadecimal string
                long latestBlockNumber = jsonResponse.getJSONObject("block_header")
                        .getJSONObject("raw_data")
                        .getLong("number");

                String recipientAddress = "TWBkPVcYGXEKVZHQfGV7u8bwYyJaQ3PJs4"; // Replace with recipient's TRON address
                String addressTRX = "TKbnY9ehgjqLdg8fWMPsaBiypkCoQemFxM"; // Replace with recipient's TRON address
                long amount = 1000000; // Sending 100 TRX (1 TRX = 1,000,000 SUN)

                Tron.TransferContract transfer = Tron.TransferContract.newBuilder()
                        .setOwnerAddress(addressTRX)
                        .setToAddress(recipientAddress)
                        .setAmount(amount)
                        .build();

                System.out.println("Block Hash: " + latestBlockHash);
                System.out.println("Block Number: " + latestBlockNumber);
                System.out.println("transfer transfer: " + transfer);

            } else {
                System.err.println("Failed to fetch block info: " + response.message());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    @ReactMethod
    public void signTransactionsTwo(
            String ownerAddress,
            String toAddress,
            String privateKeyStr,
            Callback successCallback,
            Callback errorCallback) {
        try {
            // 1. Decode the private key
            byte[] privateKeyBytes = hexStringToByteArray(privateKeyStr);
            PrivateKey privateKey = new PrivateKey(privateKeyBytes);

            long num = 95807;
            // 2. Build a Tron transfer contract
            Tron.TransferContract contract = Tron.TransferContract.newBuilder()
                    .setOwnerAddress(ownerAddress)
                    .setToAddress(toAddress)
                    .setAmount(num)
                    .build();

            // Serialize the contract into a string
            byte[] contractBytes = contract.toByteArray();
            String serializedContract = android.util.Base64.encodeToString(contractBytes, Base64.DEFAULT);

            // String bytesToHex1= bytesToHex(contractBytes);

            // Pass serialized contract to callback
            successCallback.invoke(serializedContract);
        } catch (Exception e) {
            errorCallback.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void signSerializedContract(
            String serializedContract,
            String privateKeyStr,
            Callback successCallback,
            Callback errorCallback) {
        try {
            // 1. Decode the private key
            byte[] privateKeyBytes = hexStringToByteArray(privateKeyStr);
            PrivateKey privateKey = new PrivateKey(privateKeyBytes);

            // 2. Decode the serialized contract from Base64
            byte[] contractBytes = android.util.Base64.decode(serializedContract, android.util.Base64.DEFAULT);

            // 4. Sign the contract
            byte[] signatureBytes = TronMessageSigner.signMessage(privateKey, serializedContract).getBytes();

            // 5. Convert signature bytes to a hex string
            String signatureHex = byteArrayToHexString(signatureBytes);

            // 6. Pass the signature to the callback
            successCallback.invoke(signatureHex);
        } catch (Exception e) {
            errorCallback.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public static String bytesToHex(byte[] bytes) {
        StringBuilder hexString = new StringBuilder();
        for (byte b : bytes) {
            hexString.append(String.format("%02x", b));
        }
        return hexString.toString();
    }

    // Helper method to convert byte array to hex string
    private String byteArrayToHexString(byte[] bytes) {
        StringBuilder hexString = new StringBuilder();
        for (byte b : bytes) {
            String hex = Integer.toHexString(0xFF & b);
            if (hex.length() == 1) {
                hexString.append('0');
            }
            hexString.append(hex);
        }
        return hexString.toString();
    }

    // Helper method to convert hex string to byte array
    private byte[] hexStringToByteArray(String s) {
        int len = s.length();
        byte[] data = new byte[len / 2];
        for (int i = 0; i < len; i += 2) {
            data[i / 2] = (byte) ((Character.digit(s.charAt(i), 16) << 4)
                    + Character.digit(s.charAt(i + 1), 16));
        }
        return data;
    }

}
