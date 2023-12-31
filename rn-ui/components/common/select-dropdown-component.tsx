import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import SelectDropdown from 'react-native-select-dropdown';

const SelectDropdownComponent = ({
  childRef,
  data,
  name,
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
      buttonTextStyle={{ textTransform: 'capitalize' }}
      defaultButtonText="Apply discount"
      selectedRowTextStyle={{
        textTransform: 'capitalize',
        fontWeight: 'bold',
      }}
      rowTextStyle={{ textTransform: 'capitalize' }}
      data={data}
      onSelect={(selectedItem) => {
        setProcessData(() => selectedItem);
      }}
      buttonTextAfterSelection={(selectedItem) => {
        // text represented after item is selected
        // if data array is an array of objects then return selectedItem.property to render after item is selected
        return `Discount: ${selectedItem.value * 100}%`;
      }}
      rowTextForSelection={(item) => {
        // text represented for each item in dropdown
        // if data array is an array of objects then return item.property to represent item in dropdown
        return item[name];
      }}
    />
  );
};

export default SelectDropdownComponent;
