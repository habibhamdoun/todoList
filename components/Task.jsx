import React, { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import Svg, { G, Path, Circle } from 'react-native-svg';
import tw from 'tailwind-react-native-classnames';

const Task = ({ element, taskCompleted, taskUncompleted, editTask }) => {
  const [bgColor, setBgColor] = useState('');
  useEffect(() => {
    if (element.category == 'Important') setBgColor('#FF8A75');
    else if (element.category == 'Personal') setBgColor('#B0E9CA');
    else if (element.category == 'Lecture Notes') setBgColor('#D9E8FC');
    else if (element.category == 'To-do List') setBgColor('#FFD8F4');
    else if (element.category == 'Uncompleted') setBgColor('#FDE99D');
    else setBgColor('#FFEADD');
  }, []);
  return (
    <Pressable
      index={element.id}
      style={[
        tw`border-green-600 border-2 m-2 w-32 rounded-lg p-4`,
        { backgroundColor: bgColor },
      ]}
      onPress={() => editTask(element)}
    >
      <View
        style={tw`flex flex-row-reverse justify-between items-end min-w-full`}
      >
        {element.completed ? (
          <Pressable
            onPress={() => taskUncompleted(element.id)}
            style={tw`w-5 h-5`}
          >
            <Svg
              fill='#43A047'
              viewBox='0 0 32 32'
              xmlns='http://www.w3.org/2000/svg'
            >
              <Circle cx='16' cy='16' r='16' />
            </Svg>
          </Pressable>
        ) : (
          <Pressable
            style={tw`w-5 h-5`}
            onPress={() => taskCompleted(element.id)}
          >
            <Svg
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <G id='SVGRepo_bgCarrier' stroke-width='0' />
              <G
                id='SVGRepo_tracerCarrier'
                stroke-linecap='round'
                stroke-linejoin='round'
              />
              <G id='SVGRepo_iconCarrier'>
                <Path
                  d='M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z'
                  stroke='#43A047'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
              </G>
            </Svg>
          </Pressable>
        )}
        <Text style={tw`pt-2 font-bold`}>{element.title}:</Text>
      </View>
      <Text>{element.content}</Text>
    </Pressable>
  );
};

export default Task;
