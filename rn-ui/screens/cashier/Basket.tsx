import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import CommonModalComponent from './CommonModal';
import Orders from './Orders';
import { useOrderStore } from '../../store/order.store';
import { Order, Sales } from '../../interface';
import { saveSales } from '../../api/sales';
import { useSalesStore } from '../../store/sales.store';

const Basket = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { orders, updateOrder, voucher, createVoucher } = useOrderStore();
  const { saveSales, discount, vat } = useSalesStore();

  useEffect(() => {
    createVoucher(orders);
  }, [orders]);

  if (!voucher || !voucher.totalQuantity) return;

  const paymentProcess = () => {
    const orderData: Sales = {
      customer: 'JM Copino',
      orders: orders,
      status: 'paid',
      paymentMethod: 'cash',
      date: new Date(),
      amount: voucher.totalPrice - (discount ? discount.value : 0),
      discount: discount ? discount.value : 0,
      Vat: 10,
    };

    saveSales(orderData);

    updateOrder([]);

    setModalVisible(!modalVisible);
  };

  return (
    <View style={{ position: 'absolute', bottom: 5, right: 5 }}>
      <TouchableOpacity
        style={[styles.button, styles.buttonCtr]}
        onPress={() => setModalVisible(!modalVisible)}
      >
        <Text style={styles.textStyle}>{voucher.totalQuantity}</Text>
      </TouchableOpacity>

      <CommonModalComponent
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      >
        <Orders />
        <View style={{ flex: 1, flexDirection: 'row', maxHeight: 50 }}>
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={() => paymentProcess()}
          >
            <Text style={styles.textStyle}>Pay</Text>
          </TouchableOpacity>
        </View>
      </CommonModalComponent>
    </View>
  );
};

export default Basket;

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
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
