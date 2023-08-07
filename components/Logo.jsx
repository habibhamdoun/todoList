import React from 'react';
import { Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const Logo = () => {
  return (
    <View>
      <Text style={tw`text-3xl`}>
        T<Text style={tw`text-green-600`}>a</Text>sk
        <Text style={tw`text-green-500`}>✔</Text>Ma
        <Text style={tw`text-green-600`}>s</Text>ter
      </Text>
    </View>
  );
};

export default Logo;
