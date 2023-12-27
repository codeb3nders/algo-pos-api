import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useItemStore } from '../../store/item.store';
import { Item } from '../../interface';
import Group from './Group';
import { useOrderStore } from '../../store/order.store';
import CommonModalComponent from './CommonModal';
import QueueOrder from './QueueOrder';
import Basket from './Basket';
import { SafeAreaView } from 'react-native-safe-area-context';

const Cashier = () => {
  const [category, setCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<any>([]);
  const [group, setGroup] = useState<any>();
  const [modalVisible, setModalVisible] = useState(false);

  const itemsStore = useItemStore();
  const orderStore = useOrderStore();
  const { items, loadingData } = itemsStore;
  const { setQueueOrder } = orderStore;

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
    const imagelink = item.image;

    return (
      <TouchableOpacity
        className="w-24 h-30 rounded-md bg-red-100 m-1 p-1"
        style={{
          shadowColor: 'black',
          shadowOpacity: 0.26,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 10,
          elevation: 5,
          backgroundColor: 'white',
        }}
        onPress={() => handleOnPress(item)}
      >
        {!imagelink ? (
          <Image
            className="rounded-xl"
            style={{ alignSelf: 'center', width: 90, height: 70 }}
            source={require(`../../assets/icon.png`)}
          />
        ) : (
          <Image
            className="rounded-xl"
            style={{ alignSelf: 'center', width: 90, height: 70 }}
            source={{ uri: `${imagelink}` }}
          />
        )}
        <Text style={styles.item} key={item._id}>
          {item.item} {item.option}
        </Text>
      </TouchableOpacity>
    );
  };

  // 09178421364 kevin pillon

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Group group={group} category={category} setCategory={setCategory} />
      <View
        className=" flex align-item-center shadow-md m-2"
        style={{ height: '80%' }}
      >
        <ScrollView>
          <View className="flex justify-center align-top flex-row flex-wrap">
            {selectedCategory.length ? (
              selectedCategory.map((item: Item, id: number) => {
                return <Item key={`b-${id}`} item={item} />;
              })
            ) : (
              <View className="h-96 w-full justify-center items-center">
                <Text>Select Category</Text>
              </View>
            )}
          </View>
          <CommonModalComponent
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          >
            <QueueOrder
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
            />
          </CommonModalComponent>
        </ScrollView>

        <Basket />
      </View>
    </SafeAreaView>
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
