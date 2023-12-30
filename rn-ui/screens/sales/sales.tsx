import * as React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../context/auth-context';
import { useSalesStore } from '../../store/sales.store';
import { Sales } from '../../interface';
import { useEffect, useState } from 'react';
import ModalComponent from '../../components/common/modal-component';
import PayMentMethodComponent from '../../components/cashier/payment-method-component';
import ButtonComponent from '../../components/common/button-component';
import WhiteText from '../../components/common/white-text-component';

export default function SalesComponent({ filter }: any) {
  const saleStore = useSalesStore();
  const { sales, getSales, updateSales } = saleStore;
  const [filteredSales, setFilteredSales] = useState<Sales[]>();
  const auth: any = useAuth();
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<any>();

  useEffect(() => {
    getSales();
    getFilteredSales();
  }, [sales]);

  const getFilteredSales = () => {
    if (!filter) return sales;
    return sales.filter((sales) => {
      return sales.status === 'parked';
    });
  };

  const updateSaleItem = (item: Sales) => {
    setPaymentDetails(() => item);
    setPaymentModalVisible(!paymentModalVisible);
  };

  return (
    <>
      <ScrollView
        style={{
          flex: 1,
          margin: 10,
        }}
      >
        {sales &&
          getFilteredSales().map((item) => {
            return (
              <View
                key={`s-${item._id}`}
                className={`flex w-45 ${
                  item.status === 'paid' ? 'bg-algo-green-1' : 'bg-blue-300'
                }  border border-gray-300 p-2 m-2 rounded-md shadow-sl`}
              >
                <Text className="text-white">
                  {new Date(item.date).toDateString()}
                </Text>
                {item.orders.map((i: any) => {
                  const item = i ? i.item : '';
                  const price = i ? i.price : 0;
                  const deduct = i && i.deduction ? i.deduction.value : 0;
                  const opt = i ? i.option : 0;
                  const quantity = i ? i.quantity : 0;
                  return (
                    <Text key={`i-${i.item}`} className="text-white">
                      {/* {`${i.item} ${i.quantity} x ${i.price} = ${i.total}`} */}
                      {item} {opt}: {price} x {quantity}
                      {deduct > 0 && ' - '}
                      {deduct > 0 && deduct} = {price * quantity - deduct}
                    </Text>
                  );
                })}
                <Text className="capitalize text-white">
                  Disccount: {item.discount}
                </Text>
                <Text className="capitalize text-white">
                  Amount: {item.amount}
                </Text>
                <Text className="capitalize text-white">
                  Payment Method: {item.paymentMethod}
                </Text>
                <Text className="capitalize text-white">
                  Status: {item.status}
                </Text>
                <Text className="capitalize text-white">
                  Ref: {item.referenceNumber}
                </Text>
                <Text className="capitalize text-white">
                  Details: {item.details}
                </Text>
                {item.status !== 'paid' && (
                  <TouchableOpacity
                    className="border border-gray-400 bg-algo-green-1  items-center rounded-md p-1 w-20 mt-5"
                    onPress={() => updateSaleItem(item)}
                  >
                    <Text className="text-white">Pay</Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
      </ScrollView>
      <View className="flex self-center mb-5">
        <ButtonComponent callback={() => auth.onLogout()}>
          <WhiteText text="Logout" />
        </ButtonComponent>
      </View>

      {paymentModalVisible && (
        <ModalComponent
          modalVisible={paymentModalVisible}
          setModalVisible={setPaymentModalVisible}
        >
          <PayMentMethodComponent
            data={paymentDetails}
            modalVisible={paymentModalVisible}
            setModalVisible={setPaymentModalVisible}
            isParked={true}
          />
        </ModalComponent>
      )}
    </>
  );
}
