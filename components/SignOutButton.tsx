import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { tailwindMerge } from "@/libs/utils";
interface SignOutButtonProps extends TouchableOpacityProps {
  loading: boolean;
  title?: string;
  className?: string;
  iconClassName?: string;
}
const SignOutButton = ({
  loading,
  title = "Logout",
  className,
  iconClassName,
  ...props
}: SignOutButtonProps) => {
  return (
    <TouchableOpacity disabled={loading} {...props}>
      {loading && (
        <>
          <Feather className="animate-spin" size={16} name="loader" />
          <Text>Loading</Text>
        </>
      )}
      <Feather
        name="log-out"
        size={24}
        color={"#E024SE"}
        className={tailwindMerge("", iconClassName)}
      >
        {title}
      </Feather>
    </TouchableOpacity>
  );
};

export default SignOutButton;

const styles = StyleSheet.create({});
