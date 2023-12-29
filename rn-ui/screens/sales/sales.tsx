import * as React from 'react';
import {
  Alert,
  Button,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAuth } from '../../context/auth-context';
import Orders from '../../components/cashier/orders-component';
import { useSalesStore } from '../../store/sales.store';
import { Sales } from '../../interface';
import { useEffect, useState } from 'react';
import ModalComponent from '../../components/common/modal-component';
import PayMentMethodComponent from '../../components/cashier/payment-method-component';

export default function SalesComponent({ navigation }: any) {
  const saleStore = useSalesStore();
  const { sales, getSales, updateSales } = saleStore;
  const auth: any = useAuth();
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<any>();

  useEffect(() => {
    getSales();
  }, [sales]);

  const updateSaleItem = (item: Sales) => {
    setPaymentDetails(() => item);
    setPaymentModalVisible(!paymentModalVisible);
    // Alert.alert('Payment', 'Continue payment?', [
    //   {
    //     text: 'Cancel',
    //     onPress: () => console.log('Cancel Pressed'),
    //     style: 'cancel',
    //   },
    //   {
    //     text: 'Pay',
    //     onPress: () => {
    //       item.status = 'paid';
    //       updateSales(item);
    //     },
    //   },
    // ]);
  };

  return (
    <>
      <ScrollView
        style={{
          flex: 1,
          margin: 10,
        }}
      >
        {sales &&
          sales.map((item) => {
            return (
              <View
                key={`s-${item._id}`}
                className={`flex w-45 ${
                  item.status === 'paid' ? 'bg-algo-green-1' : 'bg-blue-300'
                }  border border-gray-300 p-2 m-2 rounded-md shadow-sl`}
              >
                <Text className="text-white">
                  {new Date(item.date).toDateString()}
                </Text>
                {item.orders.map((i: any) => {
                  return (
                    <Text
                      key={`i-${i.item}`}
                      className="text-white"
                    >{`${i.item} ${i.quantity} x ${i.price} = ${i.total}`}</Text>
                  );
                })}
                <Text className="capitalize text-white">
                  Disccount: {item.discount}
                </Text>
                <Text className="capitalize text-white">
                  Amount: {item.amount}
                </Text>
                <Text className="capitalize text-white">
                  Payment Method: {item.paymentMethod}
                </Text>
                <Text className="capitalize text-white">
                  Status: {item.status}
                </Text>
                <Text className="capitalize text-white">
                  Ref: {item.referenceNumber}
                </Text>
                <Text className="capitalize text-white">
                  Details: {item.details}
                </Text>
                {item.status !== 'paid' && (
                  <TouchableOpacity
                    className="border border-gray-400 bg-algo-green-1  items-center rounded-md p-1 w-20 mt-5"
                    onPress={() => updateSaleItem(item)}
                  >
                    <Text className="text-white">Pay</Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
      </ScrollView>

      <Button title="Logout" onPress={() => auth.onLogout()} />

      {paymentModalVisible && (
        <ModalComponent
          modalVisible={paymentModalVisible}
          setModalVisible={setPaymentModalVisible}
        >
          <PayMentMethodComponent
            data={paymentDetails}
            modalVisible={paymentModalVisible}
            setModalVisible={setPaymentModalVisible}
            isParked={true}
          />
        </ModalComponent>
      )}
    </>
  );
}
