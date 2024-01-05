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
import {moneyFormat} from '../../helpers/money-format';
import {usePrintVoucher} from '../../hooks/usePrinting';

const Receipt = () => {
  const voucher = usePrintVoucher();

  console.log(voucher);

  const onPress = async () => {
    try {
      console.log('We will invoke the native module here!');

      await blutoothPrinting(voucher);

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
