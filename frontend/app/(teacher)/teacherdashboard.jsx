import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const TeacherDashboard = () => {
  const router = useRouter();

  const theme = {
    bg: "bg-[#282C34]",
    card: "bg-[#333842]",
    accent: "text-[#f49b33]",
    accentBg: "bg-[#f49b33]",
    text: "text-white",
    subText: "text-gray-400",
    borderColor: "border-[#4C5361]",
  };

  const quickAccess = [
    {
      id: "1",
      name: "Attendance",
      icon: "checkmark-circle-outline",
      route: "/attendancescreen",
    },
    {
      id: "2",
      name: "Homework",
      icon: "book-outline",
      route: "/homeworkscreen",
    },
    {
      id: "3",
      name: "Notify Students",
      icon: "megaphone-outline",
      route: "/notifystudents",
    },
    {
      id: "4",
      name: "Submit Scores",
      icon: "ribbon-outline",
      route: "/testscores",
    },
    {
      id: "5",
      name: "View Leave",
      icon: "calendar-outline",
      route: "/applyleaves",
    },
    {
      id: "6",
      name: "Upload Notes",
      icon: "document-attach-outline",
      route: "/classnotes",
    },
  ];

  const news = [
    { id: "1", title: "Annual Sports Day", date: "10 Jul 2025" },
    { id: "2", title: "Science Exhibition", date: "20 Aug 2025" },
    { id: "3", title: "Parent-Teacher Meeting", date: "15 Sep 2025" },
    { id: "4", title: "Cultural Fest", date: "05 Oct 2025" },
  ];

  const handlePress = (item) => {
    console.log(`Navigating to: ${item.name || item.title || "Details"}`);
  };

  return (
    <SafeAreaView className={`flex-1 ${theme.bg} pt-8`}>
      <StatusBar backgroundColor="#282C34" barStyle="light-content" />

      <ScrollView className="flex-1 px-4 py-7">
        <View className="flex-row items-center mb-5">
          <View
            className={`w-14 h-14 rounded-full mr-3 items-center justify-center border-2 border-[#f49b33] ${theme.card}`}
          >
            <Text className="text-white text-xl font-bold">D</Text>
          </View>

          <View className="flex-1">
            <Text className={`${theme.text} text-lg font-bold`}>
              DEVANSH GUPTA
            </Text>
            <Text className={`${theme.subText} text-sm`}>B.Tech 3rd Year</Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              console.log("logout");
            }}
          >
            <Ionicons name="log-out-outline" size={24} color="#f49b33" />
          </TouchableOpacity>
        </View>

        <Text className={`${theme.accent} text-2xl font-bold mb-5`}>
          Welcome Back!
        </Text>

        <View className="mb-5">
          <Text className={`${theme.accent} text-lg font-semibold mb-2`}>
            Quick Access
          </Text>
          <View className="flex-row flex-wrap justify-between">
            {quickAccess.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => router.push(item.route)}
                activeOpacity={0.8}
                className={`w-[30%] ${theme.card} rounded-xl py-5 items-center mb-3`}
              >
                <Ionicons name={item.icon} size={26} color="#f49b33" />
                <Text className={`${theme.text} mt-2 text-xs text-center`}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View className="mb-8">
          <Text className={`${theme.accent} text-lg font-semibold mb-2`}>
            Coaching/Class Updates
          </Text>
          {news.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => handlePress(item)}
              activeOpacity={0.8}
              className={`${theme.card} rounded-lg p-4 mb-3`}
            >
              <Text className={`${theme.text} text-base font-semibold`}>
                {item.title}
              </Text>
              <Text className={`${theme.subText} text-sm`}>{item.date}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TeacherDashboard;
