import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useOrderStore } from '../../store/order.store';
import { Order } from '../../interface';
import { AntDesign } from '@expo/vector-icons';

const QueueOrder = ({ modalVisible, setModalVisible }: any) => {
  const userOrder = useOrderStore();
  const { addOrder, queueOrder, setQueueOrder } = userOrder;
  const [quantity, setQuantity] = useState<number>(1);

  const addQueueOrder = () => {
    if (!queueOrder) return;

    const order: Order = {
      itemId: queueOrder?._id,
      item: queueOrder.item,
      option: queueOrder.option,
      quantity,
      price: queueOrder.price,
      total: queueOrder.price * quantity,
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

  return (
    <View style={styles.centeredView}>
      <Text className="font-bold capitalize">
        {queueOrder && queueOrder.item} {queueOrder && queueOrder?.option}:{' '}
        {queueOrder?.price} x {quantity}
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
