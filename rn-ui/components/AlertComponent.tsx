import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { useSalesStore } from '../store/sales.store';

const AlertComponent = () => {
  const salesStore = useSalesStore();
  const { parked } = salesStore;

  return (
    <View className="absolute top-1 left-1 bg-orange-500 rounded-md m-2 p-2">
      <Text>{parked.length} Parked</Text>
    </View>
  );
};

export default AlertComponent;
