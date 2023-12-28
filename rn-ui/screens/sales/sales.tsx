import * as React from 'react';
import {
  Alert,
  Button,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import Orders from '../cashier/Orders';
import { useSalesStore } from '../../store/sales.store';
import { Sales } from '../../interface';
import { useEffect } from 'react';

export default function SalesComponent({ navigation }: any) {
  const saleStore = useSalesStore();
  const { sales, getSales, updateSales } = saleStore;
  const auth: any = useAuth();

  useEffect(() => {
    getSales();
  }, []);

  const updateSaleItem = (item: Sales) => {
    Alert.alert('Payment', 'Continue payment?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Pay',
        onPress: () => {
          item.status = 'paid';
          updateSales(item);
        },
      },
    ]);
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
                key={item._id}
                className={`flex w-45 ${
                  item.status === 'paid' ? 'bg-algo-green-1' : 'bg-orange-500'
                }  border border-gray-300 p-2 m-2 rounded-md shadow-sl`}
              >
                <Text className="text-white">
                  {new Date(item.date).toDateString()}
                </Text>
                {item.orders.map((i: any) => {
                  return (
                    <Text className="text-white">{`${i.item} ${i.quantity} x ${i.price} = ${i.total}`}</Text>
                  );
                })}
                <Text className="capitalize text-white">
                  Disccount: {item.discount}
                </Text>
                <Text className="capitalize text-white">
                  Amount: {item.amount}
                </Text>
                <Text className="capitalize text-white">
                  Status: {item.status}
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
    </>
  );
}
