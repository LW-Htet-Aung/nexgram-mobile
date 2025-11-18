import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import SearchBar from "@/components/search-bar";

type Props = {};
const TrendingTopics = [
  {
    topic: "#ReactNative",
    tweets: "125k",
  },
  {
    topic: "#TypeScript",
    tweets: "89k",
  },
  {
    topic: "#WebDevelopment",
    tweets: "234k",
  },
  {
    topic: "#AI",
    tweets: "89k",
  },
  {
    topic: "#TechNews",
    tweets: "98k",
  },
  {
    topic: "#ReactNative",
    tweets: "125k",
  },
  {
    topic: "#TypeScript",
    tweets: "89k",
  },
  {
    topic: "#WebDevelopment",
    tweets: "234k",
  },
  {
    topic: "#AI",
    tweets: "89k",
  },
  {
    topic: "#TechNews",
    tweets: "98k",
  },
];
const SearchScreen = (props: Props) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* header */}
      <View className="px-4 py-3 border-b border-gray-100">
        {/* <View className="flex-row items-center px-4 py-1 bg-gray-100 rounded-full">
          <Feather size={16} name="search" color="#657786" />
          <TextInput
            placeholder="Search"
            className="flex-1 ml-3 text-base"
            placeholderTextColor="#657786"
          />
        </View> */}
        <SearchBar />
      </View>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="p-4">
          <Text className="text-base font-bold">Trending</Text>
          {TrendingTopics.map((item, index) => (
            <TouchableOpacity
              className="py-3 border-b border-gray-100"
              key={index}
            >
              <Text className="text-sm text-gray-500">
                Trending in Technology
              </Text>
              <Text className="text-lg font-bold text-gray-900">
                {item.topic}
              </Text>
              <Text className="text-sm text-gray-500">{item.tweets}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
