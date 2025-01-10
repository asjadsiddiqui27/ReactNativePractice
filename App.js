import { NativeModules, StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import Home from './src/components/screens/Home'
import Portfolio from './src/components/screens/Portfolio'
import MultiLineChart from './src/components/screens/MultiLineChart'
import LineChartScreen from './src/components/screens/LineChartScreen'
import PieChart from './src/components/screens/PieChart'
import SvgPieChart from './src/components/screens/SvgPieChart'
import SvgPieChartCommon from './src/components/common/SvgPieChartCommon'
import HooksPractice from './src/components/screens/HooksPractice'
import MultipleLinesChartDecorator from './src/components/screens/Charts'
import SvgMultiLineChart from './src/components/common/SvgMultiLineChart'
import { decodeBase64 } from './src/components/Utils/methodUtils'
const { CreateWallet, TronTransaction } = NativeModules;
import { Buffer } from "buffer";
import SlideButton from './src/components/screens/Slider'

const App = () => {
  const data23 = [
    { key: 1, value: "50", color: '#F7931A', label: 'Bitcoin' },
    { key: 2, value: "30", color: '#ACD92F', label: 'Solana' },
    { key: 3, value: 10, color: '#7B86CB', label: 'Avalanche' },
    { key: 4, value: 34, color: '#5BCA7F', label: 'Tether USD' },
    { key: 5, value: 56, color: '#0713FC', label: 'Base' },
    { key: 6, value: 73, color: '#E84142', label: 'Tron' },
    { key: 7, value: 12, color: '#6B429B', label: 'Jupiter' },
  ];
  useEffect(() => {
    try {
      // CreateWallet.generateMnemonics(
      //   (result) => {
      //     const walletInfo = JSON.parse(result);
      //     console.log('Mnemonics:', walletInfo.mnemonics);
      //     console.log('Mnemonics:', walletInfo);
      //     // console.log('ETH Address:', walletInfo.eth.address);
      //     // console.log('BTC Address:', walletInfo.btc.address);
      //     // console.log('LTC Address:', walletInfo.ltc.address);
      //   },
      //   (error) => {
      //     console.error('Error:', error);
      //   }
      // );

      const mnemonic = "lady attitude unaware region awake woman gain trim buddy cradle sorry brave";
      const mnemonic2 =   "cart expect inner finger ugly wonder build region three inspire expose retreat"
      CreateWallet.generateKeysForAllBlockchains(
        mnemonic2,
        (result) => {
          console.log('Generated Keys and Addresses:', result);
          // const ethPriv='0x' + Buffer.from(decodeBase64(res?.ETH_privateKey)).toString('hex');
          // const ethAddress = res?.ETH_address
          // console.log("ethPriv", ethPriv);
          // console.log("ethAddress", ethAddress);
        },
        (error) => {
          console.error('Error generating keys:', error);
        }
      );

      // TronTransaction.trxTransactions()

      // TronTransaction.signTransactionsTwo("TKbnY9ehgjqLdg8fWMPsaBiypkCoQemFxM",
      //   "TAwU7FibPyvDyDGxovU7KqeztB5P28vTEW",
      //   "d73ecf368a0f56eb79d79b3f15278a59cdc2175e5e5380269d6cd9a6dc1bf202", (serializedContract) => {
      //     console.log('signTransaction:', serializedContract);


      //     TronTransaction.signSerializedContract(
      //       serializedContract,
      //       "d73ecf368a0f56eb79d79b3f15278a59cdc2175e5e5380269d6cd9a6dc1bf202",
      //       (signature) => {
      //         console.log("Signature Hex:", signature);
      //       },
      //       (error) => {
      //         console.error("Error Signing Contract:", error);
      //       }
      //     );


      //   }, (err) => {
      //     console.log('signTransaction', err);
      //   });

    } catch (error) {
      console.error('Error:s', error);
    }
  }, [])
  return (
    <View style={[{ flex: 1, justifyContent: "center", alignItems: "center" }]}>
      {/* <Portfolio /> */}
      {/* <LineChartScreen/> */}
      {/* <MultiLineChart /> */}
      {/* <SlideButton/> */}
      <Text>Cryp</Text>
      {/* <MultipleLinesChartDecorator/> */}
      {/* <SvgMultiLineChart/> */}
      {/* <SvgPieChartCommon data={data23}/> */}
    </View>
  )
}

export default App

const styles = StyleSheet.create({})