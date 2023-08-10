import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const FilterBar = ({
  categories,
  activeCategorie,
  activateCategorie,
  setCategorieInput,
  editCategories,
}) => {
  return (
    <View style={tw`h-16`}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={tw`flex flex-row items-start`}>
          {categories.map((categorie) => {
            return (
              <Pressable
                key={categorie}
                onPress={() => activateCategorie(categorie)}
                style={
                  activeCategorie == categorie
                    ? tw`border-2 border-gray-300 bg-green-500 mx-1 p-2 rounded-lg`
                    : tw`border-2 border-gray-300 bg-white mx-1 p-2 rounded-lg`
                }
              >
                <Text
                  style={
                    activeCategorie == categorie
                      ? tw` text-white`
                      : tw` text-black`
                  }
                >
                  {categorie}
                </Text>
              </Pressable>
            );
          })}
          <Pressable
            style={tw`border-2 border-gray-300 bg-white mx-1 p-2 rounded-lg`}
            onPress={() => setCategorieInput(true)}
          >
            <Text>+</Text>
          </Pressable>
          <Pressable
            style={tw`border-2 border-gray-300 bg-white mx-1 p-2 rounded-lg`}
            onPress={() => editCategories()}
          >
            <Text>✏️</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default FilterBar;
