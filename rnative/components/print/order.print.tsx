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
import {usePrintOrder} from '../../hooks/usePrinting';

const ToPrint = () => {
  const voucher = usePrintOrder();

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
      <WhiteText text="Print order" />
    </ButtonComponent>
  );
};

export default ToPrint;
