import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import CommonModalComponent from './CommonModal';
import Orders from './Orders';
import { useOrderStore } from '../../store/order.store';
import { Order, Sales } from '../../interface';
import { saveSales } from '../../api/sales';
import { useSalesStore } from '../../store/sales.store';
import SelectDropdown from 'react-native-select-dropdown';
import { DISCOUNT } from '../../constant';

const Basket = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { orders, updateOrder, voucher, createVoucher } = useOrderStore();
  const { saveSales, discount, setDiscount, vat } = useSalesStore();

  useEffect(() => {
    createVoucher(orders);
  }, [orders]);

  if (!voucher || !voucher.totalQuantity) return;

  const paymentProcess = (status: string) => {
    const orderData: Sales = {
      _id: new Date().valueOf(),
      customer: 'JM Copino',
      orders: orders,
      status: status,
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

        <SelectDropdown
          rowStyle={{ backgroundColor: 'blue' }}
          buttonTextStyle={{ textTransform: 'capitalize' }}
          defaultButtonText="Apply discount"
          selectedRowTextStyle={{
            textTransform: 'capitalize',
            fontWeight: 'bold',
          }}
          rowTextStyle={{ textTransform: 'capitalize' }}
          data={DISCOUNT}
          onSelect={(selectedItem, index) => {
            setDiscount(selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return `Discount: ${selectedItem.value * 100}%`;
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item.type;
          }}
        />
        <View style={{ flex: 1, flexDirection: 'row', maxHeight: 50 }}>
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={() => paymentProcess('paid')}
          >
            <Text style={styles.textStyle}>Pay</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={() => paymentProcess('park')}
          >
            <Text style={styles.textStyle}>Park</Text>
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
