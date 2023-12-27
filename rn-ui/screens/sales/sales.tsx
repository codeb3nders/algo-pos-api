import * as React from 'react';
import { Button, ScrollView, Text, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import Orders from '../cashier/Orders';
import { useSalesStore } from '../../store/sales.store';

export default function Sales({ navigation }: any) {
  const saleStore = useSalesStore();
  const { sales } = saleStore;
  const auth: any = useAuth();

  return (
    <>
      <ScrollView
        style={{
          flex: 1,
          // padding: 5,
          margin: 10,
          // alignItems: 'center',
          // justifyContent: 'center',
        }}
      >
        {sales &&
          sales.map((item) => {
            return (
              <View className="flex w-45  border border-gray-300 p-2 m-2 rounded-md shadow-sl">
                <Text>{new Date(item.date).toDateString()}</Text>
                {item.orders.map((i: any) => {
                  return (
                    <Text>{`${i.item} ${i.quantity} x ${i.price} = ${i.total}`}</Text>
                  );
                })}
                <Text className="capitalize">Disccount: {item.discount}</Text>
                <Text className="capitalize">Amount: {item.amount}</Text>
                <Text className="capitalize">Status: {item.status}</Text>
              </View>
            );
          })}
      </ScrollView>
      <Button title="Logout" onPress={() => auth.onLogout()} />
    </>
  );
}
