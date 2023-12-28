import { View } from 'react-native';
import React from 'react';

const AlertComponent = ({
  position,
  children,
}: {
  position: {};
  children: JSX.Element;
}) => {
  return (
    <View
      className="absolute bg-orange-500 rounded-md m-2 p-2"
      style={{
        ...position,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 5,
      }}
    >
      {children}
    </View>
  );
};

export default AlertComponent;
