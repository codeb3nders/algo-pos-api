import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  useColorScheme,
  Button,
  TextInput,
  View,
  Text,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {useOrderStore} from '../../store/order.store';
import {useSalesStore} from '../../store/sales.store';
import {blutoothPrinting} from '../../helpers/printer';
import ButtonComponent from '../common/button-component';
import WhiteText from '../common/white-text-component';

const Receipt = () => {
  const orderStore = useOrderStore();
  const {sales, discount, setDiscount, vat} = useSalesStore();
  const {orders, voucher, createVoucher} = orderStore;
  const isDarkMode = useColorScheme() === 'dark';

  const [state, setState] = useState({
    text: "[L]<font size='tall'>Customer :</font>\n",
  });

  const prepare = () => {
    const allOrders = voucher?.orders;

    if (!allOrders) return;

    let txt = '[L]<b>ORDER INVOICE</b>\n';

    Object.keys(allOrders).forEach((order: any) => {
      const {orders} = voucher.orders[order];

      orders.forEach(item => {
        const itm = item ? item.item : '';
        const price = item ? item.price : 0;
        const deduct = item.deduction ? item.deduction.value : 0;
        const opt = item ? item.option : 0;
        const quantity = item ? item.quantity : 0;
        const totalAmount = price * quantity;
        const deduction = deduct > 0 && deduct;

        const discountedAmount = totalAmount - deduct;
        const withDuction = deduction ? `-${deduction}` : '';
        txt += ` ${quantity} ${itm} ${opt}: ${price} ${withDuction} = ${discountedAmount}\n`;
      });
    });

    txt += '[L]-----------------------\n';
    if (discount) {
      txt += `[L]Dsicount: ${discount.type}\n`;
    }

    txt += `[L]${voucher.totalQuantity} items, <b>Amount: ${voucher.totalPrice}</b>\n`;

    setState(() => ({text: txt}));
  };

  useEffect(() => {
    prepare();
  }, [voucher]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // console.log('TEXT', state.text);
  const s = {
    orders: {
      'French Fries': {
        orders: [Array],
        totalItemsByItem: 1,
        totalPriceByItem: 110,
      },
      Taro: {orders: [Array], totalItemsByItem: 1, totalPriceByItem: 70},
      'java chip frppe': {
        orders: [Array],
        totalItemsByItem: 1,
        totalPriceByItem: 120,
      },
    },
    totalPrice: 300,
    totalQuantity: 3,
  };

  const onPress = async () => {
    try {
      console.log('We will invoke the native module here!');
      //   await ThermalPrinterModule.printBluetooth({payload: state.text});

      console.log(voucher);

      console.log('TO PRING', state.text);

      //   await blutoothPrinting(state.text);

      console.log('done printing');
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <ButtonComponent style={{marginTop: 20}} onPress={onPress}>
      <WhiteText text="Print receipt" />
    </ButtonComponent>
  );
};

export default Receipt;
