import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { PAYMENT_METHOD } from '../../constant';
import { IPaymentMethod, Sales } from '../../interface';
import { text } from 'express';
import { useSalesStore } from '../../store/sales.store';
import { useOrderStore } from '../../store/order.store';

const PayMentMethodComponent = ({
  data,
  modalVisible,
  setModalVisible,
}: {
  data: Sales;
  modalVisible: boolean;
  setModalVisible: Function;
}) => {
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const { saveSales, discount, setDiscount, vat } = useSalesStore();
  const { orders, updateOrder, voucher, createVoucher } = useOrderStore();

  // props.childRef.current = {
  //   processPayment,
  //   paymentMethod,
  // };

  const processPayment = ({
    referenceNumber,
    details,
  }: {
    referenceNumber: string;
    details: string;
  }) => {
    const dataTosave = Object.assign({}, data);

    if (paymentMethod === 'cash') {
      dataTosave.status = 'paid';
    } else {
      dataTosave.referenceNumber = referenceNumber;
      dataTosave.details = details;
    }

    dataTosave.paymentMethod = paymentMethod;

    console.log({ dataTosave });
    saveSales(dataTosave);
    updateOrder([]);

    setModalVisible(!modalVisible);
  };

  const CashPayment = () => {
    const [cashReceived, onChangeNumber] = useState<any>(0);
    const [change, setChange] = useState<number>(0);

    const toPay = data.amount;

    useEffect(() => {
      setChange(() => cashReceived - toPay);
    }, [cashReceived]);

    return (
      <SafeAreaView>
        <Text>Amount to pay: {toPay}</Text>
        <Text>Cash Received {cashReceived}</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={cashReceived}
          placeholder="useless placeholder"
          keyboardType="numeric"
        />
        <Text>Change {cashReceived && change}</Text>
      </SafeAreaView>
    );
  };

  const 9Ewallet = () => {
    const [referenceNumber, onChangeReferenceNumber] = useState<any>('');
    const [details, onChangeDetails] = useState<any>('');

    const toPay = data.amount;

    return (
      <SafeAreaView>
        <Text>Amount to pay: {toPay}</Text>
        <Text>Rerence Number:</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeReferenceNumber}
          value={referenceNumber}
          placeholder="Ex: 1234141324"
          keyboardType="numeric"
        />
        <Text>Details:</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeDetails}
          value={details}
          placeholder="Payment details here"
          keyboardType="numeric"
        />
      </SafeAreaView>
    );
  };

  const PaymentComponent = ({ item }: any) => {
    return (
      <TouchableOpacity
        key={item.type}
        className="w-24 h-30 rounded-md bg-red-100 m-1 p-1"
        style={{
          shadowColor: 'black',
          shadowOpacity: 0.26,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 10,
          elevation: 5,
          backgroundColor: 'white',
        }}
        onPress={() => setPaymentMethod(() => item.type)}
      >
        <Text style={styles.item} key={item.type}>
          {item.type}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <Text>Payment Method</Text>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          maxHeight: 70,
          padding: 5,
        }}
      >
        <ScrollView horizontal={true}>
          {PAYMENT_METHOD.map((item: IPaymentMethod) => {
            return <PaymentComponent item={item} />;
          })}
        </ScrollView>
      </View>

      <View>{paymentMethod === 'cash' ? <CashPayment /> : <Ewallet />}</View>
      <TouchableOpacity
        style={[styles.button, styles.buttonClose]}
        onPress={() => setModalVisible(!modalVisible)}
      >
        <Text style={styles.textStyle}>Close</Text>
      </TouchableOpacity>
      {paymentMethod && (
        <TouchableOpacity
          style={[styles.button, styles.buttonClose]}
          onPress={() => processPayment()}
        >
          <Text style={styles.textStyle}>Pay</Text>
        </TouchableOpacity>
      )}
    </View>
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
  },
});
