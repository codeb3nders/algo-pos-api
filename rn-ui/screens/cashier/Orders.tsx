import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { GroupedOrderItem, Order } from '../../interface';
import { useOrderStore } from '../../store/order.store';
import CommonModalComponent from './CommonModal';

const Orders = () => {
  const orderStore = useOrderStore();
  const { orders, voucher, createVoucher } = orderStore;

  useEffect(() => {
    createVoucher(orders);
  }, [orders]);

  return (
    <ScrollView style={styles.scrollView}>
      {voucher && voucher.totalQuantity ? (
        Object.keys(voucher.orders).map((order) => {
          const { orders } = voucher.orders[order];

          return orders.map((o) => {
            return <Product key={o.item} item={o} />;
          });
        })
      ) : (
        <Text>No Item</Text>
      )}
      <View>
        <Text> - - - - - - - - - - - - - - - - - -</Text>
        <Text style={{ fontSize: 12 }}>
          Total item: {voucher?.totalQuantity} Total Amount:{' '}
          {voucher?.totalPrice}
        </Text>
      </View>
    </ScrollView>
  );
};

export default Orders;

const Product = ({ item }: { item: Order }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const orderStore = useOrderStore();
  const [updatedOrder, setUpdatedOrder] = useState<Order | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {}, [orderStore]);

  const deleteItem = (id: string) => {
    const result = orderStore.orders.filter((order) => order.itemId !== id);
    orderStore.updateOrder(result);
    setModalVisible(!modalVisible);
  };

  const editItem = (item: Order) => {
    // console.log('ORDER TO UPDATE', item);
    setQuantity(item.quantity);
    setUpdatedOrder(() => item);
    setModalVisible(!modalVisible);
  };

  const updateOrderQuantity = (itemId: string) => {
    const newQuantity = quantity; // Specify the new quantity

    const updatedOrders = orderStore.orders.map((order) => {
      if (order.itemId === itemId) {
        // If the itemId matches, update the quantity
        return {
          ...order,
          quantity: newQuantity,
          total: order.price * newQuantity,
        };
      }
      // If the itemId doesn't match, keep the order unchanged
      return order;
    });

    setModalVisible(!modalVisible);
    orderStore.updateOrder(updatedOrders);
  };

  return (
    <View
      style={{
        alignItems: 'stretch',
        padding: 10,
      }}
    >
      <View>
        <TouchableOpacity
          onPress={() => editItem(item)}
          style={{
            height: 25,
            backgroundColor: 'gray',
            margin: 5,
            padding: 5,
          }}
        >
          <Text key={item.item} style={{ fontSize: 12 }}>
            {item.item} : {item.price} x {item.quantity} = {item.total}
          </Text>
        </TouchableOpacity>
      </View>
      <CommonModalComponent
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      >
        <View>
          <TouchableOpacity onPress={() => deleteItem(item.itemId)}>
            <Text>X</Text>
          </TouchableOpacity>
          <Text> {updatedOrder && updatedOrder.item} </Text>
          <TouchableOpacity
            onPress={() => {
              quantity > 1 && setQuantity((quantity) => quantity - 1);
            }}
          >
            <Text> - </Text>
          </TouchableOpacity>
          <Text> {quantity} </Text>
          <TouchableOpacity
            onPress={() => setQuantity((quantity) => quantity + 1)}
          >
            <Text> + </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', maxHeight: 50 }}>
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={() => updateOrderQuantity(item.itemId)}
          >
            <Text style={styles.textStyle}>Update</Text>
          </TouchableOpacity>
        </View>
      </CommonModalComponent>
    </View>
  );
};

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
  voucher: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'green',
    textAlignVertical: 'center',
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: 'pink',
    maxHeight: 400,
    // marginTop: 20,
    paddingRight: 30,
    marginBottom: 20,
    paddingBottom: 20,
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
});
