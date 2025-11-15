import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  Alert,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const TeacherClassUpdates = () => {
  const router = useRouter();

  // --- State for the Notification Form ---
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  // Mock history. Since recipients are global now, we reflect that in the mock data.
  const [history, setHistory] = useState([
    {
      id: "1",
      title: "Math 10A Syllabus Change",
      date: "06-11-2025",
      message:
        "We are moving Chapter 5 forward. Please check the new schedule. This update is visible to all students.",
    },
    {
      id: "2",
      title: "Physics Lab Equipment Arrived",
      date: "05-11-2025",
      message:
        "The new oscilloscopes are ready for use. All relevant class students have been notified.",
    },
  ]);

  const colors = {
    BG: "#282C34",
    CARD: "#333842",
    ACCENT: "#f49b33",
    TEXT: "#FFFFFF",
    SUB_TEXT: "#BBBBBB",
    INPUT_BORDER: "#616A7D",
    SEND: "#4CAF50", // Green for Send
  };

  // --- Submit Notification ---
  const handleSendNotification = () => {
    if (!title.trim() || !message.trim()) {
      Alert.alert(
        "Error",
        "Title and message content are required for the announcement."
      );
      return;
    }

    Alert.alert(
      "Confirm Global Broadcast",
      `Send "${title}" as a new Class Update to ALL your associated students?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Send",
          style: "default",
          onPress: () => {
            // Mock adding to history
            const newUpdate = {
              id: Date.now().toString(),
              title: title,
              date: new Date().toLocaleDateString("en-GB").replace(/\//g, "-"), // DD-MM-YYYY
              message: message,
            };
            setHistory([newUpdate, ...history]);

            Alert.alert("Success", "Global update broadcasted successfully!");
            // Reset form
            setTitle("");
            setMessage("");
          },
        },
      ]
    );
  };

  // --- Render History Item ---
  const renderHistoryItem = ({ item }) => (
    <View
      style={{ backgroundColor: colors.CARD, borderLeftColor: colors.SEND }}
      className="p-4 rounded-xl mb-3 border-l-4"
    >
      <View className="flex-row justify-between items-start">
        <View className="flex-1 pr-3">
          <Text
            style={{ color: colors.TEXT }}
            className="text-base font-semibold mb-1"
          >
            {item.title}
          </Text>
          <Text
            style={{ color: colors.SUB_TEXT }}
            className="text-xs italic mb-2"
          >
          </Text>
          <Text style={{ color: colors.TEXT }} className="text-sm">
            {item.message}
          </Text>
        </View>
      </View>
      <Text
        style={{ color: colors.SUB_TEXT }}
        className="text-xs text-right mt-2"
      >
        Sent: {item.date}
      </Text>
    </View>
  );

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.BG }}
      className="pt-8"
    >
      <StatusBar backgroundColor={colors.BG} barStyle="light-content" />

      {/* Header */}
      <View className="px-4 pb-4 py-7 flex-row items-center">
        <Ionicons
          name="arrow-back"
          size={24}
          color={colors.TEXT}
          onPress={() => router.back()}
        />
        <Text
          style={{ color: colors.TEXT }}
          className="text-2xl font-semibold ml-4"
        >
          Notify Students
        </Text>
      </View>

      <ScrollView className="flex-1 px-4">
        <Text
          style={{ color: colors.ACCENT }}
          className="text-xl font-semibold mb-4"
        >
          Broadcast New Update
        </Text>

        {/* Note on Recipient Scope */}
        <View
          style={{ backgroundColor: colors.CARD, borderColor: colors.ACCENT }}
          className="p-3 rounded-lg border mb-4"
        >
          <Text
            style={{ color: colors.TEXT }}
            className="text-sm font-semibold mb-1"
          >
            Scope: All associated students will receive this update.
          </Text>
        </View>

        {/* Title Input */}
        <Text style={{ color: colors.SUB_TEXT }} className="text-sm mb-2">
          Title (Short Summary)
        </Text>
        <TextInput
          placeholder="E.g. Class Reschedule"
          placeholderTextColor={colors.SUB_TEXT}
          value={title}
          onChangeText={setTitle}
          style={{
            backgroundColor: colors.CARD,
            color: colors.TEXT,
            borderColor: colors.INPUT_BORDER,
          }}
          className="p-3 rounded-lg border mb-4 text-base"
        />

        {/* Message Input */}
        <Text style={{ color: colors.SUB_TEXT }} className="text-sm mb-2">
          Detailed Message
        </Text>
        <TextInput
          multiline
          numberOfLines={4}
          placeholder="Type your announcement details here..."
          placeholderTextColor={colors.SUB_TEXT}
          value={message}
          onChangeText={setMessage}
          style={{
            backgroundColor: colors.CARD,
            color: colors.TEXT,
            borderColor: colors.INPUT_BORDER,
            textAlignVertical: "top",
          }}
          className="p-3 rounded-lg border mb-6 text-base"
        />

        {/* Send Button */}
        <TouchableOpacity
          onPress={handleSendNotification}
          style={{ backgroundColor: colors.SEND }}
          className="py-3 rounded-xl items-center mb-8"
        >
          <Text style={{ color: colors.BG }} className="text-lg font-bold">
            Send Update Globally
          </Text>
        </TouchableOpacity>

        {/* History Section */}
        <Text
          style={{ color: colors.ACCENT }}
          className="text-xl font-semibold mb-4"
        >
          Broadcast History
        </Text>
        <FlatList
          data={history}
          keyExtractor={(item) => item.id}
          renderItem={renderHistoryItem}
          scrollEnabled={false}
          ListEmptyComponent={() => (
            <View
              className="p-6 items-center justify-center"
              style={{ backgroundColor: colors.CARD, borderRadius: 12 }}
            >
              <Text
                style={{ color: colors.SUB_TEXT }}
                className="mt-1 text-sm text-center"
              >
                No previous notifications sent.
              </Text>
            </View>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default TeacherClassUpdates;
