import { View, Text } from 'react-native';
import React from 'react';

const WhiteText = ({ text }: { text: string }) => {
  return <Text className="text-white capitalize">{text}</Text>;
};

export default WhiteText;
