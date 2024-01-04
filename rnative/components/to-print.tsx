import React, {useState} from 'react';
import {SafeAreaView, useColorScheme, Button, TextInput} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import ThermalPrinterModule from 'react-native-thermal-printer';

ThermalPrinterModule.defaultConfig = {
  ...ThermalPrinterModule.defaultConfig,
  ip: '192.168.100.246',
  port: 9100,
  timeout: 30000,
};

const ToPrint = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [state, setState] = useState({
    text:
      "[L]<font size='tall'>Customer :</font>\n" +
      '[L]Raymond DUPONT\n' +
      '[L]5 rue des girafes\n' +
      '[L]31547 PERPETES\n' +
      '[L]Tel : +33801201456\n' +
      '[L]\n' +
      "[C]<barcode type='ean13' height='10'>143525481435254</barcode>\n" +
      "[C]<qrcode size='20'>Mebel Rose</qrcode>",
  });

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const onPress = async () => {
    try {
      console.log('We will invoke the native module here!');
      //   await ThermalPrinterModule.printBluetooth({payload: state.text});

      await ThermalPrinterModule.printBluetooth({
        payload: state.text,
        printerNbrCharactersPerLine: 38,
      });

      //
      // bluetooth
      // await ThermalPrinterModule.printBluetooth({ payload: state.text });
      //

      console.log('done printing');
    } catch (err: any) {
      //error handling
      console.log(err.message);
    }
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <TextInput
        value={state.text}
        onChangeText={text => setState(prev => ({...prev, text}))}
      />
      <Button
        title="Click to invoke your native module!"
        color="#841584"
        onPress={onPress}
      />
    </SafeAreaView>
  );
};

export default ToPrint;
