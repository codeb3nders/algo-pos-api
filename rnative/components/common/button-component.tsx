import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const ButtonComponent = ({children, onPress, style}: any) => {
  return (
    <TouchableOpacity
      hitSlop={{top: 20, left: 20, bottom: 20, right: 20}}
      className="flex border  border-gray-400 bg-algo-green-1 self-center  items-center rounded-full p-1 px-4 min-w-24"
      style={{minWidth: 100, ...style}}
      onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

export default ButtonComponent;