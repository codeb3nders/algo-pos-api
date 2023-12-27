import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import Orders from '../cashier/Orders';
import { useSalesStore } from '../../store/sales.store';

export default function Items({ navigation }: any) {
  const saleStore = useSalesStore();
  console.log('Sales:', saleStore.sales);
  const auth: any = useAuth();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Sales</Text>

      <Button title="Logout" onPress={() => auth.onLogout()} />
    </View>
  );
}
