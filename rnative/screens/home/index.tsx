import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Cashier from '../cashier';
import Sales from '../sales';

const Tab = createBottomTabNavigator();
const TabsComponents = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Cashier"
        options={{
          tabBarIcon: () => (
            <FontAwesome5 name="cash-register" size={24} color="black" />
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

export function HomeScreen({navigation}: any) {
  // const auth: any = useAuth();
  return <TabsComponents />;
}
