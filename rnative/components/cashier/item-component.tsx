import {TouchableOpacity, Image, StyleSheet, Text, View} from 'react-native';
import {Item, Order} from '../../interface';
import {useOrderStore} from '../../store/order.store';
import {useState} from 'react';
import ModalComponent from '../common/modal-component';

const ItemComponent = ({
  item,
  setModalVisible,
}: {
  item: Item;
  setModalVisible: Function;
}) => {
  const orderStore = useOrderStore();
  const {addOrder, setQueueOrder} = orderStore;
  const imagelink = item.image;

  const [variantVisible, setVariantVisible] = useState(false);
  const [variants, setVariants] = useState<any>();

  const handleOnPress = (item: Item) => {
    if (item.variants) {
      setVariants(() => item.variants);
      setVariantVisible(!variantVisible);
    } else {
      handleAddOrder(item);
    }
  };

  const handleAddFromVariant = (variant: any, item: Item) => {
    const order: Order = {
      itemId: `${item?._id}-${variant.name}`,
      item: variant.name,
      option: item.option,
      quantity: 1,
      price: variant.price,
      total: variant.price * 1,
      deduction: null,
      date: new Date(),
      customer: item.customer,
      status: null,
    };

    addOrder(order);
    setVariantVisible(!variantVisible);
    setVariants(null);
  };

  const handleAddOrder = (item: Item) => {
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

  var string = item.item;
  var length = 15;
  var trimmedString =
    string.length > length ? string.substring(0, length - 3) + '...' : string;

  return (
    <>
      <TouchableOpacity
        className="w-24 h-30 rounded-md bg-red-100 m-1 p-1"
        style={{
          shadowColor: 'black',
          shadowOpacity: 0.26,
          shadowOffset: {width: 0, height: 2},
          shadowRadius: 10,
          elevation: 5,
          backgroundColor: 'white',
        }}
        onPress={() => handleOnPress(item)}>
        {!imagelink ? (
          <Image
            className="rounded-xl"
            style={{alignSelf: 'center', width: 80, height: 50}}
            source={require(`../../assets/icon.png`)}
          />
        ) : (
          <Image
            className="rounded-xl"
            style={{alignSelf: 'center', width: 80, height: 50}}
            source={{uri: `${imagelink}`}}
          />
        )}
        <Text style={styles.item} key={item._id}>
          {trimmedString} {item.option}
        </Text>
      </TouchableOpacity>
      {variantVisible && (
        <ModalComponent
          modalVisible={variantVisible}
          setModalVisible={setVariantVisible}>
          <View>
            {variants.map((variant: any) => {
              return (
                <TouchableOpacity
                  onPress={() => handleAddFromVariant(variant, item)}>
                  <Text>
                    {variant.name} - {variant.price}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ModalComponent>
      )}
    </>
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
