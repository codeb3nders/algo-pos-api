import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { useSalesStore } from '../../store/sales.store';
import AlertComponent from '../common/alert-component';

const ParkedAlertComponent = () => {
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
    <AlertComponent position={{ left: 1, bottom: 1 }}>
      <Text>{filterParked()} Parked</Text>
    </AlertComponent>
  );
};

export default ParkedAlertComponent;
