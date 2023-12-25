import { View, Text, Pressable, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useOrderStore } from '../../store/order.store';
import { Order } from '../../interface';

const QueueOrder = ({ modalVisible, setModalVisible }: any) => {
  const userOrder = useOrderStore();
  const { addOrder, queueOrder, setQueueOrder } = userOrder;
  const [quantity, setQuantity] = useState<number>(1);

  const addQueueOrder = () => {
    if (!queueOrder) return;

    const order: Order = {
      itemId: queueOrder?._id,
      item: queueOrder.item,
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
      <Text>{queueOrder?.item}</Text>
      <View
        style={{
          ...styles.modalText,
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Pressable
          onPress={() => {
            quantity > 0 && setQuantity((quantity) => quantity - 1);
          }}
        >
          <Text> - </Text>
        </Pressable>
        <Text> {quantity} </Text>
        <Pressable onPress={() => setQuantity((quantity) => quantity + 1)}>
          <Text> + </Text>
        </Pressable>
      </View>
      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={() => cancelOrder()}
      >
        <Text style={styles.textStyle}>Cancel</Text>
      </Pressable>
      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={() => addQueueOrder()}
      >
        <Text style={styles.textStyle}>Add</Text>
      </Pressable>
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
