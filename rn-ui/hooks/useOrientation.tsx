import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect, useState } from 'react';
import { ORIENTATION_NUMBER } from '../constant';

const useOrientation = () => {
  const [screenOrientation, setScreenOrientation] = useState(
    ScreenOrientation.Orientation.PORTRAIT_UP,
  );

  useEffect(() => {
    const onOrientationChange = (
      currentOrientation: ScreenOrientation.OrientationChangeEvent,
    ) => {
      const orientationValue = currentOrientation.orientationInfo.orientation;
      setScreenOrientation(orientationValue);
    };

    const initScreenOrientation = async () => {
      const currentOrientation = await ScreenOrientation.getOrientationAsync();
      setScreenOrientation(currentOrientation);
    };

    initScreenOrientation();

    const screeOrientationListener =
      ScreenOrientation.addOrientationChangeListener(onOrientationChange);

    return () => {
      ScreenOrientation.removeOrientationChangeListener(
        screeOrientationListener,
      );
    };
  }, []);

  return ORIENTATION_NUMBER[screenOrientation];
};

export default useOrientation;
