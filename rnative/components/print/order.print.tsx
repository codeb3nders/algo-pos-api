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

const ToPrint = () => {
  const orderStore = useOrderStore();
  useSalesStore();
  const {voucher, createVoucher} = orderStore;
  const isDarkMode = useColorScheme() === 'dark';

  const [state, setState] = useState({
    text: "[L]<font size='tall'>Customer :</font>\n",
  });

  const prepare = () => {
    const allOrders = voucher?.orders;

    if (!allOrders) return;

    let txt = '[L]KITCHEN ORDER\n';

    Object.keys(allOrders).forEach((order: any) => {
      const {orders} = voucher.orders[order];

      orders.forEach(item => {
        const itm = item ? item.item : '';
        const price = item ? item.price : 0;
        const opt = item ? item.option : 0;
        const quantity = item ? item.quantity : 0;
        txt += `${itm} ${opt}: x ${quantity} \n`;
      });
    });

    txt += `=============End==============`;

    setState(() => ({text: txt}));
  };

  useEffect(() => {
    prepare();
  }, [voucher]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const onPress = async () => {
    try {
      console.log('We will invoke the native module here!');

      await blutoothPrinting(state.text);

      console.log('done printing');
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <ButtonComponent style={{marginTop: 20}} onPress={onPress}>
      <WhiteText text="Print order" />
    </ButtonComponent>
  );
};

export default ToPrint;
