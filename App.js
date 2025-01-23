import { NativeModules, StyleSheet, Text, View, ScrollView, Button, ActivityIndicator, Image, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
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
const { CreateWallet, TronTransaction,ColorPalette } = NativeModules;
import { Buffer } from "buffer";
import SlideButton from './src/components/screens/Slider'
import { createDogecoinTransaction } from './src/components/Utils/dogeCoinUtils'
import { Provider } from 'react-redux'
import store from './src/Redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increamentByPayload, increment } from './src/Redux/Slices/counterSlice'
import { adduser, removeUser } from './src/Redux/Slices/userSlice'
import { fetchUsers } from './src/Redux/Slices/thunks'
import messaging from '@react-native-firebase/messaging';
import { firebase } from '@react-native-firebase/messaging'
import FlashMessage, { showMessage } from 'react-native-flash-message'
import { initializeAnalytics } from '@react-native-firebase/analytics'
import analytics from '@react-native-firebase/analytics';
import Navigator from './src/navigation/Navigator'

const App = () => {
  const dispatch = useDispatch()
  const { num } = useSelector((state) => (state.counter))
  const { user, length, loading, error } = useSelector((state) => (state.userlist))
    const [color, setColor] = useState('');
  
  // console.log("nuwm", num)
  // console.log("user", user)
  // console.log("length", length)
  // console.log("loading", loading)
  // console.log("error", error)

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
     
      getInitialNotification()
      getFcm();
      requestUserPermission()
      const fromAddress = 'DBgHW1Shjyk91fusm9hm3HcryNBwaFwZbQ'; // Replace with sender's address
      const toAddress = 'DRMvsostzbpnERSnSqQW5VTD6CEdRy4bsd';   // Replace with recipient's address
      const amount = 1000000; // Amount in satoshis (1 DOGE = 1000000 satoshis)
      const privateKey = '50a4b725ef35cb684ec4b4b2c658fc7f8dc0fc3c1013a507626bc4e17a439811'; // Replace with your private key in WIF format
      // createDogecoinTransaction(fromAddress, toAddress, amount, privateKey);

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
      // const mnemonic =   "cart expect inner finger ugly wonder build region three inspire expose retreat"
      // CreateWallet.generateKeysForAllBlockchains(
      //   mnemonic,
      //   (result) => {
      //     console.log('Generated Keys and Addresses:', result);
      //     // const ethPriv='0x' + Buffer.from(decodeBase64(res?.ETH_privateKey)).toString('hex');
      //     // const ethAddress = res?.ETH_address
      //     // console.log("ethPriv", ethPriv);
      //     // console.log("ethAddress", ethAddress);
      //   },
      //   (error) => {
      //     console.error('Error generating keys:', error);
      //   }
      // );

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

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
        Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
}, []);

  async function getInitialNotification(){
    //Handles when the app is launched via a notification Use this for cold starts (app is completely closed)
    messaging()
    .getInitialNotification()
    .then(async notificationOpen => {
      // console.log(
      //   ' getInitialNotification:::::',
      //   'push notification',
      //   notificationOpen,
      // );
    });
    
    //if app has opened from a background state.
    messaging().onNotificationOpenedApp(async remoteMessage => {
      console.log("onNotificationOpenedApp", remoteMessage)
    });


       //work when app is in forground mode
       messaging().onMessage(async remoteMessage => {
        console.log('remoteMessage from forground --------------',remoteMessage, );
  
        showMessage({
            position: 'top',
            message:
              remoteMessage.notification.body ||
              remoteMessage.notification.title,
            type: 'success',
            duration: 4000,
            backgroundColor: 'blue',
            titleStyle: {
              color:'white',
              height: Platform.OS == 'android' ? 35 : 150,
              marginTop: Platform.OS == 'android' ? 35 : 20,
            },
            style: {
              marginTop: Platform.OS == 'ios' ? 55 : 30,
              marginHorizontal: 5,
              borderRadius: 10,
              borderWidth: 0,
              paddingTop: -25
            },
            onPress: async () => {
                console.log("onPress Event:::::")
            },
          });
       
      });


  }

  async function requestUserPermission() {
    const authorizationStatus = await messaging().requestPermission();
    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED || 
        authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL) {
      // console.log('Notification permission granted');
    } else {
      // console.log('Notification permission denied');
    }
  }

    useEffect(() => {
      // ColorPalette.getDominantColorFromUrl('https://www.iconarchive.com/download/i109534/cjdowner/cryptocurrency-flat/Ethereum-ETH.1024.png')
      //   .then(colorRes => {
      //     // console.log('Dominant color:', colorRes);
      //     // setColor(colorRes) // Output will be an integer representing the color
      //   })
      //   .catch(error => {
      //     console.error('Error:', error);
      //   });
    }, []);

  const getFcm = async () => {
    try {
      const fcmToken = await firebase.messaging().getToken();
      // console.log('fcm token:::::::', fcmToken);
    } catch (error) {
      // console.log('fcm tokencatchcatch:::::::', error);
    }
  }

  if(true) return(
    <View style={{flex:1}}>
<Navigator/>
    </View>
  )


  return (
    <View style={[{ flex: 1, justifyContent: "center", alignItems: "center" }]}>
      {/* <Portfolio /> */}
      {/* <LineChartScreen/> */}
      {/* <MultiLineChart /> */}
      {/* <SlideButton/> */}
      <Text>Crypto</Text>
      <Button onPress={async () => {
        dispatch(increment())
     await   analytics().logEvent("increment", {
      id: '1',
      name: 'App Opened',
    });
        }} title='increment' />
      <Button onPress={() => { dispatch(decrement()) }} title='decrement' />
      <Button onPress={() => { dispatch(increamentByPayload(3)) }} title='incrementByPayload' />

      <Button onPress={() => { dispatch(adduser(`USER${length + 1}`)) }} title='ADDUSER' />
      <Button onPress={() => { dispatch(removeUser(0)) }} title='removeUser' />
      <Button onPress={() => { dispatch(fetchUsers()); }} title='fetchUsers' />
      {/* <MultipleLinesChartDecorator/> */}
      {/* <SvgMultiLineChart/> */}
      {/* <SvgPieChartCommon data={data23}/> */}
      {
        error &&
        <Text style={{ color: "red" }}>
          {"error"}
        </Text>}
      <ActivityIndicator animating={!!loading} />
      {/* {!loading && <ScrollView
        showsHorizontalScrollIndicator={!true}
        horizontal={true}>
        {user.map((item) => {
          return (
            <Image
              key={item.id}
              source={{ uri: item.image }} style={{
                width: 55,
                height: 55,
                borderRadius: 50,
                margin: 10,
              }} />
          )
        })}
      </ScrollView>} */}
      <FlashMessage position="top" />
    </View>
  )
}

export default App

const styles = StyleSheet.create({})