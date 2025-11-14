import {
  StyleSheet,
  Text,
  TextInput,
  TextInputComponent,
  View,
} from "react-native";
import React from "react";

type Props = {};

const EmailLogin = (props: Props) => {
  return (
    <View className="my-4">
      <TextInput className="border rounded border-slate-400 color-slate-900" onChange={(e) => console.log(e.target)} />
    </View>
  );
};

export default EmailLogin;

const styles = StyleSheet.create({});
