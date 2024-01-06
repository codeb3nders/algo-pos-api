import React, {useEffect, useState} from 'react';
import {View, Switch, StyleSheet, Text} from 'react-native';
import {useSettingStore} from '../../store/settings.store';

const SettingsScreen = () => {
  const settingStore = useSettingStore();
  const [autoPrintToggle, setAutoprintToggle] = useState<boolean>(false);
  const [autoPrintOrderToggle, setAutoprintOrderToggle] =
    useState<boolean>(false);

  const toggleSwitch = (previousState: boolean, callback: Function) => {
    callback(() => !previousState);
  };

  useEffect(() => {
    setAutoprintToggle(() => !!settingStore.settings?.autoPrint);
  }, []);

  useEffect(() => {
    settingStore.setSettings({autoPrint: autoPrintToggle});
  }, [autoPrintToggle]);

  const LabelView = ({children}: any) => (
    <View className="flex flex-row justify-between w-2/5 capitalize m-1 p-1">
      {children}
    </View>
  );

  return (
    <View className="flex  h-full items-center justify-center">
      <LabelView>
        <Text>Auto print receipt:</Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={autoPrintToggle ? '#00ced1' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() =>
            toggleSwitch(autoPrintToggle, setAutoprintToggle)
          }
          value={autoPrintToggle}
        />
      </LabelView>
      <LabelView>
        <Text>Useless Settings:</Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={autoPrintOrderToggle ? '#00ced1' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() =>
            toggleSwitch(autoPrintOrderToggle, setAutoprintOrderToggle)
          }
          value={autoPrintOrderToggle}
        />
      </LabelView>
    </View>
  );
};

export default SettingsScreen;
