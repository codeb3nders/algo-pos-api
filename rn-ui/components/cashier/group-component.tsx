import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

import { StyleSheet } from 'react-native';

const GroupComponent = ({ group, setCategory }: any) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        maxHeight: 70,
        padding: 5,
      }}
    >
      <View>
        <ScrollView horizontal={true}>
          {group &&
            group.map((g: any) => {
              return (
                <TouchableOpacity
                  className="bg-algo-green-1 px-2 h-10 rounded-lg mx-1"
                  style={{
                    shadowColor: 'black',
                    shadowOpacity: 0.26,
                    shadowOffset: { width: 0, height: 2 },
                    shadowRadius: 10,
                    elevation: 5,
                  }}
                  key={`a-${g.category}`}
                  onPress={() => setCategory(() => g.category)}
                >
                  <View>
                    <Text
                      className="text-white capitalize"
                      style={styles.group}
                    >
                      {g.category}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
        </ScrollView>
      </View>
    </View>
  );
};

export default GroupComponent;

const styles = StyleSheet.create({
  groupLayout: {
    borderRadius: 10,
    borderWidth: 1,
    height: 40,
    width: 100,
    // textAlignVertical: 'center',
  },
  group: {
    margin: 5,
    padding: 5,
    textAlign: 'center',
  },
});
