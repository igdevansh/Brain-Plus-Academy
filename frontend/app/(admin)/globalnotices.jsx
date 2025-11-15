import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  FlatList,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const ManageNotices = () => {
  const router = useRouter();

  // Mock Data for Notices
  const [notices, setNotices] = useState([
    {
      id: "1",
      title: "Holiday Announcement",
      content: "The academy will be closed on Monday for a public holiday.",
      date: "2025-11-14",
    },
    {
      id: "2",
      title: "Parent-Teacher Meeting",
      content: "The quarterly PTM is scheduled for next Saturday.",
      date: "2025-11-10",
    },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const handleAddNotice = () => {
    if (!newTitle.trim() || !newContent.trim()) {
      Alert.alert(
        "Error",
        "Please enter both a title and content for the notice."
      );
      return;
    }

    const newNotice = {
      id: Date.now().toString(),
      title: newTitle,
      content: newContent,
      date: new Date().toISOString().split("T")[0],
    };

    setNotices([newNotice, ...notices]);
    setNewTitle("");
    setNewContent("");
    setIsAdding(false);
    Alert.alert("Success", "Notice has been posted successfully!");
  };

  const handleDelete = (id) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this notice?",
      [
        { text: "Cancel" },
        {
          text: "Delete",
          onPress: () => setNotices(notices.filter((n) => n.id !== id)),
          style: "destructive",
        },
      ]
    );
  };

  const renderNotice = ({ item }) => (
    <View className="bg-[#333842] p-4 rounded-xl mb-3 border border-[#4C5361]">
      <View className="flex-row justify-between items-start">
        <View className="flex-1">
          <Text className="text-white font-bold text-lg">{item.title}</Text>
          <Text className="text-gray-400 text-xs mb-2">{item.date}</Text>
          <Text className="text-white">{item.content}</Text>
        </View>
        <TouchableOpacity
          onPress={() => handleDelete(item.id)}
          className="p-2 -mt-2 -mr-2"
        >
          <Ionicons name="trash-outline" size={20} color="#ef4444" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#282C34] pt-8">
      <StatusBar backgroundColor="#282C34" barStyle="light-content" />

      {/* Header */}
      <View className="px-4 pb-4 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold">Global Notices</Text>
        <TouchableOpacity onPress={() => setIsAdding(!isAdding)}>
          <Ionicons
            name={isAdding ? "close-circle" : "add-circle"}
            size={32}
            color="#f49b33"
          />
        </TouchableOpacity>
      </View>

      {/* Add Notice Form */}
      {isAdding && (
        <View className="mx-4 mb-4 p-4 bg-[#333842] rounded-xl border border-[#f49b33]">
          <Text className="text-white mb-3 font-semibold">
            Post a New Notice
          </Text>
          <TextInput
            value={newTitle}
            onChangeText={setNewTitle}
            placeholder="Notice Title"
            placeholderTextColor="#888"
            className="bg-[#282C34] text-white p-3 rounded-lg border border-[#4C5361] mb-3"
          />
          <TextInput
            value={newContent}
            onChangeText={setNewContent}
            placeholder="Notice Content..."
            placeholderTextColor="#888"
            multiline
            numberOfLines={3}
            className="bg-[#282C34] text-white p-3 rounded-lg border border-[#4C5361] mb-4 h-24"
          />
          <TouchableOpacity
            onPress={handleAddNotice}
            className="bg-[#f49b33] p-3 rounded-lg items-center"
          >
            <Text className="text-[#282C34] font-bold text-base">
              Post Notice
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Notices List */}
      <FlatList
        data={notices}
        keyExtractor={(item) => item.id}
        renderItem={renderNotice}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
        ListEmptyComponent={() => (
          <Text className="text-gray-500 text-center mt-10">
            No notices have been posted yet.
          </Text>
        )}
      />
    </SafeAreaView>
  );
};

export default ManageNotices;
