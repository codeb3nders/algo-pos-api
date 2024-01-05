import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import ModalComponent from '../common/modal-component';
import {useOrderStore} from '../../store/order.store';
import {Sales} from '../../interface';
import {useSalesStore} from '../../store/sales.store';

import AntDesign from 'react-native-vector-icons/AntDesign';
import BasketContent from './basket-content';

const BasketComponent = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const {orders, updateOrder, voucher, createVoucher} = useOrderStore();
  const {saveSales, discount} = useSalesStore();
  const [paymentModalVisible, setPaymentModalVisible] =
    useState<boolean>(false);
  const [paymentDetails, setPaymentDetails] = useState<any>();

  useEffect(() => {
    createVoucher(orders);
  }, [orders]);

  if (!voucher || !voucher.totalQuantity) return;

  return (
    <View style={{position: 'absolute', bottom: 5, right: 5}}>
      <TouchableOpacity
        style={[styles.button, styles.buttonCtr]}
        onPress={() => setModalVisible(!modalVisible)}>
        <Text style={styles.textStyle}>
          <AntDesign name="shoppingcart" size={18} color="white" />{' '}
          {voucher.totalQuantity}
        </Text>
      </TouchableOpacity>

      {modalVisible && (
        <ModalComponent
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}>
          <BasketContent
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        </ModalComponent>
      )}
    </View>
  );
};

export default BasketComponent;

const styles = StyleSheet.create({
  itemLayout: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'gray',
    height: 100,
    width: 100,
    margin: 5,
  },
  item: {
    margin: 5,
    padding: 5,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    width: 100,
    height: 40,
    margin: 2,
    backgroundColor: '#2196F3',
  },
  buttonCtr: {
    margin: 2,
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    // fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
