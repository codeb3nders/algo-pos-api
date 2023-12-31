import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
  Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { PAYMENT_METHOD } from '../../constant';
import { IPaymentMethod, Sales } from '../../interface';
import { useSalesStore } from '../../store/sales.store';
import { useOrderStore } from '../../store/order.store';

const PayMentMethodComponent = ({
  data,
  modalVisible,
  setModalVisible,
  isParked = false,
}: {
  data: Sales;
  modalVisible: boolean;
  setModalVisible: Function;
  isParked?: boolean;
}) => {
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const { saveSales, updateSales } = useSalesStore();
  const { updateOrder } = useOrderStore();

  // props.childRef.current = {
  //   processPayment,
  //   paymentMethod,
  // };

  const processPayment = (referenceNumber?: string, details?: string) => {
    const dataToSave = Object.assign({}, data);

    dataToSave.referenceNumber = referenceNumber && referenceNumber;
    dataToSave.details = details && details;

    dataToSave.paymentMethod = paymentMethod;

    if (isParked) {
      dataToSave.status = 'paid';
      updateSales(dataToSave);
    } else {
      saveSales(dataToSave);
      updateOrder([]);
    }

    setModalVisible && setModalVisible(!modalVisible);
  };

  const CashPayment = () => {
    const [cashReceived, onChangeNumber] = useState<any>();
    const [change, setChange] = useState<any>();

    const toPay = data.amount;

    useEffect(() => {
      setChange(() => cashReceived - toPay);
    }, [cashReceived]);

    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

    return (
      <SafeAreaView>
        <Text className="mb-5">Amount to pay: {toPay}</Text>
        <InputView>
          <Text>Cash Received</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeNumber}
            value={cashReceived}
            placeholder="useless placeholder"
            keyboardType="decimal-pad"
          />
        </InputView>
        <InputView>
          <Text>Change {cashReceived && change}</Text>
        </InputView>

        <View className="flex flex-row justify-between my-10">
          {/* <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle}>Close</Text>
          </TouchableOpacity> */}
          {paymentMethod && (
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() =>
                processPayment(
                  '',
                  `Cash Received: ${cashReceived} Change: ${change}`,
                )
              }
            >
              <Text style={styles.textStyle}>Pay</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    );
  };

  const InputView = ({ children }: any) => {
    return <View className="flex flex-row items-center">{children}</View>;
  };

  const EWallet = () => {
    const [referenceNumber, onChangeReferenceNumber] = useState<any>('');
    const [details, onChangeDetails] = useState<any>('');
    const toPay = data.amount;

    return (
      <SafeAreaView>
        <Text className="mb-5">Amount to pay: {toPay}</Text>
        <View className="flex flex-row items-center">
          <Text className="w-24">Rerence #:</Text>
          <TextInput
            key={'refn'}
            style={styles.input}
            onChangeText={onChangeReferenceNumber}
            value={referenceNumber}
            placeholder="Ex: 1234141324"
          />
        </View>

        <View className="flex flex-row items-center">
          <Text className="w-24">Details:</Text>
          <TextInput
            key={'dt'}
            style={styles.input}
            onChangeText={onChangeDetails}
            value={details}
            placeholder="Payment details here"
          />
        </View>
        <View className="flex flex-row justify-between my-10">
          {paymentMethod && (
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => processPayment(referenceNumber, details)}
            >
              <Text style={styles.textStyle}>Pay</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    );
  };

  const PaymentComponent = ({ item }: any) => {
    return (
      <TouchableOpacity
        className="w-24 h-12 rounded-md bg-blue-300 m-2 p-1 items-center"
        style={{
          shadowColor: 'black',
          shadowOpacity: 0.26,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 10,
          elevation: 5,
        }}
        onPress={() => setPaymentMethod(() => item.type)}
      >
        <Text className="capitalize" style={styles.item} key={`t-${item.type}`}>
          {item.type}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView>
      <Text>Payment Method</Text>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          maxHeight: 100,
          padding: 5,
        }}
      >
        <ScrollView horizontal={true}>
          {PAYMENT_METHOD.map((item: IPaymentMethod, i: number) => {
            return <PaymentComponent key={`p${item}-${i}`} item={item} />;
          })}
        </ScrollView>
      </View>

      <View>
        {!paymentMethod ? (
          <View>
            <Text className="flex flex-row text-center p-5 font-bold text-lg">
              Select Payment Method
            </Text>
          </View>
        ) : paymentMethod === 'cash' ? (
          <CashPayment />
        ) : (
          <EWallet />
        )}
      </View>
    </ScrollView>
  );
};

export default PayMentMethodComponent;

const styles = StyleSheet.create({
  itemLayout: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'gray',
    height: 100,
    width: 100,
    margin: 5,
  },
  item: {
    margin: 5,
    padding: 5,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    width: 100,
    height: 40,
    margin: 2,
    backgroundColor: '#2196F3',
  },
  buttonCtr: {
    margin: 2,
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    // fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '65%',
  },
});
