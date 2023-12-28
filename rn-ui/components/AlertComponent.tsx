import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { useSalesStore } from '../store/sales.store';

const AlertComponent = () => {
  const salesStore = useSalesStore();
  const { sales, getSales } = salesStore;

  useEffect(() => {
    getSales();
    filterParked();
  }, [sales, sales.length]);

  const filterParked = () => {
    return sales.filter((s) => s.status !== 'paid').length;
  };

  if (!filterParked()) return;

  return (
    <View
      className="absolute top-1 left-1 bg-orange-500 rounded-md m-2 p-2"
      style={{
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 5,
      }}
    >
      <Text>{filterParked()} Parked</Text>
    </View>
  );
};

export default AlertComponent;
