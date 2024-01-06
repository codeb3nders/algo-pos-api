import ThermalPrinterModule from 'react-native-thermal-printer';
import {Order, Sales} from '../interface';
import {moneyFormat} from './money-format';
import {Alert} from 'react-native';

export async function blutoothPrinting(data: any) {
  try {
    console.log('We will invoke the native module here!');
    await ThermalPrinterModule.printBluetooth({
      payload: data,
      printerNbrCharactersPerLine: 38,
    });

    console.log('done printing');
  } catch (err: any) {
    Alert.alert('Error printing', err.message);
    console.log(err.message);
  }
}

export const prepareVoucher = (voucher: Sales) => {
  let txt = '\n[L]<b>ORDER INVOICE</b>\n';
  const prepare = () => {
    const allOrders = voucher.orders;

    if (!allOrders) return;

    let itemCount = 0;

    allOrders.forEach((item: Order) => {
      itemCount += item.quantity | 0;
      const itm = item ? item.item : '';
      const price = item ? item.price : 0;
      const deduct = item.deduction ? item.deduction.value : 0;
      const opt = item ? item.option : 0;
      const quantity = item ? item.quantity : 0;
      const totalAmount = price * quantity;
      const deduction = deduct > 0 && deduct;

      const discountedAmount = totalAmount - deduct;
      const withDuction = deduction ? `-${deduction}` : '';
      txt += ` ${quantity} ${itm} ${opt}: ${moneyFormat(
        price,
      )} ${withDuction} = ${moneyFormat(discountedAmount)}\n`;
    });

    txt += '[C]-----------------------\n';

    if (voucher.discount) {
      txt += `[L]Dsicount: ${voucher.discount}\n`;
    }

    txt += `[L]${itemCount} items, <b>Amount: ${moneyFormat(
      voucher.amount,
    )}</b>\n`;
  };

  prepare();
  return txt;
};
