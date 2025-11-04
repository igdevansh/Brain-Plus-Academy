import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const StudentHomework = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Not Completed");

  const colors = {
    bg: "#282C34",
    card: "#333842",
    accent: "#f49b33",
    text: "#FFFFFF",
    subText: "#BBBBBB",
    completed: "#4CAF50", 
    notCompleted: "#F44336", 
    softCard: "#4C5361",
  };

  const homeworkData = [
    {
      id: "1",
      subject: "Mathematics",
      title: "Differential Equations, Chapter 3",
      status: "Not Completed", 
    },
    {
      id: "2",
      subject: "Computer Science",
      title: "React Native: Props & State Exercise",
      status: "Not Completed",
    },
    {
      id: "3",
      subject: "Physics",
      title: "Quantum Mechanics Reading Summary",
      status: "Completed", 
    },
    {
      id: "4",
      subject: "Communication Skills",
      title: "Write a Formal Leave Application",
      status: "Not Completed",
    },
    {
      id: "5",
      subject: "Mathematics",
      title: "Complex Numbers Test Review",
      status: "Completed",
    },
  ];

  const filteredHomework = homeworkData.filter((item) =>
    activeTab === "Not Completed"
      ? item.status === "Not Completed"
      : item.status === "Completed"
  );

  const notCompletedCount = homeworkData.filter(
    (h) => h.status === "Not Completed"
  ).length;
  const completedCount = homeworkData.filter(
    (h) => h.status === "Completed"
  ).length;

  const handleHomeworkPress = (item) => {
    console.log(`Viewing details for: ${item.title}`);
  };

  const renderItem = ({ item }) => {
    const isNotCompleted = item.status === "Not Completed";
    const statusColor = isNotCompleted ? colors.notCompleted : colors.completed;

    return (
      <TouchableOpacity
        onPress={() => handleHomeworkPress(item)}
        activeOpacity={0.8}
        className={`p-4 rounded-xl mb-3 ${colors.card} flex-row items-center`}
        style={{ backgroundColor: colors.card }}
      >
        <View className="flex-1">
          <View className="flex-row items-center mb-1 justify-between">
            <View className="flex-row items-center flex-1 pr-2">
              <Ionicons
                name={isNotCompleted ? "close-circle" : "checkmark-circle"}
                size={20}
                color={statusColor}
                className="mr-3"
              />
              <Text
                style={{ color: colors.text }}
                className="text-base font-semibold flex-1"
              >
                {item.title}
              </Text>
            </View>

            <Text style={{ color: statusColor }} className="text-sm font-bold">
              {isNotCompleted ? "Not Done" : "Completed"}
            </Text>
          </View>

          <Text
            style={{ color: colors.subText }}
            className="text-sm mt-1 ml-7" 
          >
            {item.subject}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.bg }}
      className="pt-8"
    >
      <StatusBar backgroundColor={colors.bg} barStyle="light-content" />

      <View className="px-4 pb-4 py-7 flex-row items-center">
        <Ionicons
          name="arrow-back"
          size={24}
          color={colors.text}
          onPress={() => router.back()}
        />
        <Text
          style={{ color: colors.text }}
          className="text-2xl font-semibold ml-4"
        >
          Homework Assignments
        </Text>
      </View>

      <View
        className="flex-row mx-4 mb-4 p-1 rounded-xl"
        style={{ backgroundColor: colors.softCard }}
      >
        <TouchableOpacity
          onPress={() => setActiveTab("Not Completed")}
          className={`flex-1 items-center py-2 rounded-lg ${activeTab === "Not Completed" ? `bg-[${colors.accent}]` : "bg-transparent"}`}
        >
          <Text
            style={{
              color: activeTab === "Not Completed" ? colors.bg : colors.text,
            }}
            className="font-bold"
          >
            Not Completed ({notCompletedCount})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab("Completed")}
          className={`flex-1 items-center py-2 rounded-lg ${activeTab === "Completed" ? `bg-[${colors.accent}]` : "bg-transparent"}`}
        >
          <Text
            style={{
              color: activeTab === "Completed" ? colors.bg : colors.text,
            }}
            className="font-bold"
          >
            Completed ({completedCount})
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredHomework}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
        ListEmptyComponent={() => (
          <View
            className="p-10 items-center justify-center"
            style={{ backgroundColor: colors.card, borderRadius: 12 }}
          >
            <Ionicons
              name="checkmark-circle-outline"
              size={32}
              color={colors.accent}
            />
            <Text
              style={{ color: colors.text }}
              className="mt-4 text-lg font-semibold"
            >
              All Assignments {activeTab === "Completed" ? "Logged" : "Done"}!
            </Text>
            <Text
              style={{ color: colors.subText }}
              className="mt-1 text-sm text-center"
            >
              Keep up the great work.
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default StudentHomework;
