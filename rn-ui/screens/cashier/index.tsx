import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { useItemStore } from '../../store/item.store';
import ItemBox from './ItemBox';
import { Item } from '../../interface';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

const Box = ({ className, ...props }: any) => (
  <StyledText
    className={`flex text-center h-14 justify-center items-center text-white bg-fuchsia-500 rounded ${className}`}
    {...props}
  />
);

const Cashier = () => {
  const itemsStore = useItemStore();

  useEffect(() => {
    itemsStore.loadItems();
  }, []);

  return (
    <>
      <Text>Cashier</Text>
      <ItemBox items={itemsStore.items} />
    </>
  );
};

export default Cashier;
