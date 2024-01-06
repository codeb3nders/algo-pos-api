import * as React from 'react';
import {Button, Text, View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import COLOR from './colors';
import TabsComponents from './screens/home';

function SettingsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings!</Text>
    </View>
  );
}

const HomeScreen = ({navigation}: any) => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

function Dashboard({route, navigation}: any) {
  // const {itemId} = route.params;
  // const otherParam = route.params.otherParam;

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-algo-green-1">Home Screen</Text>

      {/* <Button
        title="Settings"
        onPress={() => navigation.navigate('Settings')}
      /> */}

      <Button title="Store" onPress={() => navigation.navigate('Store')} />
    </View>
  );
}

function Settings({route, navigation}: any) {
  // const {itemId} = route.params;
  // const otherParam = route.params.otherParam;

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-algo-green-1">Settings Screen</Text>

      {/* <Button title="TabsScreen" onPress={() => navigation.navigate('Tabs')} /> */}
    </View>
  );
}

const StacksComponents = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        // headerShown: false,
        headerStyle: {
          backgroundColor: `${COLOR['algo-green-1']}`,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Dashboard',
        }}
      />

      <Stack.Screen name="Settings" component={SettingsScreen} />

      <Stack.Screen name="Store" component={TabsComponents} />

      {/* <Stack.Screen
        name="Settings"
        options={{
          headerTitle: props => <LogoTitle />,
        }}
        component={SettingsScreen}
      /> */}
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <StacksComponents />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4FD3DA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#fb5b5a',
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#3AB4BA',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'white',
  },
  forgotAndSignUpText: {
    color: 'white',
    fontSize: 11,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
});
