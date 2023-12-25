import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

import { StyleSheet } from 'react-native';

const Group = ({ group, setCategory }: any) => {
  return (
    <ScrollView
      horizontal={true}
      style={{
        flex: 1,
        flexDirection: 'row',
        maxHeight: 70,
        padding: 5,
      }}
    >
      {group &&
        group.map((g: any) => {
          return (
            <TouchableOpacity
              style={styles.groupLayout}
              onPress={() => setCategory(() => g.category)}
            >
              <View>
                <Text key={g.category} style={styles.group}>
                  {g.category}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
    </ScrollView>
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
