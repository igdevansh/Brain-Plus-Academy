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

const ManageStudents = () => {
  const router = useRouter();

  // Mock Data
  const [students, setStudents] = useState([
    { id: "1", name: "Devansh Gupta", class: "12th", roll: "101" },
    { id: "2", name: "Amit Sharma", class: "10th", roll: "102" },
    { id: "3", name: "Priya Singh", class: "11th", roll: "103" },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState("");

  const handleAddStudent = () => {
    if (!newName.trim()) return;
    const newStudent = {
      id: Date.now().toString(),
      name: newName,
      class: "N/A",
      roll: "N/A",
    };
    setStudents([...students, newStudent]);
    setNewName("");
    setIsAdding(false);
    Alert.alert("Success", "Student added locally!");
  };

  const handleDelete = (id) => {
    Alert.alert("Confirm Delete", "Remove this student?", [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: () => setStudents(students.filter((s) => s.id !== id)),
        style: "destructive",
      },
    ]);
  };

  const renderStudent = ({ item }) => (
    <View className="bg-[#333842] p-4 rounded-xl mb-3 flex-row justify-between items-center border border-[#4C5361]">
      <View>
        <Text className="text-white font-bold text-lg">{item.name}</Text>
        <Text className="text-gray-400 text-sm">
          Class: {item.class} | Roll: {item.roll}
        </Text>
      </View>
      <TouchableOpacity onPress={() => handleDelete(item.id)} className="p-2">
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
            Students Directory
          </Text>
        </View>
        <TouchableOpacity onPress={() => setIsAdding(!isAdding)}>
          <Ionicons
            name={isAdding ? "close" : "add"}
            size={28}
            color="#f49b33"
          />
        </TouchableOpacity>
      </View>

      {/* Add Student Input Area */}
      {isAdding && (
        <View className="mx-4 mb-4 p-3 bg-[#333842] rounded-xl border border-[#f49b33]">
          <Text className="text-white mb-2">Add New Student Name</Text>
          <TextInput
            value={newName}
            onChangeText={setNewName}
            placeholder="Enter Name"
            placeholderTextColor="#888"
            className="bg-[#282C34] text-white p-3 rounded-lg border border-[#4C5361] mb-3"
          />
          <TouchableOpacity
            onPress={handleAddStudent}
            className="bg-[#f49b33] p-3 rounded-lg items-center"
          >
            <Text className="text-[#282C34] font-bold">Save Student</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* List */}
      <FlatList
        data={students}
        keyExtractor={(item) => item.id}
        renderItem={renderStudent}
        contentContainerStyle={{ padding: 16 }}
      />
    </SafeAreaView>
  );
};

export default ManageStudents;
