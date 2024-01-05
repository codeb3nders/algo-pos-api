import ThermalPrinterModule from 'react-native-thermal-printer';

export async function blutoothPrinting(data: any) {
  try {
    console.log('We will invoke the native module here!');
    await ThermalPrinterModule.printBluetooth({
      payload: data,
      printerNbrCharactersPerLine: 38,
    });

    console.log('done printing');
  } catch (err: any) {
    console.log(err.message);
  }
}
