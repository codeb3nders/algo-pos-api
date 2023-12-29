import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import SelectDropdown from 'react-native-select-dropdown';

const SelectDropdownComponent = ({
  childRef,
  data,
  name,
  callback,
}: {
  childRef: any;
  data: any[];
  name: string;
  callback?: Function;
}) => {
  const [processData, setProcessData] = useState<any>();

  childRef.current = {
    processData,
  };

  return (
    <SelectDropdown
      rowStyle={{ backgroundColor: 'blue' }}
      buttonTextStyle={{ textTransform: 'capitalize' }}
      defaultButtonText="Apply discount"
      selectedRowTextStyle={{
        textTransform: 'capitalize',
        fontWeight: 'bold',
      }}
      rowTextStyle={{ textTransform: 'capitalize' }}
      data={data}
      onSelect={(selectedItem, index) => {
        setProcessData(() => selectedItem);
      }}
      buttonTextAfterSelection={(selectedItem, index) => {
        // text represented after item is selected
        // if data array is an array of objects then return selectedItem.property to render after item is selected
        return `Discount: ${selectedItem.value * 100}%`;
      }}
      rowTextForSelection={(item, index) => {
        // text represented for each item in dropdown
        // if data array is an array of objects then return item.property to represent item in dropdown
        return item[name];
      }}
    />
  );
};

export default SelectDropdownComponent;

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
});
