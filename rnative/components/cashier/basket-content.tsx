import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  ScrollView,
  Animated,
} from 'react-native';
import React, {useRef, useState} from 'react';

import {DISCOUNT, ORIENTATION} from '../../constant';
import Orders from './orders-component';
import {useSalesStore} from '../../store/sales.store';
import {Sales} from '../../interface';
import {useOrderStore} from '../../store/order.store';
import ModalComponent from '../common/modal-component';
import PayMentMethodComponent from './payment-method-component';
import ButtonComponent from '../common/button-component';
import useOrientation from '../../src/hooks/useOrientation';
import BlackText from '../common/black-text-component';

const BasketContent = ({modalVisible, setModalVisible}: any) => {
  const orientation = useOrientation();
  const {saveSales, discount, setDiscount, vat} = useSalesStore();
  const {orders, updateOrder, voucher, createVoucher} = useOrderStore();
  const [paymentDetails, setPaymentDetails] = useState<any>();
  const [paymentModalVisible, setPaymentModalVisible] =
    useState<boolean>(false);
  const [showDiscount, setShowDiscount] = useState<boolean>(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    setShowDiscount(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const toggle = () => {
    if (showDiscount) {
      fadeOut();
      setTimeout(() => {
        setShowDiscount(!showDiscount);
      }, 500);
    } else {
      setShowDiscount(!showDiscount);
      fadeIn();
    }
  };

  const paymentProcess = (status: string) => {
    if (!voucher || !voucher.totalQuantity) return;

    // TODO: orientation condition
    orientation === ORIENTATION.PORTRAIT &&
      setPaymentModalVisible(!paymentModalVisible);

    const orderData: Sales = {
      _id: new Date().valueOf(),
      customer: 'JM Copino',
      orders: orders,
      status: status,
      paymentMethod: 'cash',
      date: new Date(),
      amount: voucher.totalPrice - (discount ? discount.value : 0),
      discount: discount ? discount.value : 0,
      Vat: 10,
    };

    if (status === 'parked') {
      orderData.paymentMethod = '';
      saveSales(orderData);
      updateOrder([]);
      setModalVisible && setModalVisible(!modalVisible);
    } else {
      setPaymentModalVisible(!paymentModalVisible);
      setPaymentDetails(() => orderData);
    }
  };

  const DiscountOptions = () => {
    return (
      <View className=" w-11/12 pr-5">
        <ScrollView horizontal={true}>
          {DISCOUNT.map(discount => {
            return (
              <TouchableOpacity
                hitSlop={{top: 20, left: 20, bottom: 20, right: 20}}
                onPress={() => {
                  setDiscount(discount);
                }}
                className="border p-1 mx-2 rounded-lg bg-green-200 p-1 my-2">
                <Text>{discount.type}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  return (
    <View className="flex flex-row  items-center justify-center  p-1">
      {/* <Text>asdfasdf</Text> */}
      <ScrollView>
        <Orders />
        <View className="flex items-start my-2 mb-5">
          <View className="flex  w-full flex-row items-center">
            <TouchableOpacity
              className=" border-r-2 rounded-r-full"
              onPress={() => toggle()}
              hitSlop={{top: 20, left: 20, bottom: 20, right: 20}}>
              <Text className="p-1 ">{'Discount '} </Text>
            </TouchableOpacity>

            <Animated.View
              style={[
                {
                  // Bind opacity to animated value
                  opacity: fadeAnim,
                },
              ]}>
              {showDiscount && (
                <View>
                  <DiscountOptions />
                </View>
              )}
            </Animated.View>
          </View>
        </View>
        <View>
          {orders.length ? (
            <View
              className="flex-row justify-around"
              // style={{ flex: 1, flexDirection: 'row' }}
            >
              <ButtonComponent
                // style={[styles.button, styles.buttonClose]}
                onPress={() => paymentProcess('paid')}>
                <BlackText text="Pay" />
              </ButtonComponent>
              <ButtonComponent onPress={() => paymentProcess('parked')}>
                <BlackText text="Park" />
              </ButtonComponent>
            </View>
          ) : (
            <Text>---</Text>
          )}
          {paymentModalVisible && (
            <ModalComponent
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}>
              <PayMentMethodComponent
                data={paymentDetails}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
              />
            </ModalComponent>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default BasketContent;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fadingContainer: {
    padding: 20,
    backgroundColor: 'powderblue',
  },
  fadingText: {
    fontSize: 28,
  },
  buttonRow: {
    flexBasis: 100,
    justifyContent: 'space-evenly',
    marginVertical: 16,
  },

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
    textAlign: 'center',
    fontSize: 16,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
