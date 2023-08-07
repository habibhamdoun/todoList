import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
export const AddBtn = (list, addElement) => {
  return (
    <View
      style={tw`w-16 h-16 bg-white rounded-full flex justify-center items-center shadow-lg `}
    >
      <Pressable onPress={() => addElement()}>
        <Text style={tw`text-4xl text-green-600`}>+</Text>
      </Pressable>
    </View>
  );
};
