import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const ButtonComponent = ({ children, callback }: any) => {
  return (
    <TouchableOpacity
      hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
      className="flex border border-gray-400 bg-algo-green-1 self-center  items-center rounded-full p-1 w-20 mt-5"
      onPress={callback}
    >
      {children}
    </TouchableOpacity>
  );
};

export default ButtonComponent;
