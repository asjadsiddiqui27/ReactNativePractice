import Foundation
import WalletCore
import CommonCrypto
import CryptoSwift

@objc(CreateWallet)
class CreateWallet: NSObject {
  
  @objc
  func generateMnemonics(_ successCallback: @escaping RCTResponseSenderBlock, errorCallback: @escaping RCTResponseSenderBlock) {
    let strength: Int32 = 128
    let passphrase = ""

    guard let wallet = HDWallet(strength: strength, passphrase: passphrase) else {
      errorCallback(["Failed to create HDWallet instance"])
      return
    }

    let mnemonic = wallet.mnemonic
    generateKeysForAllBlockchains(mnemonic, successCallback: successCallback, errorCallback: errorCallback)
  }

  @objc
  func generateKeysForAllBlockchains(_ mnemonics: String, successCallback: @escaping RCTResponseSenderBlock, errorCallback: @escaping RCTResponseSenderBlock) {
    guard let wallet = HDWallet(mnemonic: mnemonics, passphrase: "") else {
      errorCallback(["Failed to create HDWallet instance from mnemonic"])
      return
    }

    do {
      // ETH
      let ethAddress = wallet.getAddressForCoin(coin: .ethereum)
      let ethPrivateKey = wallet.getKeyForCoin(coin: .ethereum).data
      let ethHexPrivateKey = ethPrivateKey.hexString
      
      let eth: [String: String] = [
        "ETH_address": ethAddress,
        "hexPrivateKey": ethHexPrivateKey
      ]

      // TRX
      let trxAddress = wallet.getAddressForCoin(coin: .tron)
      let trxPrivateKey = wallet.getKeyForCoin(coin: .tron).data
      let trxHexPrivateKey = trxPrivateKey.hexString
      
      let trx: [String: String] = [
        "TRX_address": trxAddress,
        "TRX_privateKey": trxHexPrivateKey
      ]

      // BTC
      let btcAddress = wallet.getAddressForCoin(coin: .bitcoin)
      let btcPrivateKey = wallet.getKeyForCoin(coin: .bitcoin).data
      let btcWifPrivateKey = try encodeToWIF(privateKey: btcPrivateKey, compressed: true, coinType: .bitcoin)
      
      let btc: [String: String] = [
        "BTC_address": btcAddress,
        "BTC_privateKey": btcWifPrivateKey
      ]

      // Final response
      let result: [String: Any] = [
        "mnemonics": mnemonics,
        "ETH": eth,
        "Tron": trx,
        "BTC": btc
      ]

      successCallback([result])
    } catch {
      errorCallback(["Error generating keys: \(error.localizedDescription)"])
    }
  }

  private func encodeToWIF(privateKey: Data, compressed: Bool, coinType: CoinType) throws -> String {
      // Add version prefix based on CoinType
    var versionedKey = Data()
    if(coinType == CoinType.bitcoin){
       versionedKey = Data([0x80]) + privateKey
    }
    else{
       versionedKey = Data([0xB0]) + privateKey
    }
      
     // Step 2: Add compression flag (0x01) if compressed
     if compressed {
       versionedKey.append(0x01)
     }
     
     // Step 3: Perform double SHA-256 for checksum
     let hash1 = versionedKey.sha256()
     let hash2 = hash1.sha256()
     
     // Take the first 4 bytes as the checksum
     let checksum = hash2.prefix(4)
     
     // Step 4: Concatenate key with checksum
     let wifBytes = versionedKey + checksum
     
    let pvtKey = Base58.encodeNoCheck(data:wifBytes)
     
     
     // Step 5: Encode the result to Base58
     return pvtKey

  }

}

extension Data {
  var hexString: String {
    map { String(format: "%02x", $0) }.joined()
  }

  var doubleSHA256: Data {
    let hash1 = sha256()
    return hash1.sha256()
  }

  func sha256() -> Data {
    var hash = Data(count: Int(CC_SHA256_DIGEST_LENGTH))
    _ = hash.withUnsafeMutableBytes { hashBytes in
      withUnsafeBytes { messageBytes in
        CC_SHA256(messageBytes.baseAddress, CC_LONG(count), hashBytes.bindMemory(to: UInt8.self).baseAddress)
      }
    }
    return hash
  }
}
