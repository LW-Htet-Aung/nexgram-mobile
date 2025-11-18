import {
  Alert,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { CONVERSATIONS, ConversationType } from "@/datas/conversation";
import { Feather } from "@expo/vector-icons";
import SearchBar from "@/components/search-bar";
import { tailwindMerge } from "@/libs/utils";

type Props = {};

const MessagesScreen = (props: Props) => {
  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = useState("");
  const [conversationsList, setConversationsList] = useState(CONVERSATIONS);
  const [selectedConversation, setSelectedConversation] =
    useState<ConversationType | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  const deleteConversation = (conversationId: number) => {
    Alert.alert(
      "Delete Conversation",
      "Are you sure you want to delete this conversation?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setConversationsList((prev) =>
              prev.filter((conv) => conv.id !== conversationId)
            );
          },
        },
      ]
    );
  };
  const openConversation = (conversation: ConversationType) => {
    setSelectedConversation(conversation);
    setIsChatOpen(true);
  };
  const closeConversationModel = () => {
    setIsChatOpen(false);
    setSelectedConversation(null);
    setNewMessage("");
  };

  const sendMessage = () => {
    if (!newMessage.trim() && selectedConversation) {
      setConversationsList((prev) =>
        prev.map((conv) =>
          conv.id === selectedConversation.id
            ? { ...conv, lastMessage: newMessage, time: "now" }
            : conv
        )
      );
    }
    setNewMessage("");
    Alert.alert(
      "Message sent",
      `Your message have been sent to ${selectedConversation?.user?.name}`
    );
  };
  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      {/* Header  */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100">
        <Text className="text-xl font-bold text-gray-900">Messages</Text>
        <TouchableOpacity>
          <Feather size={24} color="#1DA1f2" name="edit" />
        </TouchableOpacity>
      </View>
      {/* Search Bar */}
      <View className="px-4 py-3 border-b border-gray-100">
        <SearchBar
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search for people and group"
        />
      </View>
      {/* Conversation */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100 + insets.bottom,
        }}
      >
        {conversationsList.map((item) => (
          <TouchableOpacity
            activeOpacity={1}
            key={item.id}
            className="flex-row items-center p-4 border-b border-gray-50 active:bg-gray-50"
            onPress={() => openConversation(item)}
            onLongPress={() => deleteConversation(item.id)}
          >
            <Image
              className="mr-3 rounded-full size-12"
              source={{ uri: item.user.avatar }}
            />
            <View className="flex-1">
              <View className="flex-row items-center justify-between gap-2 mb-1">
                <View className="flex-row items-center gap-1">
                  <Text className="font-semibold text-gray-900">
                    {item.user.name}
                  </Text>
                  {item.user.verified && (
                    <Feather
                      name="check-circle"
                      size={16}
                      color="#1DA1F2"
                      className="ml-1"
                    />
                  )}
                  <Text className="ml-1 text-sm text-gray-500">
                    @{item.user.username}
                  </Text>
                </View>
                <Text className="text-sm text-gray-500">{item.time}</Text>
              </View>
              <Text className="text-sm text-gray-500" numberOfLines={1}>
                {item.lastMessage}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {/* Quick Actioon */}
      <View className="px-4 py-2 border-gray-100 boorder-t bg-gray-50">
        <Text className="text-xs text-center text-gray-500 ">
          Tap to open * Long press to delete
        </Text>
      </View>

      <Modal
        animationType="slide"
        presentationStyle="pageSheet"
        visible={isChatOpen}
        onDismiss={closeConversationModel}
      >
        {selectedConversation && (
          <>
            <SafeAreaView className="flex-1">
              <View className="flex-row items-center px-4 py-3 border-b border-gray-100">
                {/* Chat Header */}
                <TouchableOpacity
                  onPress={closeConversationModel}
                  className="mr-3"
                >
                  <Feather name="arrow-left" size={24} color="#1DA1F2" />
                </TouchableOpacity>
                <Image
                  source={{ uri: selectedConversation.user.avatar }}
                  className="mr-3 rounded-full size-10"
                />
                <View className="flex-1">
                  <View className="flex-row items-center">
                    <Text className="mr-1 font-semibold text-gray-900">
                      {selectedConversation.user.name}
                    </Text>
                    {selectedConversation.user.verified && (
                      <Feather name="check-circle" size={16} color="#1DA1F2" />
                    )}
                  </View>
                  <Text className="text-sm text-gray-500">
                    @{selectedConversation.user.username}
                  </Text>
                </View>
              </View>

              {/* Chat Body */}
              <ScrollView className="flex-1 p-4">
                <View className="mb-4">
                  <Text className="mb-4 text-sm text-center text-gray-400">
                    This is the beginning of the conversation with{" "}
                    {selectedConversation.user.name}
                  </Text>

                  {/* Conversation Messages */}
                  {selectedConversation.messages.map((message, index) => (
                    <View
                      key={message.id}
                      className={tailwindMerge(
                        "flex-row mb-3",
                        message.fromUser && "justify-end"
                      )}
                    >
                      {!message.fromUser && (
                        <Image
                          source={{ uri: selectedConversation.user.avatar }}
                          className="mr-3 rounded-full size-10"
                        />
                      )}
                      <View
                        className={tailwindMerge(
                          "flex-1",
                          message.fromUser && "items-end"
                        )}
                      >
                        <View
                          className={tailwindMerge(
                            "rounded-2xl px-4 py-3 max-w-xs",
                            message.fromUser ? "bg-blue-500" : "bg-gray-100"
                          )}
                        >
                          <Text
                            className={
                              message.fromUser ? "text-white" : "text-gray-900"
                            }
                          >
                            {message.text}
                          </Text>
                        </View>
                        <Text className="mt-1 text-xs text-gray-400">
                          {message.time}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </ScrollView>

              {/* Message Input */}
              <View className="flex-row items-center px-4 py-3 border-b border-gray-100">
                <View className="flex-row items-center flex-1 px-4 py-2 mr-3 bg-gray-100 rounded-full">
                  <TextInput
                    className="flex-1 text-base"
                    placeholder="Start a message..."
                    placeholderTextColor="#657786"
                    value={newMessage}
                    onChangeText={setNewMessage}
                    multiline
                  />
                </View>
                <TouchableOpacity
                  onPress={sendMessage}
                  className={tailwindMerge(
                    "size-12 rounded-full items-center justify-center",
                    newMessage.trim() ? "bg-blue-500" : "bg-gray-300"
                  )}
                  disabled={!newMessage.trim()}
                >
                  <Feather name="send" size={20} color={"#fff"} />
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </>
        )}
      </Modal>
    </SafeAreaView>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({});
