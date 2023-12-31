import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useItemStore } from '../../store/item.store';
import { Item } from '../../interface';
import GroupComponent from '../../components/cashier/group-component';
import ModalComponent from '../../components/common/modal-component';
import QueueOrderComponent from '../../components/cashier/queue-order-component';
import BasketComponent from '../../components/cashier/basket-component';
import { SafeAreaView } from 'react-native-safe-area-context';
import ParkedAlertComponent from '../../components/cashier/parked-alert-component';
import ItemComponent from '../../components/cashier/item-component';
import useOrientation from '../../hooks/useOrientation';
import { ORIENTATION } from '../../constant';
import Sales from '../sales/sales';
import Orders from '../../components/cashier/orders-component';
import BasketContent from '../../components/cashier/basket-content';

const Cashier = ({ navigation }: any) => {
  const [category, setCategory] = useState('frappe');
  const [selectedCategory, setSelectedCategory] = useState<any>([]);
  const [group, setGroup] = useState<any>();
  const [modalVisible, setModalVisible] = useState(false);
  const orientation = useOrientation();

  console.log('-- -- -- ', orientation, ORIENTATION.PORTRAIT);

  const itemsStore = useItemStore();
  const { items, loadingData, loadItems } = itemsStore;

  useEffect(() => {
    loadItems();
  }, []);

  useEffect(() => {
    groupedItem();
    selectedCategoryItems();
  }, [category, loadingData]);

  const selectedCategoryItems = () => {
    const result = items.filter((item: Item) => {
      return item.category.toLowerCase() === category.toLowerCase();
    });

    setSelectedCategory(() => result);
  };

  const groupedItem = async () => {
    interface GroupedItems {
      [category: string]: Item[];
    }
    interface GroupedItem {
      category: string;
      items: Item[];
    }

    const groupedItems: GroupedItem[] = [];

    items &&
      items.forEach((item: Item) => {
        const existingGroup = groupedItems.find(
          (group) => group.category === item.category,
        );

        if (existingGroup) {
          existingGroup.items.push(item);
        } else {
          groupedItems.push({
            category: item.category,
            items: [item],
          });
        }
      });

    setGroup(() => groupedItems);
  };

  return (
    <View
      className="flex flex-row flex-grow space-x-4 -1"
      style={{
        paddingTop: 10,
        top: 0,
        flex: 1,
      }}
    >
      <View
        className={`${
          orientation === ORIENTATION.LANDSCAPE && 'w-3/5 border rounded-lg'
        } `}
      >
        <GroupComponent
          group={group}
          category={category}
          setCategory={setCategory}
        />

        <View
          className=" flex align-item-center shadow-md  p-1  py-2 bg-green-100"
          style={
            orientation === ORIENTATION.PORTRAIT
              ? styles.portraitHeight
              : styles.landscapeHeight
          }
        >
          <ScrollView>
            <View className="flex justify-center align-top flex-row flex-wrap ">
              {selectedCategory.length ? (
                selectedCategory.map((item: Item, id: number) => {
                  return (
                    <ItemComponent
                      key={`b-${id}`}
                      item={item}
                      setModalVisible={setModalVisible}
                    />
                  );
                })
              ) : (
                <View className="h-96 w-full justify-center items-center">
                  <Text>Select Category</Text>
                </View>
              )}
            </View>
          </ScrollView>
        </View>
        <ParkedAlertComponent />
        {orientation === ORIENTATION.PORTRAIT && <BasketComponent />}
      </View>
      {orientation === ORIENTATION.LANDSCAPE && (
        <View className="w-1/3 border rounded-xl">
          <BasketContent />
        </View>
      )}
    </View>
  );
};

export default Cashier;

const styles = StyleSheet.create({
  portraitHeight: {
    height: '90%',
    padding: 1,
  },
  landscapeHeight: {
    height: '70%',
  },
});
