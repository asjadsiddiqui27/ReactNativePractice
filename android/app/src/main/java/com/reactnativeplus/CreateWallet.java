package com.reactnativeplus;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;


import wallet.core.jni.HDWallet;
import wallet.core.jni.CoinType;
import wallet.core.jni.PrivateKey;
// import wallet.core.jni.PublicKey;
// import wallet.core.jni.Address;
import org.bitcoinj.core.Sha256Hash;
import java.security.MessageDigest;
import java.util.Arrays;
import org.bitcoinj.core.Base58;

import java.util.Base64;
import org.json.JSONObject;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.Security;

public class CreateWallet extends ReactContextBaseJavaModule {

    public CreateWallet(ReactApplicationContext reactContext) {
        super(reactContext);
        System.loadLibrary("TrustWalletCore");
    }

    @Override
    public String getName() {
        return "CreateWallet";
    }

    @ReactMethod
    public void generateMnemonics(final Callback successCallback, final Callback errorCallback) {
        try {
            // Set default strength value (128)
            int strength = 128;
            String passphrase = "";

            // Generate the HDWallet with the default strength and given passphrase
            HDWallet wallet = new HDWallet(strength, passphrase);
            String mnemonic = wallet.mnemonic(); // Get the mnemonic phrase

            // Return the mnemonic to JavaScript
            // successCallback.invoke("{\"mnemonics\": \"" + mnemonic + "\"}");
            generateKeysForAllBlockchains(mnemonic, successCallback, errorCallback);

        } catch (Exception e) {
            // Handle any error and return it to JavaScript
            errorCallback.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void generateKeysForAllBlockchains(final String mnemonics, final Callback successCallback,
            final Callback errorCallback) {
        try {
            // Example for generating keys for Bitcoin (BTC)
            HDWallet wallet = new HDWallet(mnemonics, "");
            CoinType coinEth = CoinType.ETHEREUM;
            CoinType coinBtc = CoinType.BITCOIN;
            CoinType coinXRP = CoinType.XRP;
            CoinType coinSui = CoinType.SUI;
            CoinType coinTron = CoinType.TRON;


            //*************************************  ETH  *******************************************// 

            String addressETH = wallet.getAddressForCoin(coinEth);
            // String ethSeeds =
            // Base64.getEncoder().encodeToString(wallet.getKeyForCoin(coinEth).data());
            // //no need encodeinBase64String
            byte[] privateKeyEthBytes = wallet.getKeyForCoin(coinEth).data(); // Extract the raw private key data as a
                                                                              // byte array

            // Step 1: Decode the Base64 string
            // byte[] decodedPrivateKey = Base64.getDecoder().decode(ethSeeds);

            // Step 2: Use the decoded private key (byte array)
            // Example: print the decoded private key as a hexadecimal string
            String hexPrivateKey = bytesToHex(privateKeyEthBytes);
            // Step 3: Use the decoded private key as needed (e.g., for Ethereum signing)
            // Example: You can now use decodedPrivateKey with Ethereum libraries
            JSONObject eth = new JSONObject();
            eth.put("ETH_address", addressETH);
            // eth.put("ETH_seeds", ethSeeds);
            eth.put("hexPrivateKey", hexPrivateKey);

            // eth.put("PrivateKey", keyInString);

          
           
           
            //*************************************TRX*******************************************// 
           
            String addressTRX = wallet.getAddressForCoin(coinTron); // Tron address
            PrivateKey privateKeyTRX = wallet.getKeyForCoin(coinTron);
            byte[] privateKeyTRXBytes = privateKeyTRX.data(); // Extract the raw private key data as a byte array
             String privateKeyTRXBase64 = Base64.getEncoder().encodeToString(privateKeyTRXBytes); // Convert the byte
            System.out.println("privateKprivateKeyTRXBase64eyTRXBytes  "+privateKeyTRXBase64);
                                                                                                 // array to a Base64
                                                                                                 // encoded string
            String hexTRXPrivateKey = bytesToHex(privateKeyTRXBytes);
            
            JSONObject tron = new JSONObject();
            tron.put("TRX_address", addressTRX);
            tron.put("TRX_privateKey", hexTRXPrivateKey);


         
            //*************************************  BTC  *******************************************// 

            String addressBTC = wallet.getAddressForCoin(coinBtc);

            PrivateKey privateKeyBTC = wallet.getKeyForCoin(coinBtc);
            System.out.println("privateKeyBTC"+privateKeyBTC);
            byte[] privateKeyBTCBytes = privateKeyBTC.data();
            System.out.println("privateKeyBTCBytes"+privateKeyBTCBytes);

            // Encode the private key in WIF format
            String stringPrivateKeyBTC = toWIF(privateKeyBTCBytes,true,coinBtc);
            // String seedBTC = Base64.getEncoder().encodeToString(wallet.getKeyForCoin(coinBtc).data());
            
            JSONObject btc = new JSONObject();
            btc.put("BTC_address", addressBTC);
            btc.put("BTC_privateKey", stringPrivateKeyBTC);




           
            //*************************************  Final Response Object  *******************************************// 

            JSONObject result = new JSONObject();
            result.put("mnemonics", mnemonics);
            result.put("ETH", eth);
            result.put("Tron", tron);
            result.put("BTC", btc);
            successCallback.invoke(result.toString());

        } catch (Exception e) {
            // Handle any error and return it to JavaScript
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
   
   
    @ReactMethod
    public static String encodePrivateKeyToWif(byte[] privateKeyBytes) {
        // The following is a simplified Base58Check encoding for Bitcoin's private keys.
        byte[] prefix = {(byte) 0x80}; // Mainnet version byte for private keysMainnet version byte for private keys
        byte[] payload = new byte[prefix.length + privateKeyBytes.length];
        
        System.arraycopy(prefix, 0, payload, 0, prefix.length);
        System.arraycopy(privateKeyBytes, 0, payload, prefix.length, privateKeyBytes.length);
    
        // Generate checksum
        byte[] checksum = Arrays.copyOfRange(Sha256Hash.hash(Sha256Hash.hash(payload)), 0, 4);
        byte[] payloadWithChecksum = new byte[payload.length + checksum.length];
        
        System.arraycopy(payload, 0, payloadWithChecksum, 0, payload.length);
        System.arraycopy(checksum, 0, payloadWithChecksum, payload.length, checksum.length);
    
        // Base58 encoding
        return Base58.encode(payloadWithChecksum);
    }
    @ReactMethod
    public static String toWIF(byte[] keyData, boolean compressed, CoinType cointype) {
        // Add version prefix (0x80 for Bitcoin mainnet)
        byte[] versionedKey = new byte[keyData.length + 1];
        if(cointype == CoinType.BITCOIN){
            versionedKey[0] = (byte)  0x80;
        }
        else {
            versionedKey[0] = (byte)  0xB0;
        }

        System.arraycopy(keyData, 0, versionedKey, 1, keyData.length);

        // Add compression flag (0x01) if compressed
        byte[] keyWithCompression;
        if (compressed) {
            keyWithCompression = new byte[versionedKey.length + 1];
            System.arraycopy(versionedKey, 0, keyWithCompression, 0, versionedKey.length);
            keyWithCompression[versionedKey.length] = 0x01;
        } else {
            keyWithCompression = versionedKey;
        }

        // Perform double SHA-256 for checksum
        MessageDigest sha256Digest = null;//getInstance("SHA-256");
        try {
            sha256Digest = MessageDigest.getInstance("SHA-256");
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
        byte[] hash1 = sha256Digest.digest(keyWithCompression);
        byte[] hash2 = sha256Digest.digest(hash1);

        // Take the first 4 bytes as the checksum
        byte[] checksum = new byte[4];
        System.arraycopy(hash2, 0, checksum, 0, 4);

        // Concatenate key with checksum
        byte[] wifBytes = new byte[keyWithCompression.length + checksum.length];
        System.arraycopy(keyWithCompression, 0, wifBytes, 0, keyWithCompression.length);
        System.arraycopy(checksum, 0, wifBytes, keyWithCompression.length, checksum.length);

        // Encode the result to Base58
        return Base58.encode(wifBytes);
    }

}