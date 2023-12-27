import * as React from 'react';
import { useAuth } from '../../context/AuthContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Cashier from '../cashier';
import Sales from '../sales/sales';

// TABS
const Tab = createBottomTabNavigator();
const TabsComponents = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Cashier" component={Cashier} />
      <Tab.Screen name="Sales" component={Sales} />
    </Tab.Navigator>
  );
};

export function HomeScreen({ navigation }: any) {
  const auth: any = useAuth();
  return <TabsComponents />;
}
