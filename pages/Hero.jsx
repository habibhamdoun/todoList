import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import Logo from '../components/Logo';
import tw from 'tailwind-react-native-classnames';

const Hero = () => {
  const [list, setList] = useState([
    { title: 'element1', content: 'this is content 1' },
    { title: 'element2', content: 'this is content 2' },
    { title: 'element2', content: 'this is content 2' },
    { title: 'element2', content: 'this is content 2' },
    { title: 'element2', content: 'this is content 2' },
  ]);
  function getRandomColor() {
    let colors = ['#D9E8FC', '#FFD8F4', '#FDE99D', '#B0E9CA', '#FFEADD'];
    let color = colors[Math.floor(Math.random() * colors.length)];

    return color;
  }
  // TODO: add random colors to boxes
  //TODO: on press go to each task and edit
  // TODO: create element component to be able to edit and make the state hold components
  return (
    <View style={tw`flex justify-start items-center pt-14 flex-1`}>
      <View>
        <Logo />
      </View>
      <View style={tw`flex flex-row min-w-full flex-wrap justify-around`}>
        {list.map((element) => {
          return (
            <View style={tw`border-black border-2 m-2 w-32 rounded-lg p-4`}>
              <Text style={tw`pt-2 font-bold`}>{element.title}</Text>
              <Text>{element.content}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default Hero;
