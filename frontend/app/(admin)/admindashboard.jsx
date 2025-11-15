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

const AdminDashboard = () => {
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

  // Quick stats for the dashboard
  const stats = [
    { title: "Total Students", count: "120", icon: "people" },
    { title: "Total Teachers", count: "12", icon: "school" },
  ];

  const adminActions = [
    {
      id: "1",
      name: "Manage Students",
      icon: "person-add-outline",
      route: "/(admin)/managestudents",
    },
    {
      id: "2",
      name: "Manage Teachers",
      icon: "briefcase-outline",
      route: "/(admin)/manageteachers",
    },
    {
      id: "3",
      name: "Fee Reports",
      icon: "stats-chart-outline",
      route: "/(admin)/feereports",
    },
    {
      id: "4",
      name: "Global Notices",
      icon: "megaphone-outline",
      route: "/(admin)/globalnotices",
    },
  ];

  return (
    <SafeAreaView className={`flex-1 ${theme.bg} pt-8`}>
      <StatusBar backgroundColor="#282C34" barStyle="light-content" />

      <ScrollView className="flex-1 px-4 py-7">
        {/* Header */}
        <View className="flex-row items-center justify-center mb-6">
          <View
            className={`w-10 h-10 rounded-full ${theme.accentBg} items-center justify-center`}
          >
            <Text className="text-black font-bold text-lg">A</Text>
          </View>
          <View>
            <Text className={`${theme.text} text-2xl font-bold px-4`}>
              Admin Panel
            </Text>
            <Text className={`${theme.subText} text-sm px-4`}>
              Brain Plus Academy
            </Text>
          </View>

        </View>

        {/* Stats Grid */}
        <View className="flex-row flex-wrap justify-between mb-6">
          {stats.map((stat, index) => (
            <View
              key={index}
              className={`w-[48%] ${theme.card} p-4 rounded-xl items-center justify-center border border-[#4C5361] mb-4`}
            >
              <Ionicons name={stat.icon} size={24} color="#f49b33" />
              <Text className={`${theme.text} text-lg font-bold mt-1`}>
                {stat.count}
              </Text>
              <Text className={`${theme.subText} text-[10px] text-center`}>
                {stat.title}
              </Text>
            </View>
          ))}
        </View>

        <Text className={`${theme.accent} text-xl font-semibold mb-4 mt-2`}>
          Administration
        </Text>

        {/* Action Menu */}
        <View className="flex-row flex-wrap justify-between">
          {adminActions.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => item.route && router.push(item.route)}
              activeOpacity={0.8}
              className={`w-[48%] ${theme.card} rounded-xl p-5 items-center mb-4 border border-[#4C5361]`}
            >
              <Ionicons name={item.icon} size={32} color="#f49b33" />
              <Text className={`${theme.text} mt-3 text-sm font-semibold`}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button (Mock) */}
        <TouchableOpacity
          onPress={() => router.replace("/")}
          className="mt-4 bg-red-500/20 border border-red-500 p-4 rounded-xl flex-row justify-center items-center"
        >
          <Ionicons name="log-out-outline" size={20} color="#ef4444" />
          <Text className="text-red-500 font-bold ml-2">Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AdminDashboard;
