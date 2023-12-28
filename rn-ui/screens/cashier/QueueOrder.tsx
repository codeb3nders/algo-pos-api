import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useOrderStore } from '../../store/order.store';
import { Order } from '../../interface';
import { AntDesign } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown';
import { DISCOUNT } from '../../constant';

const QueueOrder = ({ modalVisible, setModalVisible }: any) => {
  const userOrder = useOrderStore();
  const { addOrder, queueOrder, setQueueOrder } = userOrder;
  const [quantity, setQuantity] = useState<number>(1);
  const [deduction, setDeduction] = useState<{
    type: string;
    value: number;
  } | null>(null);

  const addQueueOrder = () => {
    if (!queueOrder) return;
    const newTotal =
      queueOrder.price * quantity - (deduction ? deduction.value : 0);

    const order: Order = {
      itemId: queueOrder?._id,
      item: queueOrder.item,
      option: queueOrder.option,
      quantity,
      price: queueOrder.price,
      total: newTotal,
      deduction,
      date: new Date(),
      customer: queueOrder.customer,
      status: null,
    };

    addOrder(order);
    setQueueOrder(null);
    setQuantity(1);
    setModalVisible(!modalVisible);
  };

  const cancelOrder = () => {
    setQueueOrder(null);
    setQuantity(1);
    setModalVisible(!modalVisible);
  };

  const item = queueOrder ? queueOrder.item : '';
  const price = queueOrder ? queueOrder.price : 0;
  const deduct = deduction ? deduction.value : 0;
  const opt = queueOrder ? queueOrder.option : 0;

  return (
    <View style={styles.centeredView}>
      <Text className="font-bold capitalize">
        {item} {opt}: {price} x {quantity}
        {deduct > 0 && ' - '}
        {deduct > 0 && deduct} = {price * quantity - deduct}
      </Text>
      <View className="mt-5 fle flex-row mb-10">
        <TouchableOpacity
          className="mr-5"
          onPress={() => {
            quantity > 1 && setQuantity((quantity) => quantity - 1);
          }}
        >
          <AntDesign name="minuscircleo" size={24} color="black" />
        </TouchableOpacity>
        <Text> -- </Text>
        <TouchableOpacity
          className="ml-5"
          onPress={() => setQuantity((quantity) => quantity + 1)}
        >
          <AntDesign name="pluscircleo" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <SelectDropdown
        rowStyle={{ backgroundColor: 'pink' }}
        buttonTextStyle={{ textTransform: 'capitalize' }}
        defaultButtonText="Apply discount"
        selectedRowTextStyle={{
          textTransform: 'capitalize',
          fontWeight: 'bold',
        }}
        rowTextStyle={{ textTransform: 'capitalize' }}
        data={DISCOUNT}
        onSelect={(selectedItem, index) => {
          setDeduction(() => ({
            type: selectedItem.type,
            value: selectedItem.value,
          }));
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
          onPress={() => cancelOrder()}
        >
          <Text style={styles.textStyle}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonClose]}
          onPress={() => addQueueOrder()}
        >
          <Text style={styles.textStyle}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QueueOrder;

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
    margin: 5,
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
