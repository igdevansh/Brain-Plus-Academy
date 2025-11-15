import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const StudentFees = () => {
  const router = useRouter();

  const colors = {
    bg: "#282C34",
    card: "#333842",
    accent: "#f49b33",
    text: "#FFFFFF",
    subText: "#BBBBBB",
    dueRed: "#F44336", 
    paidGreen: "#4CAF50", 
    softCard: "#4C5361",
  };

  const dueFeesData = [
    {
      id: "1",
      title: "Semester Tuition Fee",
      amount: "₹19,200",
      dueDate: "Due 15 Nov 2025",
      isOverdue: false,
    },
    {
      id: "2",
      title: "Exam Registration Fee",
      amount: "₹1,500",
      dueDate: "Overdue (30 Sep 2025)",
      isOverdue: true,
    },
  ];

  const historyFeesData = [
    {
      id: "3",
      title: "Bus Fee (Q3)",
      amount: "₹8,000",
      paidDate: "Paid 10 Sep 2025",
    },
    {
      id: "4",
      title: "Library Security Deposit",
      amount: "₹2,000",
      paidDate: "Paid 20 Aug 2025",
    },
    {
      id: "5",
      title: "Previous Semester Fee",
      amount: "₹18,000",
      paidDate: "Paid 15 Apr 2025",
    },
  ];

  const handlePayNow = (fee) => {
    console.log(`Initiating payment for: ${fee.title}`);
  };

  const handleViewDetails = (fee) => {
    console.log(`Viewing details for: ${fee.title}`);
  };

  const renderDueFee = ({ item }) => (
    <View
      key={item.id}
      style={{ backgroundColor: colors.card, borderColor: colors.softCard }}
      className={`p-4 rounded-xl mb-3 border border-1 ${item.isOverdue ? `border-[${colors.dueRed}]` : ""}`}
    >
      <View className="flex-row justify-between items-start">
        <View className="flex-1 pr-3">
          <Text
            style={{ color: colors.text }}
            className="text-lg font-semibold"
          >
            {item.title}
          </Text>
          <Text
            style={{ color: item.isOverdue ? colors.dueRed : colors.accent }}
            className="text-2xl font-bold mt-1"
          >
            {item.amount}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => handlePayNow(item)}
          style={{ backgroundColor: colors.accent }}
          className="rounded-lg px-4 py-2 self-start"
        >
          <Text style={{ color: colors.bg }} className="font-bold text-sm">
            Pay Now
          </Text>
        </TouchableOpacity>
      </View>

      <Text
        style={{ color: item.isOverdue ? colors.dueRed : colors.subText }}
        className="text-sm mt-3 pt-2 border-t border-[#4C5361]"
      >
        {item.dueDate}
      </Text>

      {item.isOverdue && (
        <Text
          style={{ color: colors.dueRed }}
          className="text-xs font-semibold mt-1"
        >
          Action Required: This payment is overdue.
        </Text>
      )}
    </View>
  );

  const renderHistoryFee = ({ item }) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => handleViewDetails(item)}
      activeOpacity={0.8}
      style={{ backgroundColor: colors.card, borderColor: colors.softCard }}
      className="p-4 rounded-xl mb-3 flex-row justify-between items-center border border-1"
    >
      <View>
        <Text
          style={{ color: colors.text }}
          className="text-base font-semibold"
        >
          {item.title}
        </Text>
        <Text style={{ color: colors.subText }} className="text-sm">
          {item.paidDate}
        </Text>
      </View>

      <View className="items-end">
        <Text style={{ color: colors.paidGreen }} className="text-lg font-bold">
          {item.amount}
        </Text>
        <View className="flex-row items-center mt-1">
        </View>
      </View>
    </TouchableOpacity>
  );

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
          Fees & Payments
        </Text>
      </View>

      <ScrollView className="flex-1 px-4">

        <View className="mb-6">
          <Text
            style={{ color: colors.accent }}
            className="text-xl font-semibold mb-3"
          >
            Upcoming Payments
          </Text>
          <FlatList
            data={dueFeesData}
            keyExtractor={(item) => item.id}
            renderItem={renderDueFee}
            scrollEnabled={false}
            ListEmptyComponent={() => (
              <View
                className="p-5 items-center justify-center"
                style={{ backgroundColor: colors.card, borderRadius: 12 }}
              >
                <Ionicons
                  name="wallet-outline"
                  size={32}
                  color={colors.paidGreen}
                />
                <Text
                  style={{ color: colors.text }}
                  className="mt-4 text-lg font-semibold"
                >
                  No Payments Due!
                </Text>
                <Text
                  style={{ color: colors.subText }}
                  className="mt-1 text-sm text-center"
                >
                  Your account is clear.
                </Text>
              </View>
            )}
          />
        </View>

        <View className="mb-8">
          <Text
            style={{ color: colors.accent }}
            className="text-xl font-semibold mb-3"
          >
            Payment History
          </Text>
          <FlatList
            data={historyFeesData}
            keyExtractor={(item) => item.id}
            renderItem={renderHistoryFee}
            scrollEnabled={false}
          />

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default StudentFees;
