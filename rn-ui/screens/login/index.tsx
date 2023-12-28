import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useAuth } from '../../context/auth-context';
import { useState } from 'react';
import COLOR from '../../colors';
import { useLoaderStore } from '../../store/loader.state';

export default function LoginScreen({ navigation }: any) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('coffee-algo-admin@gmail.com');
  const [password, setPassword] = useState('password');
  const [errorMessage, setErrorMessage] = useState('');
  const auth: any = useAuth();

  const useLoader = useLoaderStore();

  const handleInputChange = (value: string, name: string) => {
    if (name == 'name') {
      setName(() => value);
    } else if (name == 'email') {
      setEmail(() => value);
    } else if (name == 'password') {
      setPassword(() => value);
    }
  };

  const login = async () => {
    useLoader.setIsLoading(true);
    const result = await auth.onLogin(email, password);

    if (result?.error) setErrorMessage(result?.msg);
    useLoader.setIsLoading(false);
  };

  const viewText = (
    name: string,
    placeholder: string,
    capital: string = 'words',
  ) => {
    return (
      <View style={styles.inputView}>
        <TextInput
          autoCapitalize={capital}
          style={styles.inputText}
          placeholder={placeholder}
          defaultValue={email}
          placeholderTextColor="white"
          onChangeText={(value) => handleInputChange(value, name)}
        />
      </View>
    );
  };

  const viewSecureText = (
    name: string,
    placeholder: string,
    capital: string = 'words',
  ) => {
    return (
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          autoCapitalize={capital}
          style={styles.inputText}
          defaultValue={password}
          placeholder={placeholder}
          placeholderTextColor="white"
          onChangeText={(value) => handleInputChange(value, name)}
        />
      </View>
    );
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text className="my-5 text-xl font-bold text-algo-green-1">
        Login Screen
      </Text>

      {viewText('email', 'Email', 'none')}
      {viewSecureText('password', 'Password', 'none')}

      {errorMessage && (
        <Text className="my-5 text-xl text-red-500">{errorMessage}</Text>
      )}

      <Button title="Submit" onPress={() => login()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `${COLOR['algo-green-1']}`,
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
    backgroundColor: `${COLOR['algo-green-1']}`,
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    fontSize: 18,
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
