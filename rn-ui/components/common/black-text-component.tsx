import { View, Text } from 'react-native';
import React from 'react';

const BlackText = ({ text }: { text: string }) => {
  return <Text className="text-black capitalize">{text}</Text>;
};

export default BlackText;
