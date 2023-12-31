import { TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import { Item, Order } from '../../interface';
import { useOrderStore } from '../../store/order.store';

const ItemComponent = ({
  item,
  setModalVisible,
}: {
  item: Item;
  setModalVisible: Function;
}) => {
  const orderStore = useOrderStore();
  const { addOrder, setQueueOrder } = orderStore;
  const imagelink = item.image;

  const handleOnPress = (item: Item) => {
    const order: Order = {
      itemId: item?._id,
      item: item.item,
      option: item.option,
      quantity: 1,
      price: item.price,
      total: item.price * 1,
      deduction: null,
      date: new Date(),
      customer: item.customer,
      status: null,
    };

    addOrder(order);
  };

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

export default ItemComponent;

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
});
