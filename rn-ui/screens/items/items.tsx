import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import Orders from '../cashier/Orders';

export default function Items({ navigation }: any) {
  const auth: any = useAuth();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Items</Text>
      <Orders />

      <Button title="Logout" onPress={() => auth.onLogout()} />
    </View>
  );
}
