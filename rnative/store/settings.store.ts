import {create} from 'zustand';
import {ISetting, SettingProperty} from '../interface';

export const useSettingStore = create<ISetting>(set => ({
  settings: {autoPrint: false},
  setSettings: (settings: SettingProperty) => set({...settings, settings}),
}));
