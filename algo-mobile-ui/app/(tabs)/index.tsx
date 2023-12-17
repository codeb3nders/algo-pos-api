import { View, Text } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

const Index = () => {
  return (
    <View>
      <Link href={'/(modals)/login'}>Login </Link>
      <Link href={'/(modals)/booking'}>Booking </Link>
      <Link href={'/listing/123'}>Listing Details </Link>
    </View>
  );
};

export default Index;