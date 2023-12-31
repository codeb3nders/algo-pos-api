import React from 'react';
import { Alert, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const ModalComponent = ({
  modalVisible,
  setModalVisible,
  children,
}: {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  children: any;
}) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        supportedOrientations={['portrait', 'landscape']}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View className="relative -top-2 -right-2 self-end p-1 rounded-full">
              <TouchableOpacity
                hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <AntDesign name="closecircle" size={24} color="orange" />
              </TouchableOpacity>
            </View>

            {children}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    height: 'auto',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 22,
  },
  modalView: {
    maxHeight: '90%',
    margin: 5,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    alignItems: 'flex-end',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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

export default ModalComponent;
