// In App.js in a new project

import * as React from 'react';
import {View, Text, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import ThermalPrinterModule from 'react-native-thermal-printer';
import ToPrint from './print/order.print';

const Tab = createBottomTabNavigator();

function Mytabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Settings} />
      <Tab.Screen name="Settings" component={DetailsScreen} />
    </Tab.Navigator>
  );
}

function Settings({navigation}: any) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Settings Screen</Text>
    </View>
  );
}

async function printNow() {
  // inside async function
  console.log('START PRINTING');
  try {
    await ThermalPrinterModule.printBluetooth({
      payload: 'hello world',
      printerNbrCharactersPerLine: 38,
    });
  } catch (err: any) {
    //error handling
    console.log('ERROR');
    console.log(err.message);
  }
}

function HomeScreen({navigation}: any) {
  return (
    <View
      className="bg-blue-300"
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Details Screen-----</Text>
        <Button
          title="Go to MyTabs"
          onPress={() => navigation.navigate('Mytabs')}
        />
      </View>

      <ToPrint />
    </View>
  );
}

function DetailsScreen({navigation}: any) {
  return (
    <View
      className="bg-green-200"
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen</Text>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Details Screen</Text>
        <Button
          title="Go to Home"
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Mytabs" component={Mytabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
