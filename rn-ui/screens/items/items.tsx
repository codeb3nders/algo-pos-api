import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function Items({ navigation }: any) {
  const auth: any = useAuth();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Items</Text>
      <Button
        title="Go to Details"
        onPress={() => {
          navigation.navigate('Details', {
            itemId: 86,
            otherParam: 'anything you want here',
          });
        }}
      />

      <Button title="Logout" onPress={() => auth.onLogout()} />
    </View>
  );
}
