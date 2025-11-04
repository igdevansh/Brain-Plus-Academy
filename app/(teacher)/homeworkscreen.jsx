import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  Platform,
  FlatList,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";

const TeacherHomeworkCreator = () => {
  const router = useRouter();

  // --- State for Assignment Form ---
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedClass, setSelectedClass] = useState("10A - Mathematics");
  const [dueDate, setDueDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [attachments, setAttachments] = useState([]);

  const colors = {
    BG: "#282C34",
    CARD: "#333842",
    ACCENT: "#f49b33",
    TEXT: "#FFFFFF",
    SUB_TEXT: "#BBBBBB",
    INPUT_BORDER: "#616A7D",
    ATTACHMENT: "#1E88E5", // Blue for file actions
  };

  // --- Utility Functions ---
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || dueDate;
    setShowDatePicker(Platform.OS === "ios");
    setDueDate(currentDate);
  };

  const showDate = () => {
    setShowDatePicker(true);
  };

  // --- File Handling Mock ---
  const handleAttachFile = () => {
    // Mocking file selection
    const newFile = {
      id: Date.now().toString(),
      name: `Worksheet_${attachments.length + 1}.pdf`,
      size: "500 KB",
    };
    setAttachments([...attachments, newFile]);
    Alert.alert("Attachment Added", newFile.name);
  };

  const handleRemoveAttachment = (id) => {
    setAttachments(attachments.filter((att) => att.id !== id));
  };

  // --- Submit Assignment ---
  const handlePublish = () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert(
        "Error",
        "Please provide a title and description for the assignment."
      );
      return;
    }

    Alert.alert(
      "Confirm Publish",
      `Publish assignment titled "${title}" for ${selectedClass}, due on ${formatDate(dueDate)}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Publish",
          style: "default",
          onPress: () => {
            console.log("Assignment Published:", {
              title,
              description,
              selectedClass,
              dueDate: formatDate(dueDate),
              attachments,
            });
            Alert.alert("Success", "Assignment published successfully!");
            // Reset form
            setTitle("");
            setDescription("");
            setDueDate(new Date());
            setAttachments([]);
          },
        },
      ]
    );
  };

  // --- Render Attachment Item ---
  const renderAttachmentItem = ({ item }) => (
    <View
      style={{ backgroundColor: colors.CARD, borderColor: colors.INPUT_BORDER }}
      className="flex-row justify-between items-center p-3 rounded-lg border mb-2"
    >
      <View className="flex-row items-center flex-1">
        <Ionicons
          name="document-attach-outline"
          size={20}
          color={colors.ATTACHMENT}
        />
        <View className="ml-3 flex-1">
          <Text
            style={{ color: colors.TEXT }}
            className="text-sm font-medium"
            numberOfLines={1}
          >
            {item.name}
          </Text>
          <Text style={{ color: colors.SUB_TEXT }} className="text-xs">
            {item.size}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => handleRemoveAttachment(item.id)}
        className="ml-3"
      >
        <Ionicons name="close-circle" size={24} color={colors.SUB_TEXT} />
      </TouchableOpacity>
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
          Assignment Creator
        </Text>
      </View>

      <ScrollView className="flex-1 px-4">
        <Text
          style={{ color: colors.ACCENT }}
          className="text-xl font-semibold mb-4"
        >
          Publish New Homework
        </Text>

        {/* Target Subject Selector */}
        <Text style={{ color: colors.SUB_TEXT }} className="text-sm mb-2">
          Target Subject
        </Text>
        <TouchableOpacity
          onPress={() =>
            Alert.alert(
              "Select Class",
              "In a real app, this would open a class picker."
            )
          }
          style={{
            borderColor: colors.INPUT_BORDER,
            backgroundColor: colors.CARD,
          }}
          className="p-3 rounded-lg border mb-4 flex-row items-center justify-between"
        >
          <Text
            style={{ color: colors.TEXT }}
            className="text-base font-semibold"
          >
            {selectedClass}
          </Text>
          <Ionicons name="caret-down" size={16} color={colors.SUB_TEXT} />
        </TouchableOpacity>

        {/* Assignment Title Input */}
        <Text style={{ color: colors.SUB_TEXT }} className="text-sm mb-2">
          Assignment Title
        </Text>
        <TextInput
          placeholder="E.g., Chapter 4 Review Questions"
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

        {/* Description Input */}
        <Text style={{ color: colors.SUB_TEXT }} className="text-sm mb-2">
          Instructions / Description
        </Text>
        <TextInput
          multiline
          numberOfLines={4}
          placeholder="Detailed instructions for students (Mandatory)"
          placeholderTextColor={colors.SUB_TEXT}
          value={description}
          onChangeText={setDescription}
          style={{
            backgroundColor: colors.CARD,
            color: colors.TEXT,
            borderColor: colors.INPUT_BORDER,
            textAlignVertical: "top",
          }}
          className="p-3 rounded-lg border mb-4 text-base"
        />

        {/* Due Date Picker */}
        <Text style={{ color: colors.SUB_TEXT }} className="text-sm mb-2">
          Due Date
        </Text>
        <TouchableOpacity
          onPress={showDate}
          style={{
            borderColor: colors.INPUT_BORDER,
            backgroundColor: colors.CARD,
          }}
          className="flex-row items-center justify-between p-3 rounded-lg border mb-4"
        >
          <Text style={{ color: colors.TEXT }} className="text-base">
            {formatDate(dueDate)}
          </Text>
          <Ionicons name="calendar-outline" size={20} color={colors.SUB_TEXT} />
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            testID="datePicker"
            value={dueDate}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}

        {/* Attachments Section */}
        <Text style={{ color: colors.SUB_TEXT }} className="text-sm mb-2">
          Attachments (Worksheets, PDFs)
        </Text>

        <FlatList
          data={attachments}
          keyExtractor={(item) => item.id}
          renderItem={renderAttachmentItem}
          scrollEnabled={false}
          ListEmptyComponent={() => (
            <Text
              style={{ color: colors.SUB_TEXT }}
              className="text-sm italic mb-2"
            >
              No files attached.
            </Text>
          )}
        />

        <TouchableOpacity
          onPress={handleAttachFile}
          style={{ borderColor: colors.ATTACHMENT }}
          className="py-3 rounded-lg items-center border border-dashed mb-6 flex-row justify-center"
        >
          <Ionicons
            name="cloud-upload-outline"
            size={20}
            color={colors.ATTACHMENT}
          />
          <Text
            style={{ color: colors.ATTACHMENT }}
            className="text-base font-bold ml-2"
          >
            Upload File
          </Text>
        </TouchableOpacity>

        {/* Publish Button */}
        <TouchableOpacity
          onPress={handlePublish}
          style={{ backgroundColor: colors.ACCENT }}
          className="py-3 rounded-xl items-center mb-8"
        >
          <Text style={{ color: colors.BG }} className="text-lg font-bold">
            Publish Assignment
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TeacherHomeworkCreator;
