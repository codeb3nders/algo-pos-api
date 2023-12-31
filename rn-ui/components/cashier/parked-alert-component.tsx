import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSalesStore } from '../../store/sales.store';
import AlertComponent from '../common/alert-component';
import ModalComponent from '../common/modal-component';
import SalesComponent from '../../screens/sales/sales';

const ParkedAlertComponent = () => {
  const salesStore = useSalesStore();
  const { sales, getSales } = salesStore;
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getSales();
    filterParked();
  }, [sales, sales.length]);

  const filterParked = () => {
    return sales.filter((s) => s.status !== 'paid').length;
  };

  if (!filterParked()) return;

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
        <AlertComponent position={{ left: 1, bottom: 1 }}>
          <Text>{filterParked()} Parked</Text>
        </AlertComponent>
      </TouchableOpacity>
      {modalVisible && (
        <ModalComponent
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        >
          <View className="h-96 ">
            <SalesComponent filter="parked" />
          </View>
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle}>Close</Text>
          </TouchableOpacity>
        </ModalComponent>
      )}
    </>
  );
};

export default ParkedAlertComponent;

const styles = StyleSheet.create({
  itemLayout: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'white',
    height: 100,
    width: 100,
    margin: 5,
  },
  item: {
    margin: 5,
    padding: 5,
    textAlign: 'center',
    textAlignVertical: 'top',
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
    margin: 5,
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
