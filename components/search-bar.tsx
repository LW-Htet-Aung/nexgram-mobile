import { tailwindMerge } from "@/libs/utils";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { TextInput, TextInputProps, View } from "react-native";

interface SearchBarProps extends TextInputProps {
  iconColor?: string;
  iconSize?: number;
  wrapperClassName?: string;
  iconClassName?: string;
  inputClassName?: string;
}
const SearchBar = ({
  value,
  onChange,
  wrapperClassName,
  iconColor = "#657786",
  iconSize,
  iconClassName,
  inputClassName,
  ...props
}: SearchBarProps) => {
  return (
    <View
      className={tailwindMerge(
        "flex-row items-center px-4 py-1 bg-gray-100 rounded-full",
        wrapperClassName
      )}
    >
      <Feather
        size={16}
        name="search"
        color={iconColor}
        className={tailwindMerge("", iconClassName)}
      />
      <TextInput
        placeholder="Search"
        className={tailwindMerge("flex-1 ml-3 text-base", inputClassName)}
        placeholderTextColor="#657786"
        {...props}
      />
    </View>
  );
};

export default SearchBar;
