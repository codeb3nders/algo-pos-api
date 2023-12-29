import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import ModalComponent from '../common/modal-component';
import Orders from './orders-component';
import { useOrderStore } from '../../store/order.store';
import { Sales } from '../../interface';
import { useSalesStore } from '../../store/sales.store';
import SelectDropdown from 'react-native-select-dropdown';
import { AntDesign } from '@expo/vector-icons';
import { DISCOUNT } from '../../constant';
import PayMentMethodComponent from './payment-method-component';

const BasketComponent = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { orders, updateOrder, voucher, createVoucher } = useOrderStore();
  const { saveSales, discount, setDiscount, vat } = useSalesStore();
  const [paymentModalVisible, setPaymentModalVisible] =
    useState<boolean>(false);
  const [paymentDetails, setPaymentDetails] = useState<any>();

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

    if (status === 'park') {
      saveSales(orderData);
      updateOrder([]);
      setModalVisible(!modalVisible);
    } else {
      setPaymentDetails(() => orderData);
      setPaymentModalVisible(!paymentModalVisible);
    }
  };

  return (
    <View style={{ position: 'absolute', bottom: 5, right: 5 }}>
      <TouchableOpacity
        style={[styles.button, styles.buttonCtr]}
        onPress={() => setModalVisible(!modalVisible)}
      >
        <Text style={styles.textStyle}>
          <AntDesign name="shoppingcart" size={18} color="white" />{' '}
          {voucher.totalQuantity}
        </Text>
      </TouchableOpacity>

      <ModalComponent
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
      </ModalComponent>

      {/* // ModalComponent for Payment */}

      <ModalComponent
        modalVisible={paymentModalVisible}
        setModalVisible={setPaymentModalVisible}
      >
        <PayMentMethodComponent
          data={paymentDetails}
          modalVisible={paymentModalVisible}
          setModalVisible={setPaymentModalVisible}
        />
      </ModalComponent>
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
