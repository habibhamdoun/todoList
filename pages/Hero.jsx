import React, { useEffect, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import Logo from '../components/Logo';
import tw from 'tailwind-react-native-classnames';
import Task from '../components/Task';

const Hero = () => {
  const [list, setList] = useState([
    {
      title: 'element1',
      content: 'this is content 1',
      completed: false,
      id: 0,
    },
    {
      title: 'element2',
      content: 'this is content 2',
      completed: false,
      id: 1,
    },
    {
      title: 'element3',
      content: 'this is content 3',
      completed: false,
      id: 2,
    },
    {
      title: 'element4',
      content: 'this is content 4',
      completed: false,
      id: 3,
    },
    {
      title: 'element5',
      content: 'this is content ',
      completed: false,
      id: 4,
    },
  ]);
  const [inputStatus, setInputStatus] = useState(false);
  const [title, setTitle] = useState('');
  const [titlePH, setTitlePH] = useState('Insert title...');
  const [content, setContent] = useState('');
  const [contentPH, setContentPH] = useState('Insert content...');
  const [isEditing, setIsEditing] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  function editTask(element) {
    setInputStatus(true);
    setIsEditing(true);
    setTitlePH(element.title);
    setContentPH(element.content);
    setTitle(element.title);
    setContent(element.content);
    setEditingTask(element);
  }
  function addElement() {
    setInputStatus((prev) => !prev);
  }
  function setElement() {
    if (content != '') {
      let taskId = list[list.length - 1].id + 1;
      setList((prevList) => [
        ...prevList,
        {
          title: title,
          content: content,
          completed: false,
          id: taskId,
        },
      ]);
      setTitle('');
      setContent('');
      setInputStatus(false);
      setErrorMsg(false);
    } else setErrorMsg(true);
  }
  function taskCompleted(id) {
    const updatedTasks = list.map((element) =>
      element.id == id ? { ...element, completed: true } : element,
    );
    setList(updatedTasks);
  }
  function taskUncompleted(id) {
    const updatedTasks = list.map((element) =>
      element.id === id ? { ...element, completed: false } : element,
    );

    setList(updatedTasks);
  }
  // TODO: add random colors to boxes
  //TODO: on press go to each task and edit
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
                setTitlePH('Insert Title...');
                setContentPH('Insert Content...');
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
              placeholder={titlePH}
              placeholderTextColor={'#000000'}
              onChangeText={(newText) => setTitle(newText)}
              value={title}
            />
            {errorMsg && (
              <Text style={tw`text-red-600`}> Please fill in the title!!</Text>
            )}
            <TextInput
              style={tw`rounded-xl h-10 border-green-600 border-2 m-2 p-2 w-48`}
              placeholder={contentPH}
              placeholderTextColor={'#000000'}
              onChangeText={(newText) => setContent(newText)}
              value={content}
            />
            <View style={tw`flex flex-row justify-around`}>
              {isEditing ? (
                <Pressable
                  onPress={() => {
                    if (editingTask) {
                      const updatedTasks = list.map((task) =>
                        task.id === editingTask.id
                          ? { ...task, title: title, content: content }
                          : task,
                      );
                      setList(updatedTasks);
                      setInputStatus(false);
                      setIsEditing(false);
                      setEditingTask(null); // Clear the currently edited task
                    } else {
                      setInputStatus(false);
                      setTitle('');
                      setContent('');
                      setTitlePH('Insert Title...');
                      setContentPH('Insert Content...');
                    }
                  }}
                >
                  <Text
                    style={tw`text-white bg-yellow-600 rounded-lg w-16 p-2 flex items-center justify-center`}
                  >
                    Edit Task!
                  </Text>
                </Pressable>
              ) : (
                <Pressable
                  onPress={() =>
                    isEditing
                      ? (setInputStatus(false), setIsEditing(false))
                      : setElement()
                  }
                >
                  <Text
                    style={tw`text-white bg-green-600 rounded-lg w-16 p-2 flex items-center justify-center`}
                  >
                    Submit Task!
                  </Text>
                </Pressable>
              )}
            </View>
          </View>
        </View>
      )}
      <View style={tw`pb-7`}>
        <Logo />
      </View>
      <View style={tw`flex flex-row min-w-full flex-wrap justify-around`}>
        {list.map((element) => {
          return (
            <Task
              key={element.title + element.content}
              element={element}
              taskCompleted={taskCompleted}
              taskUncompleted={taskUncompleted}
              editTask={editTask}
            />
          );
        })}
      </View>
      <View style={tw`flex items-end min-w-full mr-5`}>
        <View
          style={tw`w-16 h-16 bg-white rounded-full flex justify-center items-center shadow-lg `}
        >
          <Pressable
            onPress={() => {
              addElement();
              setIsEditing(false);
            }}
          >
            <Text style={tw`text-4xl text-green-600`}>+</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Hero;
