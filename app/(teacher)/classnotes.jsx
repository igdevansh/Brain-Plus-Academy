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

const TeacherNotesUploader = () => {
  const router = useRouter();

  // --- State for Upload Form ---
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("Mathematics - 10A");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const availableSubjects = ["Mathematics - 10A", "Physics - 11C", "Computer Science - 9B"];

  const colors = {
    BG: "#282C34",
    CARD: "#333842",
    ACCENT: "#f49b33",
    TEXT: "#FFFFFF",
    SUB_TEXT: "#BBBBBB",
    INPUT_BORDER: "#616A7D",
    UPLOAD: "#1E88E5", // Blue for Upload
    PUBLISH: "#4CAF50", // Green for Publish
  };

  // --- File Handling Mock ---
  const handleAttachFile = () => {
    // Mocking file selection and upload progress
    const fileCount = uploadedFiles.length + 1;
    const newFile = { 
        id: Date.now().toString(), 
        name: `Lecture_${fileCount}_${selectedSubject.split(' - ')[0]} Notes.pdf`,
        size: Math.floor(Math.random() * 2) + 0.5 + ' MB' // Random size between 0.5 and 2.5 MB
    };
    setUploadedFiles(prev => [...prev, newFile]);
    Alert.alert("File Attached", `${newFile.name} is ready for publishing.`);
  };

  const handleRemoveFile = (id) => {
    setUploadedFiles(uploadedFiles.filter(file => file.id !== id));
  };

  // --- Publish Notes ---
  const handlePublish = () => {
    if (!title.trim() || uploadedFiles.length === 0) {
      Alert.alert("Error", "Please provide a title and attach at least one file.");
      return;
    }
    
    Alert.alert(
      "Confirm Publication",
      `Publish notes titled "${title}" for ${selectedSubject}? Students will receive a notification.`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Publish Now", 
          style: "default", 
          onPress: () => {
            console.log("Notes Published:", { title, selectedSubject, files: uploadedFiles });
            Alert.alert("Success", "Class notes published successfully!");
            // Reset form
            setTitle("");
            setDescription("");
            setUploadedFiles([]);
          }
        },
      ]
    );
  };
  
  // --- Render File Item ---
  const renderFileItem = ({ item }) => (
    <View 
      style={{ backgroundColor: colors.CARD, borderColor: colors.INPUT_BORDER }}
      className="flex-row justify-between items-center p-3 rounded-lg border mb-2"
    >
      <View className="flex-row items-center flex-1">
        <Ionicons name="document-text-outline" size={20} color={colors.UPLOAD} />
        <View className="ml-3 flex-1">
          <Text style={{ color: colors.TEXT }} className="text-sm font-medium" numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={{ color: colors.SUB_TEXT }} className="text-xs">
            {item.size}
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => handleRemoveFile(item.id)} className="ml-3 p-1">
        <Ionicons name="trash-outline" size={20} color={colors.SUB_TEXT} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.BG }} className="pt-8">
      <StatusBar backgroundColor={colors.BG} barStyle="light-content" />

      {/* Header */}
      <View className="px-4 pb-4 py-7 flex-row items-center">
        <Ionicons
          name="arrow-back"
          size={24}
          color={colors.TEXT}
          onPress={() => router.back()}
        />
        <Text style={{ color: colors.TEXT }} className="text-2xl font-semibold ml-4">
          Notes Uploader
        </Text>
      </View>

      <ScrollView className="flex-1 px-4">
        <Text style={{ color: colors.ACCENT }} className="text-xl font-semibold mb-4">
          Upload New Class Resources
        </Text>

        {/* Target Subject Selector */}
        <Text style={{ color: colors.SUB_TEXT }} className="text-sm mb-2">
          Select Subject/Class
        </Text>
        <TouchableOpacity 
          onPress={() => Alert.alert("Select Subject", "In a real app, this would open a subject picker.")}
          style={{ borderColor: colors.INPUT_BORDER, backgroundColor: colors.CARD }}
          className="p-3 rounded-lg border mb-4 flex-row items-center justify-between"
        >
          <Text style={{ color: colors.TEXT }} className="text-base font-semibold">
            {selectedSubject}
          </Text>
          <Ionicons name="caret-down" size={16} color={colors.SUB_TEXT} />
        </TouchableOpacity>

        {/* Notes Title Input */}
        <Text style={{ color: colors.SUB_TEXT }} className="text-sm mb-2">
          Notes Title (e.g., Chapter 5 Summary)
        </Text>
        <TextInput
          placeholder="E.g., Quantum Physics - Lecture 3"
          placeholderTextColor={colors.SUB_TEXT}
          value={title}
          onChangeText={setTitle}
          style={{ 
            backgroundColor: colors.CARD, 
            color: colors.TEXT, 
            borderColor: colors.INPUT_BORDER 
          }}
          className="p-3 rounded-lg border mb-4 text-base"
        />
        
        {/* Description Input */}
        <Text style={{ color: colors.SUB_TEXT }} className="text-sm mb-2">
          Brief Description (Optional)
        </Text>
        <TextInput
          multiline
          numberOfLines={2}
          placeholder="Key topics covered or special instructions for students."
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

        {/* File Attachments Section */}
        <Text style={{ color: colors.SUB_TEXT }} className="text-sm mb-2">
          Attached Files (PDF, PPT, DOCX)
        </Text>
        
        <FlatList
          data={uploadedFiles}
          keyExtractor={(item) => item.id}
          renderItem={renderFileItem}
          scrollEnabled={false}
          ListEmptyComponent={() => (
            <Text style={{ color: colors.SUB_TEXT }} className="text-sm italic mb-2">
              No files selected. Click &apos;Select & Upload&apos; below.
            </Text>
          )}
        />
        
        <TouchableOpacity
          onPress={handleAttachFile}
          style={{ borderColor: colors.UPLOAD }}
          className="py-3 rounded-lg items-center border border-dashed mb-6 flex-row justify-center"
        >
          <Ionicons name="cloud-upload-outline" size={20} color={colors.UPLOAD} />
          <Text style={{ color: colors.UPLOAD }} className="text-base font-bold ml-2">
            Select & Upload File
          </Text>
        </TouchableOpacity>

        {/* Publish Button */}
        <TouchableOpacity
          onPress={handlePublish}
          style={{ backgroundColor: colors.PUBLISH }}
          className="py-3 rounded-xl items-center mb-8"
        >
          <Text style={{ color: colors.BG }} className="text-lg font-bold">
            Publish Notes
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

export default TeacherNotesUploader;