import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, { useEffect } from 'react';
import { GroupedOrderItem, Order } from '../../interface';
import { useOrderStore } from '../../store/order.store';

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
  const orderStore = useOrderStore();

  const deleteItem = (id: string) => {
    const result = orderStore.orders.filter((order) => order.itemId !== id);
    orderStore.updateOrder(result);
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

        <TouchableOpacity onPress={() => deleteItem(item.itemId)}>
          <Text>X</Text>
        </TouchableOpacity>
      </View>
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
});
