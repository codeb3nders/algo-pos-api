import {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import {ORIENTATION} from '../constant';

const useOrientation = (): string => {
  const isPortrait = () => {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width;
  };
  const [screenOrientation, setScreenOrientation] = useState(
    isPortrait() ? ORIENTATION.PORTRAIT : ORIENTATION.LANDSCAPE,
  );

  Dimensions.addEventListener('change', () => {
    setScreenOrientation(() =>
      isPortrait() ? ORIENTATION.PORTRAIT : ORIENTATION.LANDSCAPE,
    );
  });

  return screenOrientation;
};

export default useOrientation;
