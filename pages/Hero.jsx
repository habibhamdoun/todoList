import React, { useEffect, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Logo from '../components/Logo';
import tw from 'tailwind-react-native-classnames';
import Task from '../components/Task';
import FilterBar from '../components/FilterBar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Hero = () => {
  const [list, setList] = useState([
    {
      title: 'element1',
      content: 'this is content 1',
      completed: false,
      id: 0,
      category: 'Personal',
    },
    {
      title: 'element2',
      content: 'this is content 2',
      completed: false,
      id: 1,
      category: 'Important',
    },
    {
      title: 'element3',
      content: 'this is content 3',
      completed: false,
      id: 2,
      category: 'To-do List',
    },
    {
      title: 'element4',
      content: 'this is content 4',
      completed: false,
      id: 3,
      category: 'Lecture Notes',
    },
    {
      title: 'element5',
      content: 'this is content ',
      completed: false,
      id: 4,
      category: 'Important',
    },
  ]);
  useEffect(() => {
    loadTasks();
    loadCategories();
  }, []);
  const loadCategories = async () => {
    try {
      const storedCategories = await AsyncStorage.getItem('categories');
      if (storedCategories) {
        setCategories(JSON.parse(storedCategories));
      }
    } catch (error) {
      console.log('Error loading categories:', error);
    }
  };
  const saveCategories = async (categories) => {
    try {
      await AsyncStorage.setItem('categories', JSON.stringify(categories));
    } catch (error) {
      console.log('Error saving categories', error);
    }
  };
  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        setList(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  const saveTasks = async (tasks) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };
  const [inputStatus, setInputStatus] = useState(false);
  const [title, setTitle] = useState('');
  const [titlePH, setTitlePH] = useState('Insert title...');
  const [content, setContent] = useState('');
  const [contentPH, setContentPH] = useState('Insert content...');
  const [isEditing, setIsEditing] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [categorieInput, setCategorieInput] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(false);
  const [newCategorie, setNewCategorie] = useState('');
  const [categorieExistMsg, setCategorieExistMsg] = useState(false);
  const [categorieErrorMsg, setCategorieErrorMsg] = useState(false);
  const [editingCategories, setEditingCategories] = useState(false);
  const [categories, setCategories] = useState([
    'All',
    'Personal',
    'Important',
    'Lecture Notes',
    'To-do List',
    'Uncompleted',
    'Completed',
  ]);
  const mainCategories = [
    'All',
    'Personal',
    'Important',
    'Lecture Notes',
    'To-do List',
    'Uncompleted',
    'Completed',
  ];
  const [activeCategorie, setActiveCategorie] = useState('All');
  function activateCategorie(cat) {
    setActiveCategorie(cat);
  }
  function clearCategoryErrors() {
    setCategorieExistMsg(false);
    setCategorieErrorMsg(false);
    setEditingCategories(false);
  }
  function removeCategory(cat) {
    const updatedCategories = categories.filter((category) => category != cat);
    setCategories(updatedCategories);
    setEditingCategories(false);
  }

  function editTask(element) {
    setInputStatus(true);
    setIsEditing(true);
    setTitlePH(element.title);
    setContentPH(element.content);
    setTitle(element.title);
    setContent(element.content);
    setEditingTask(element);
  }
  function editCategories() {
    setEditingCategories(true);
  }

  function setElement() {
    if (content != '' && title != '') {
      let taskId = list[list.length - 1].id + 1;
      setList((prevList) => [
        ...prevList,
        {
          title: title,
          content: content,
          completed: false,
          id: taskId,
          category: selectedCategory,
        },
      ]);
      saveTasks(list);
      setTitle('');
      setContent('');
      setInputStatus(false);
      setErrorMsg(false);
      setSelectedCategory('');
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
  return (
    <View style={tw`flex justify-start items-center pt-14 flex-1 relative`}>
      {editingCategories && (
        <View
          style={tw`absolute bg-white z-10 h-full w-full flex items-center justify-center`}
        >
          <View
            style={tw` bg-white shadow-md h-96 rounded-xl flex items-center justify-center`}
          >
            <Pressable
              onPress={() => {
                setEditingCategories(false);
              }}
            >
              <Text
                style={tw`flex items-end min-w-full mr-16 text-right text-2xl text-green-600 font-bold`}
              >
                x
              </Text>
            </Pressable>
            {categories.some(
              (categorie) => mainCategories.indexOf(categorie) === -1,
            ) ? (
              categories.map((categorie) => {
                if (mainCategories.indexOf(categorie) === -1) {
                  return (
                    <View
                      key={categorie}
                      style={tw`flex flex-row justify-between w-64 p-4`}
                    >
                      <Text>{categorie}</Text>
                      <View style={tw`flex flex-row`}>
                        <Pressable
                          onPress={() => {
                            removeCategory(categorie);
                            setCategorieInput(true);
                          }}
                          style={tw`px-3`}
                        >
                          <Text>✏️</Text>
                        </Pressable>
                        <Pressable
                          onPress={() => removeCategory(categorie)}
                          style={tw`px-3`}
                        >
                          <Text>🗑️</Text>
                        </Pressable>
                      </View>
                    </View>
                  );
                }
              })
            ) : (
              <View>
                <Text>No categories available to edit :/</Text>
                <Pressable
                  onPress={() => {
                    setCategorieInput(true);
                    setEditingCategories(false);
                  }}
                  style={tw`text-white bg-green-600 rounded-lg p-2 flex items-center justify-center text-center`}
                >
                  <Text style={tw`text-white`}>Add category!</Text>
                </Pressable>
              </View>
            )}
          </View>
        </View>
      )}
      {categorieInput && (
        <View
          style={tw`absolute bg-white z-10 h-full w-full flex items-center justify-center`}
        >
          <View
            style={tw` bg-white shadow-md h-96 rounded-xl flex items-center justify-center`}
          >
            <Pressable
              onPress={() => {
                setCategorieErrorMsg(false);
                setCategorieExistMsg(false);
                setCategorieInput(false);
                setNewCategorie('');
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
              placeholder='Insert Category...'
              placeholderTextColor={'#000000'}
              onChangeText={(newText) => setNewCategorie(newText)}
              value={newCategorie}
            />
            {categorieExistMsg && (
              <Text style={tw`text-red-600 p-2`}>
                category already existant.
              </Text>
            )}

            {categorieErrorMsg && (
              <Text style={tw`text-red-600 p-2`}>
                Please fill in acategory name.
              </Text>
            )}
            <Pressable
              onPress={() => {
                if (categories.indexOf(newCategorie) != -1) {
                  setCategorieExistMsg(true);
                  return;
                } else if (newCategorie == '') {
                  setCategorieErrorMsg(true);
                } else {
                  const updatedCategories = [...categories, newCategorie];
                  setCategories(updatedCategories);
                  saveCategories(updatedCategories);
                  setCategorieInput(false);
                  setCategorieErrorMsg(false);
                  setCategorieExistMsg(false);
                  setNewCategorie('');
                }
              }}
            >
              <Text
                style={tw`text-white bg-green-600 rounded-lg p-2 flex items-center justify-center text-center`}
              >
                Submit category
              </Text>
            </Pressable>
          </View>
        </View>
      )}
      {inputStatus && (
        <View
          style={tw`absolute bg-white z-10 h-full w-full flex items-center justify-center`}
        >
          <View
            style={tw` bg-white shadow-md h-96 rounded-xl flex items-center justify-center`}
          >
            <Pressable
              onPress={() => {
                setInputStatus(false);
                setTitle('');
                setContent('');
                setTitlePH('Insert Title...');
                setContentPH('Insert Content...');
                setErrorMsg(false);
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
              <Text style={tw`text-red-600`}>
                Please fill in all the fields!!
              </Text>
            )}
            <TextInput
              multiline={true}
              style={tw`rounded-xl h-10 border-green-600 border-2 m-2 p-2 w-48`}
              placeholder={contentPH}
              placeholderTextColor={'#000000'}
              onChangeText={(newText) => setContent(newText)}
              value={content}
            />
            <View
              style={tw`border-2 border-gray-300 bg-green-500 rounded-lg m-2`}
            >
              <Picker
                style={tw`w-28 text-white`}
                selectedValue={selectedCategory}
                onValueChange={(itemValue) => setSelectedCategory(itemValue)}
              >
                {categories.map((categorie) => {
                  return (
                    <Picker.Item
                      key={categorie}
                      label={categorie}
                      value={categorie}
                    />
                  );
                })}
              </Picker>
            </View>

            <View style={tw`flex flex-row justify-around`}>
              {isEditing ? (
                <View style={tw`flex flex-row`}>
                  <Pressable
                    style={tw`mx-2`}
                    onPress={() => {
                      if (
                        newCategorie != '' ||
                        newCategorie != null ||
                        newCategorie != undefined
                      ) {
                        setInputStatus(false);
                        setTitle('');
                        setContent('');
                        setTitlePH('Insert Title...');
                        setContentPH('Insert Content...');
                      } else if (editingTask) {
                        const updatedTasks = list.map((task) =>
                          task.id === editingTask.id
                            ? { ...task, title: title, content: content }
                            : task,
                        );
                        setList(updatedTasks);
                        saveTasks();
                        setInputStatus(false);
                        setIsEditing(false);
                        setEditingTask(null);
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
                  <Pressable
                    onPress={() => {
                      const updatedTasks = list.filter(
                        (element) => element != editingTask,
                      );
                      setList(updatedTasks);
                      saveTasks(updatedTasks);
                      setInputStatus(false);
                    }}
                  >
                    <Text
                      style={tw`text-white bg-red-600 rounded-lg w-16 p-2 flex items-center justify-center`}
                    >
                      Delete Task!
                    </Text>
                  </Pressable>
                </View>
              ) : (
                <Pressable onPress={() => setElement()}>
                  <Text
                    style={tw`text-white bg-green-500 rounded-lg  p-2 flex items-center justify-center border-2 border-gray-300`}
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
      <View>
        <FilterBar
          categories={categories}
          activeCategorie={activeCategorie}
          activateCategorie={activateCategorie}
          setCategorieInput={setCategorieInput}
          editCategories={editCategories}
          clearCategoryErrors={clearCategoryErrors}
        />
      </View>
      <View style={tw`flex flex-row min-w-full flex-wrap justify-around`}>
        {list.map((element) => {
          if (element.category == activeCategorie) {
            return (
              <Task
                key={element.title + element.content}
                element={element}
                taskCompleted={taskCompleted}
                taskUncompleted={taskUncompleted}
                editTask={editTask}
              />
            );
          } else if (activeCategorie == 'All') {
            return (
              <Task
                key={element.title + element.content}
                element={element}
                taskCompleted={taskCompleted}
                taskUncompleted={taskUncompleted}
                editTask={editTask}
              />
            );
          } else if (activeCategorie == 'Uncompleted') {
            if (element.completed == false)
              return (
                <Task
                  key={element.title + element.content}
                  element={element}
                  taskCompleted={taskCompleted}
                  taskUncompleted={taskUncompleted}
                  editTask={editTask}
                />
              );
          } else if (activeCategorie == 'Completed') {
            if (element.completed == true)
              return (
                <Task
                  key={element.title + element.content}
                  element={element}
                  taskCompleted={taskCompleted}
                  taskUncompleted={taskUncompleted}
                  editTask={editTask}
                />
              );
          }
        })}
      </View>
      <View style={tw`flex items-end min-w-full mr-5`}>
        <Pressable
          onPress={() => {
            setInputStatus(true);
            setTitle('');
            setContent('');
            setTitlePH('Insert title...');
            setContentPH('Insert Content...');
            setIsEditing(false);
            setErrorMsg(false);
          }}
        >
          <View
            style={tw`w-16 h-16 bg-white rounded-full flex justify-center items-center shadow-lg `}
          >
            <Text style={tw`text-4xl text-green-600`}>+</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default Hero;
