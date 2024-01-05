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
import React, {useEffect, useState} from 'react';
import {PAYMENT_METHOD} from '../../constant';
import {IPaymentMethod, Sales} from '../../interface';
import {useSalesStore} from '../../store/sales.store';
import {useOrderStore} from '../../store/order.store';
import ButtonComponent from '../common/button-component';
import {blutoothPrinting} from '../../helpers/printer';

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
  const {saveSales, updateSales} = useSalesStore();
  const {updateOrder} = useOrderStore();
  const [autoPrint, setAutoPrint] = useState<boolean>(true);

  const processPayment = (referenceNumber?: string, details?: string) => {
    const dataToSave = Object.assign({}, data);

    dataToSave.referenceNumber = referenceNumber && referenceNumber;
    dataToSave.details = details && details;

    dataToSave.paymentMethod = paymentMethod;

    console.log('TO SAVE', dataToSave);

    if (isParked) {
      dataToSave.status = 'paid';
      updateSales(dataToSave);
    } else {
      saveSales(dataToSave);
      updateOrder([]);
    }

    setModalVisible && setModalVisible(!modalVisible);

    if (autoPrint) {
      printNow(dataToSave);
    }
  };

  const printNow = (dataToPrint: any) => {
    console.log('DATA', dataToPrint);
    const data = {
      Vat: 10,
      _id: 1704444470327,
      amount: 24,
      customer: 'JM Copino',
      date: '2024-01-05T08:47:50.327Z',
      details: '',
      discount: 0,
      orders: [
        {
          customer: 'JM',
          date: '2024-01-05T08:47:45.107Z',
          deduction: null,
          item: 'xxxxsometing',
          itemId: '6563173cd6d85255804737e51',
          option: 'someting',
          price: 12,
          quantity: 1,
          status: null,
          total: 12,
        },
        {
          customer: 'JM',
          date: '2024-01-05T08:47:46.358Z',
          deduction: null,
          item: 'someting',
          itemId: '656319177b222f30385fcd022',
          option: 'someting',
          price: 12,
          quantity: 1,
          status: null,
          total: 12,
        },
      ],
      paymentMethod: 'gcash',
      referenceNumber: '123456',
      status: 'paid',
    };

    const prepare = () => {
      let txt = '[L]ALL ITEMS\n';

      data.orders.forEach(item => {
        const itm = item ? item.item : '';
        const price = item ? item.price : 0;
        const deduct = item.deduction ? item.deduction : 0;
        const opt = item ? item.option : 0;
        const quantity = item ? item.quantity : 0;
        const totalAmount = price * quantity;
        const discountedAmount = totalAmount - totalAmount * deduct;
        txt += `${itm} ${opt}: ${price} x ${quantity} ${deduct > 0 && ' - '} ${
          deduct > 0 && ' - '
        }\n`;
        // ${deduct > 0 && ' - '}
        //  ${deduct > 0 && deduct} = ${discountedAmount}`;
      });

      txt += `=============Total==============`;

      // console.log('- - - - -', txt, '============', voucher.totalPrice, voucher);
    };

    // blutoothPrinting(dataToSave);
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

        <View className="flex flex-row justify-around my-2">
          {paymentMethod && (
            <ButtonComponent
              onPress={() =>
                processPayment(
                  '',
                  `Cash Received: ${cashReceived} Change: ${change}`,
                )
              }>
              <Text style={styles.textStyle}>Pay</Text>
            </ButtonComponent>
          )}
        </View>
      </SafeAreaView>
    );
  };

  const InputView = ({children}: any) => {
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
          <Text className="w-24">Reference #:</Text>
          <TextInput
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
        <View className="flex flex-row justify-around my-2">
          {paymentMethod && (
            <ButtonComponent
              onPress={() => processPayment(referenceNumber, details)}>
              <Text style={styles.textStyle}>Pay</Text>
            </ButtonComponent>
          )}
        </View>
      </SafeAreaView>
    );
  };

  const PaymentComponent = ({item}: any) => {
    return (
      <TouchableOpacity
        className="w-24 h-12 rounded-md bg-blue-300 m-2 p-1 items-center"
        style={{
          shadowColor: 'black',
          shadowOpacity: 0.26,
          shadowOffset: {width: 0, height: 2},
          shadowRadius: 10,
          elevation: 5,
        }}
        onPress={() => setPaymentMethod(() => item.type)}>
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
        }}>
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
