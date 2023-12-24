import * as React from 'react';
import { useAuth } from '../../context/AuthContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Cashier from '../cashier';
import Items from '../items/items';

// TABS
const Tab = createBottomTabNavigator();
const TabsComponents = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Cashier" component={Cashier} />
      <Tab.Screen name="Items" component={Items} />
    </Tab.Navigator>
  );
};

export function HomeScreen({ navigation }: any) {
  const auth: any = useAuth();
  return <TabsComponents />;
}
