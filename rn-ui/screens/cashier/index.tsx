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

const Cashier = ({ navigation }: any) => {
  const [category, setCategory] = useState('frappe');
  const [selectedCategory, setSelectedCategory] = useState<any>([]);
  const [group, setGroup] = useState<any>();
  const [modalVisible, setModalVisible] = useState(false);

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
      style={{
        paddingTop: 10,
        top: 0,
        flex: 1,
      }}
    >
      <GroupComponent
        group={group}
        category={category}
        setCategory={setCategory}
      />

      <View
        className=" flex align-item-center shadow-md -m-2 p-1  py-2 bg-green-100 "
        style={{ height: '90%' }}
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
      <BasketComponent />
    </View>
  );
};

export default Cashier;

const styles = StyleSheet.create({
  itemLayout: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'white',
    height: 100,
    width: 100,
    margin: 5,
  },
  item: {
    margin: 5,
    padding: 5,
    textAlign: 'center',
    textAlignVertical: 'top',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    width: 100,
    margin: 5,
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
