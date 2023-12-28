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
import ModalComponent from '../common/modal-component';
import { AntDesign } from '@expo/vector-icons';
import { useSalesStore } from '../../store/sales.store';
import { DISCOUNT } from '../../constant';

const Orders = () => {
  const orderStore = useOrderStore();
  const { orders, voucher, createVoucher } = orderStore;
  const [modalVisible, setModalVisible] = useState(false);
  const [updatedOrder, setUpdatedOrder] = useState<Order | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedId, setSelectedId] = useState<string>('');
  const { sales, discount, setDiscount, vat } = useSalesStore();

  useEffect(() => {
    createVoucher(orders);
  }, [orders, sales, discount]);

  const deleteItem = (id: string) => {
    const result = orderStore.orders.filter((order) => order.itemId !== id);
    orderStore.updateOrder(result);
    setModalVisible(!modalVisible);
  };

  const updateOrderQuantity = (itemId: string | null) => {
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
    <ScrollView style={styles.scrollView}>
      {voucher && voucher.totalQuantity ? (
        Object.keys(voucher.orders).map((order) => {
          const { orders } = voucher.orders[order];

          return orders.map((o) => {
            return (
              <Product
                key={`c-${o.itemId}`}
                item={o}
                setQuantity={setQuantity}
                setUpdatedOrder={setUpdatedOrder}
                setModalVisible={setModalVisible}
                modalVisible={modalVisible}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
              />
            );
          });
        })
      ) : (
        <Text>No Item</Text>
      )}
      <View className="items-end  m-2 p-2" style={{ borderTopWidth: 1 }}>
        <Text>
          Total item: {voucher?.totalQuantity} Total Amount:{' '}
          {voucher?.totalPrice}
        </Text>
        <Text>
          Discount for {discount && discount.type} :{' '}
          {discount && discount.value}
        </Text>
        <Text
          className="border-t-2 font-bold items-end   mt-2 p-2"
          style={{ fontSize: 16, borderTopWidth: 1 }}
        >
          {`Total Amount: ${
            voucher?.totalPrice &&
            voucher?.totalPrice - (discount ? discount.value : 0)
          }`}
        </Text>
      </View>
      <ModalComponent
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      >
        <View>
          <TouchableOpacity onPress={() => deleteItem(selectedId)}>
            <View className="flex justify-center items-center w-7 h-7 mb-5">
              <AntDesign name="delete" size={24} color="black" />
            </View>
          </TouchableOpacity>
          <View className="items-center mb-10 w-64">
            <Text className="font-bold capitalize">
              {updatedOrder && updatedOrder.item}{' '}
              {updatedOrder && updatedOrder?.option}: {updatedOrder?.price} x{' '}
              {quantity}
            </Text>
            <View className="mt-5 fle flex-row">
              <TouchableOpacity
                className="mr-5"
                onPress={() => {
                  quantity > 1 && setQuantity((quantity) => quantity - 1);
                }}
              >
                <AntDesign name="minuscircleo" size={24} color="black" />
              </TouchableOpacity>
              <Text> {'<-->'} </Text>
              <TouchableOpacity
                className="ml-5"
                onPress={() => setQuantity((quantity) => quantity + 1)}
              >
                <AntDesign name="pluscircleo" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
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
            onPress={() => updateOrderQuantity(selectedId)}
          >
            <Text style={styles.textStyle}>Update</Text>
          </TouchableOpacity>
        </View>
      </ModalComponent>
    </ScrollView>
  );
};

export default Orders;

const Product = ({
  item,
  setQuantity,
  setUpdatedOrder,
  setModalVisible,
  modalVisible,
  selectedId,
  setSelectedId,
}: {
  item: Order;
  setQuantity: any;
  setUpdatedOrder: any;
  setModalVisible: any;
  modalVisible: boolean;
  selectedId: string;
  setSelectedId: any;
}) => {
  const orderStore = useOrderStore();

  useEffect(() => {}, [orderStore]);

  const editItem = (item: Order) => {
    setSelectedId(item.itemId);
    setQuantity(item.quantity);
    setUpdatedOrder(() => item);
    setModalVisible(!modalVisible);
  };

  const itm = item ? item.item : '';
  const price = item ? item.price : 0;
  const deduct = item.deduction ? item.deduction.value : 0;
  const opt = item ? item.option : 0;
  const quantity = item ? item.quantity : 0;

  return (
    <View
      className="flex"
      style={{
        alignItems: 'stretch',
      }}
    >
      <TouchableOpacity
        className="  rounded-lg m-1 border-b-2 border-r-2 border-gray-300 shadow-lg"
        onPress={() => editItem(item)}
      >
        <Text
          className="capitalize   m-1 p-1"
          key={item.itemId}
          style={{ fontSize: 12 }}
        >
          {itm} {opt}: {price} x {quantity}
          {deduct > 0 && ' - '}
          {deduct > 0 && deduct} = {price * quantity - deduct}
        </Text>
      </TouchableOpacity>
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
    maxHeight: 400,
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
