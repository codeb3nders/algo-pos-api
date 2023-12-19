import * as React from 'react';
import { Button, Text, TextInput, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginScreen from './screens/login';
import COLOR from './colors';

function HomeScreen({ navigation }: any) {
  const auth: any = useAuth();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
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
function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

function DetailsScreen({ route, navigation }: any) {
  const { itemId } = route.params;
  const otherParam = route.params.otherParam;

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-algo-green-1">Details Screen - {itemId}</Text>
      <Button
        title="Go to Details... again"
        onPress={() =>
          navigation.push('Details', {
            itemId: Math.ceil(Math.random() * 100),
          })
        }
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />

      <Button title="Go to Tabs" onPress={() => navigation.navigate('Tabs')} />
    </View>
  );
}

const Tab = createBottomTabNavigator();

// TABS
const TabsComponents = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

function LogoTitle() {
  return (
    <View style={{ width: 50, height: 50 }}>
      <Text>JMC</Text>
    </View>
  );
}

// STACKS

const Stack = createNativeStackNavigator();

const StacksComponents = () => {
  const { authState, onLogout } = useAuth();

  console.log('===authState', authState);

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: `${COLOR['algo-green-1']}`,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      {!authState?.authenticated ? (
        <>
          <Stack.Screen
            name="Login"
            // options={{ headerShown: false }}
            component={LoginScreen}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
          ></Stack.Screen>
          <Stack.Screen name="Details" component={DetailsScreen} />
          <Stack.Screen name="Tabs" component={TabsComponents} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StacksComponents />
      </NavigationContainer>
    </AuthProvider>
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
