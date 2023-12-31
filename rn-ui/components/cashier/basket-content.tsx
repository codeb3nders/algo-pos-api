import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import { DISCOUNT } from '../../constant';
import Orders from './orders-component';
import { useSalesStore } from '../../store/sales.store';
import { Sales } from '../../interface';
import { useOrderStore } from '../../store/order.store';
import ModalComponent from '../common/modal-component';
import PayMentMethodComponent from './payment-method-component';

const BasketContent = ({ modalVisible, setModalVisible }: any) => {
  const { saveSales, discount, setDiscount, vat } = useSalesStore();
  const { orders, updateOrder, voucher, createVoucher } = useOrderStore();

  const [paymentDetails, setPaymentDetails] = useState<any>();
  const [paymentModalVisible, setPaymentModalVisible] =
    useState<boolean>(false);

  const paymentProcess = (status: string) => {
    if (!voucher || !voucher.totalQuantity) return;
    setPaymentModalVisible(!paymentModalVisible);
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

    if (status === 'parked') {
      orderData.paymentMethod = '';
      saveSales(orderData);
      updateOrder([]);
      setModalVisible(!modalVisible);
    } else {
      setPaymentModalVisible(!paymentModalVisible);
      setPaymentDetails(() => orderData);
    }
  };

  return (
    <View className="flex flex-row  items-center justify-center  p-2">
      {/* <Text>asdfasdf</Text> */}
      <ScrollView>
        <Orders />
        <View className="flex items-center mb-10">
          <SelectDropdown
            buttonTextStyle={{ textTransform: 'capitalize' }}
            defaultButtonText="Apply Discount"
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
              return `${item.type} - ${item.value * 100}%`;
            }}
          />
        </View>
        <View className="flex items-center">
          <View
            className="space-x-10"
            style={{ flex: 1, flexDirection: 'row', maxHeight: 50 }}
          >
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => paymentProcess('paid')}
            >
              <Text style={styles.textStyle}>Pay</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => paymentProcess('parked')}
            >
              <Text style={styles.textStyle}>Park</Text>
            </TouchableOpacity>
          </View>
          {paymentModalVisible && (
            <ModalComponent
              modalVisible={paymentModalVisible}
              setModalVisible={setPaymentModalVisible}
            >
              <PayMentMethodComponent
                data={paymentDetails}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
              />
            </ModalComponent>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default BasketContent;
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
