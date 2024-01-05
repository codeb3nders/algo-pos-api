import * as React from 'react';
import {useAuth} from '../../context/auth-context';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
// import {FontAwesome} from '@expo/vector-icons';

import Cashier from '../cashier';
import Sales from '../sales';
import Printing from '../printing';

// TABS
const Tab = createBottomTabNavigator();
const TabsComponents = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Cashier"
        options={{
          tabBarIcon: () => (
            <Icon name="cash-register" size={20} color="black" />
          ),
        }}
        component={Cashier}
      />
      <Tab.Screen
        name="Sales"
        options={{
          tabBarIcon: () => <Icon name="money" size={24} color="black" />,
        }}
        component={Sales}
      />

      <Tab.Screen
        name="Printing"
        options={{
          tabBarIcon: () => <Icon name="money" size={24} color="black" />,
        }}
        component={Printing}
      />
    </Tab.Navigator>
  );
};

export function HomeScreen({navigation}: any) {
  const auth: any = useAuth();
  return <TabsComponents />;
}