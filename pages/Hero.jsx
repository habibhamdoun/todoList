import React, { useEffect, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import Logo from '../components/Logo';
import tw from 'tailwind-react-native-classnames';

const Hero = () => {
  const [list, setList] = useState([
    { title: 'element1', content: 'this is content 1', completed: false },
    { title: 'element2', content: 'this is content 2', completed: false },
    { title: 'element2', content: 'this is content 2', completed: false },
    { title: 'element2', content: 'this is content 2', completed: false },
    { title: 'element2', content: 'this is content 2', completed: false },
  ]);
  const [inputStatus, setInputStatus] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [iscompleted, setIsCompleted] = useState('');
  function getRandomColor() {
    let colors = ['#D9E8FC', '#FFD8F4', '#FDE99D', '#B0E9CA', '#FFEADD'];
    let color = colors[Math.floor(Math.random() * colors.length)];

    return color;
  }
  function addElement() {
    setInputStatus((prev) => !prev);
  }
  function setElement() {
    setList((prevList) => [
      ...prevList,
      {
        title: title + ':',
        content: content,
        completed: false,
      },
    ]);
    setTitle('');
    setContent('');
    setInputStatus(false);
  }
  // TODO: add random colors to boxes
  //TODO: on press go to each task and edit
  // TODO: create element component to be able to edit and make the state hold components
  //TODO: add attributes such as important / personal ... and then filter with each one
  //TODO: add local storage
  //TODO: add types such as list or bullet points
  return (
    <View style={tw`flex justify-start items-center pt-14 flex-1 relative`}>
      {inputStatus && (
        <View style={tw`absolute bg-white z-10 h-full w-full`}>
          <View style={tw`top-1/3 bg-white shadow-md p-16 rounded-xl `}>
            <Pressable
              onPress={() => {
                setInputStatus(false);
                setTitle('');
                setContent('');
              }}
            >
              <Text
                style={tw`flex items-end min-w-full mr-5 text-right text-2xl text-green-600 font-bold`}
              >
                x
              </Text>
            </Pressable>
            <TextInput
              style={tw`rounded-xl h-10 border-green-600 border-2 m-2 p-2 w-48`}
              placeholder='Insert Title...'
              placeholderTextColor={'#000000'}
              onChangeText={(newText) => setTitle(newText)}
              defaultValue={title}
            />
            <TextInput
              style={tw`rounded-xl h-10 border-green-600 border-2 m-2 p-2 w-48`}
              placeholder='Insert Content...'
              placeholderTextColor={'#000000'}
              onChangeText={(newText) => setContent(newText)}
              onEndEditing={() => setElement()}
              defaultValue={content}
            />
          </View>
        </View>
      )}
      <View style={tw`pb-7`}>
        <Logo />
      </View>
      <View style={tw`flex flex-row min-w-full flex-wrap justify-around`}>
        {list.map((element) => {
          return (
            <View style={tw`border-green-600 border-2 m-2 w-32 rounded-lg p-4`}>
              <View style={tw`flex items-end min-w-full bg-black`}></View>
              <Text style={tw`pt-2 font-bold`}>{element.title}</Text>
              <Text>{element.content}</Text>
            </View>
          );
        })}
      </View>
      <View style={tw`flex items-end min-w-full mr-5`}>
        <View
          style={tw`w-16 h-16 bg-white rounded-full flex justify-center items-center shadow-lg `}
        >
          <Pressable onPress={() => addElement()}>
            <Text style={tw`text-4xl text-green-600`}>+</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Hero;
