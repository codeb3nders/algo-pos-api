import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

import { StyleSheet } from 'react-native';

const Group = ({ group, setCategory }: any) => {
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
                  key={`a-${g.category}`}
                  style={styles.groupLayout}
                  onPress={() => setCategory(() => g.category)}
                >
                  <View>
                    <Text style={styles.group}>{g.category}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
        </ScrollView>
      </View>
    </View>
  );
};

export default Group;

const styles = StyleSheet.create({
  groupLayout: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'green',
    height: 40,
    width: 100,
    textAlignVertical: 'center',
  },
  group: {
    margin: 5,
    padding: 5,
    textAlign: 'center',
  },
});
