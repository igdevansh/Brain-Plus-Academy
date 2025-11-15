import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const ManageTeachers = () => {
  const router = useRouter();

  // Mock Data for Teachers
  const [teachers, setTeachers] = useState([
    {
      id: "1",
      name: "Mr. R.K. Verma",
      subject: "Mathematics",
      experience: "10 Yrs",
    },
    {
      id: "2",
      name: "Ms. Anjali Mehta",
      subject: "Physics",
      experience: "8 Yrs",
    },
    {
      id: "3",
      name: "Mr. Suresh Raina",
      subject: "Physical Education",
      experience: "5 Yrs",
    },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newName, RPName] = useState("");
  const [newSubject, setNewSubject] = useState("");

  const handleAddTeacher = () => {
    if (!newName.trim() || !newSubject.trim()) {
      Alert.alert("Error", "Please enter both Name and Subject.");
      return;
    }

    const newTeacher = {
      id: Date.now().toString(),
      name: newName,
      subject: newSubject,
      experience: "0 Yrs", // Default for new entries
    };

    setTeachers([...teachers, newTeacher]);
    setNewName("");
    setNewSubject("");
    setIsAdding(false);
    Alert.alert("Success", "Teacher added successfully!");
  };

  const handleDelete = (id) => {
    Alert.alert("Confirm Delete", "Remove this teacher from the academy?", [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: () => setTeachers(teachers.filter((t) => t.id !== id)),
        style: "destructive",
      },
    ]);
  };

  const renderTeacher = ({ item }) => (
    <View className="bg-[#333842] p-4 rounded-xl mb-3 flex-row justify-between items-center border border-[#4C5361] shadow-md shadow-black/20">
      <View className="flex-1">
        <Text className="text-white font-bold text-lg">{item.name}</Text>
        <View className="flex-row items-center mt-1">
          <View className="bg-[#f49b33]/20 px-2 py-0.5 rounded mr-2">
            <Text className="text-[#f49b33] text-xs font-bold">
              {item.subject}
            </Text>
          </View>
          <Text className="text-gray-400 text-xs">Exp: {item.experience}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => handleDelete(item.id)}
        className="p-2 bg-red-500/10 rounded-lg"
      >
        <Ionicons name="trash-outline" size={20} color="#ef4444" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#282C34] pt-8">
      <StatusBar backgroundColor="#282C34" barStyle="light-content" />

      {/* Header */}
      <View className="px-4 pb-4 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <Ionicons
            name="arrow-back"
            size={24}
            color="white"
            onPress={() => router.back()}
          />
          <Text className="text-white text-xl font-bold ml-4">
            Teachers Faculty
          </Text>
        </View>
        <TouchableOpacity onPress={() => setIsAdding(!isAdding)}>
          <Ionicons
            name={isAdding ? "close-circle" : "add-circle"}
            size={32}
            color="#f49b33"
          />
        </TouchableOpacity>
      </View>

      {/* Add Teacher Input Area */}
      {isAdding && (
        <View className="mx-4 mb-4 p-4 bg-[#333842] rounded-xl border border-[#f49b33]">
          <Text className="text-white mb-3 font-semibold">
            Register New Faculty
          </Text>

          <TextInput
            value={newName} // Corrected from RPName to setNewName
            onChangeText={RPName}
            placeholder="Teacher's Name"
            placeholderTextColor="#888"
            className="bg-[#282C34] text-white p-3 rounded-lg border border-[#4C5361] mb-3"
          />

          <TextInput
            value={newSubject}
            onChangeText={setNewSubject}
            placeholder="Subject (e.g. Chemistry)"
            placeholderTextColor="#888"
            className="bg-[#282C34] text-white p-3 rounded-lg border border-[#4C5361] mb-4"
          />

          <TouchableOpacity
            onPress={handleAddTeacher}
            className="bg-[#f49b33] p-3 rounded-lg items-center"
          >
            <Text className="text-[#282C34] font-bold text-base">
              Save Teacher
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* List */}
      <FlatList
        data={teachers}
        keyExtractor={(item) => item.id}
        renderItem={renderTeacher}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        ListEmptyComponent={() => (
          <Text className="text-gray-500 text-center mt-10">
            No teachers found.
          </Text>
        )}
      />
    </SafeAreaView>
  );
};

export default ManageTeachers;
