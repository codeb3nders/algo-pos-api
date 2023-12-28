import * as React from 'react';
import { useAuth } from '../../context/auth-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import Cashier from '../cashier';
import Sales from '../sales/sales';

// TABS
const Tab = createBottomTabNavigator();
const TabsComponents = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Cashier"
        options={{
          tabBarIcon: () => (
            <FontAwesome5 name="cash-register" size={20} color="black" />
          ),
        }}
        component={Cashier}
      />
      <Tab.Screen
        name="Sales"
        options={{
          tabBarIcon: () => (
            <FontAwesome name="money" size={24} color="black" />
          ),
        }}
        component={Sales}
      />
    </Tab.Navigator>
  );
};

export function HomeScreen({ navigation }: any) {
  const auth: any = useAuth();
  return <TabsComponents />;
}
