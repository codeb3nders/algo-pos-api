import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import CommonModalComponent from './CommonModal';
import Orders from './Orders';
import { useOrderStore } from '../../store/order.store';

const Basket = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { orders, voucher, createVoucher } = useOrderStore();

  useEffect(() => {
    createVoucher(orders);
  }, [orders]);

  if (!voucher || !voucher.totalQuantity) return;

  return (
    <View>
      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={() => setModalVisible(!modalVisible)}
      >
        <Text style={styles.textStyle}>{`${voucher.totalQuantity} item${
          orders.length > 1 ? 's' : ''
        }`}</Text>
      </Pressable>

      <CommonModalComponent
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      >
        <Orders />
        <View style={{ flex: 1, flexDirection: 'row', maxHeight: 50 }}>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle}>Close</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle}>Pay</Text>
          </Pressable>
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
