import { View, TouchableOpacity, ScrollView } from 'react-native';

import { StyleSheet } from 'react-native';
import WhiteText from '../common/white-text-component';
import BlackText from '../common/black-text-component';

const GroupComponent = ({ group, category, setCategory }: any) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        maxHeight: 60,
        paddingTop: 5,
      }}
    >
      <View className=" w-full">
        <ScrollView horizontal={true}>
          {group &&
            group.map((g: any) => {
              return (
                <TouchableOpacity
                  className={`px-2 h-10 rounded-lg mx-1 ${
                    g.category.toLowerCase() === category.toLowerCase()
                      ? ' h-80 border border-green-300 bg-green-100'
                      : 'bg-algo-green-1'
                  }  `}
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
                    <View style={styles.group}>
                      {g.category.toLowerCase() !== category.toLowerCase() ? (
                        <WhiteText text={g.category} />
                      ) : (
                        <BlackText text={g.category} />
                      )}
                    </View>
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
