import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useItemStore } from '../../store/item.store';
import { Item } from '../../interface';
import Group from './Group';
import { useOrderStore } from '../../store/order.store';
import CommonModalComponent from './CommonModal';
import QueueOrder from './QueueOrder';
import Basket from './Basket';

const Cashier = () => {
  const [category, setCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<any>([]);
  const [group, setGroup] = useState<any>();
  const [modalVisible, setModalVisible] = useState(false);

  const itemsStore = useItemStore();
  const orderStore = useOrderStore();
  const { items, loadingData } = itemsStore;
  const { setQueueOrder, queueOrder } = orderStore;

  useEffect(() => {
    itemsStore.loadItems();
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

  const handleOnPress = (item: Item) => {
    setQueueOrder(item);
    setModalVisible(() => true);
  };

  const Item = ({ item }: { item: Item }) => {
    return (
      <TouchableOpacity
        style={styles.itemLayout}
        onPress={() => handleOnPress(item)}
      >
        <Text style={styles.item} key={item.item}>
          {item.category} - {item.item} - {item.price}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      {group && (
        <Group group={group} category={category} setCategory={setCategory} />
      )}

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
      >
        {selectedCategory.length ? (
          selectedCategory.map((item: Item, id: number) => {
            return <Item key={item.item} item={item} />;
          })
        ) : (
          <Text>Select Item</Text>
        )}
      </View>
      <View>
        <CommonModalComponent
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        >
          <QueueOrder
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        </CommonModalComponent>
      </View>
      <Basket />
    </>
  );
};

export default Cashier;

const styles = StyleSheet.create({
  itemLayout: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'gray',
    height: 100,
    width: 100,
    margin: 5,
  },
  item: {
    margin: 5,
    padding: 5,
    textAlign: 'center',
    textAlignVertical: 'center',
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
