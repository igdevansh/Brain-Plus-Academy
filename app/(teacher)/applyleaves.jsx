import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const TeacherLeaveViewer = () => {
  const router = useRouter();

  const colors = {
    BG: "#282C34",
    CARD: "#333842",
    ACCENT: "#f49b33",
    TEXT: "#FFFFFF",
    SUB_TEXT: "#BBBBBB",
    PENDING: "#FFC107", // Yellow/Amber for action required
    APPROVED: "#4CAF50", // Green
    REJECTED: "#F44336", // Red
  };

  // --- Mock Data for Leave Requests ---
  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: "L001",
      studentName: "Aman Gupta",
      studentId: "S002",
      class: "9B - Science",
      type: "Family Function",
      fromDate: "08-12-2025",
      toDate: "10-12-2025",
      reason: "Traveling out of town for a mandatory family event.",
      status: "Pending",
    },
    {
      id: "L002",
      studentName: "Riya Sharma",
      studentId: "S001",
      class: "10A - Mathematics",
      type: "Sick Leave",
      fromDate: "04-11-2025",
      toDate: "04-11-2025",
      reason: "Severe fever and advised rest by doctor.",
      status: "Pending",
    },
    {
      id: "L003",
      studentName: "Jia Khan",
      studentId: "S005",
      class: "11C - Physics",
      type: "Medical Appointment",
      fromDate: "01-11-2025",
      toDate: "01-11-2025",
      reason: "Scheduled dental surgery. Approved last week.",
      status: "Approved",
    },
  ]);

  // --- Action Handlers ---
  const handleAction = (id, newStatus) => {
    Alert.alert(
      `${newStatus} Leave?`,
      `Are you sure you want to mark this leave request as ${newStatus}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: newStatus,
          style: newStatus === "Reject" ? "destructive" : "default",
          onPress: () => {
            setLeaveRequests((prev) =>
              prev.map((req) =>
                req.id === id ? { ...req, status: newStatus } : req
              )
            );
            console.log(`Leave ${id} set to ${newStatus}`);
            Alert.alert(
              "Success",
              `Leave request successfully ${newStatus}ed.`
            );
          },
        },
      ]
    );
  };

  // --- Render Leave Card ---
  const renderLeaveCard = ({ item }) => {
    let statusColor, statusIcon;
    switch (item.status) {
      case "Pending":
        statusColor = colors.PENDING;
        statusIcon = "hourglass-outline";
        break;
      case "Approved":
        statusColor = colors.APPROVED;
        statusIcon = "checkmark-circle-outline";
        break;
      case "Rejected":
        statusColor = colors.REJECTED;
        statusIcon = "close-circle-outline";
        break;
      default:
        statusColor = colors.SUB_TEXT;
        statusIcon = "help-circle-outline";
    }

    return (
      <View
        style={{ backgroundColor: colors.CARD, borderLeftColor: statusColor }}
        className="p-4 rounded-xl mb-3 border-l-4"
      >
        {/* Header - Student & Status */}
        <View className="flex-row justify-between items-center mb-2">
          <Text style={{ color: colors.TEXT }} className="text-lg font-bold">
            {item.studentName}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name={statusIcon} size={16} color={statusColor} />
            <Text
              style={{ color: statusColor }}
              className="text-sm font-semibold ml-1"
            >
              {item.status.toUpperCase()}
            </Text>
          </View>
        </View>

        {/* Details */}
        <Text style={{ color: colors.SUB_TEXT }} className="text-xs mb-1">
          {item.class} (ID: {item.studentId})
        </Text>
        <Text
          style={{ color: colors.TEXT }}
          className="text-base font-semibold mt-1"
        >
          Reason: {item.type}
        </Text>
        <Text style={{ color: colors.SUB_TEXT }} className="text-sm mt-1">
          Dates: {item.fromDate} to {item.toDate}
        </Text>
        <Text
          style={{ color: colors.SUB_TEXT }}
          className="text-sm italic mt-2"
          numberOfLines={2}
        >
          Note: `{item.reason}``
        </Text>

        {/* Action Buttons (Only for Pending requests) */}
        {item.status === "Pending" && (
          <View className="flex-row justify-end mt-4 pt-3 border-t border-t-[#4C5361]">
            <TouchableOpacity
              onPress={() => handleAction(item.id, "Reject")}
              style={{ backgroundColor: colors.REJECTED }}
              className="px-4 py-2 rounded-full mr-3"
            >
              <Text
                style={{ color: colors.TEXT }}
                className="font-bold text-sm"
              >
                REJECT
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleAction(item.id, "Approved")}
              style={{ backgroundColor: colors.APPROVED }}
              className="px-4 py-2 rounded-full"
            >
              <Text
                style={{ color: colors.TEXT }}
                className="font-bold text-sm"
              >
                APPROVE
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  // --- Filtering Logic ---
  const pendingRequests = leaveRequests.filter((r) => r.status === "Pending");
  const historyRequests = leaveRequests.filter((r) => r.status !== "Pending");

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
          Leave Notification Viewer
        </Text>
      </View>

      <ScrollView className="flex-1 px-4">
        {/* Pending Requests Section */}
        <View
          style={{ backgroundColor: colors.PENDING, opacity: 0.15 }}
          className="p-3 rounded-lg mb-4 flex-row items-center justify-between"
        >
          <Text style={{ color: colors.PENDING }} className="text-lg font-bold">
            {pendingRequests.length} Pending Actions
          </Text>
          <Ionicons
            name="alert-circle-outline"
            size={24}
            color={colors.PENDING}
          />
        </View>

        <Text
          style={{ color: colors.ACCENT }}
          className="text-xl font-semibold mb-3"
        >
          Pending Leave Requests
        </Text>

        <FlatList
          data={pendingRequests}
          keyExtractor={(item) => item.id}
          renderItem={renderLeaveCard}
          scrollEnabled={false}
          ListEmptyComponent={() => (
            <View
              className="p-10 items-center justify-center"
              style={{ backgroundColor: colors.CARD, borderRadius: 12 }}
            >
              <Ionicons
                name="happy-outline"
                size={32}
                color={colors.APPROVED}
              />
              <Text
                style={{ color: colors.TEXT }}
                className="mt-4 text-lg font-semibold"
              >
                No Pending Requests!
              </Text>
            </View>
          )}
        />

        {/* History Section */}
        <Text
          style={{ color: colors.ACCENT }}
          className="text-xl font-semibold my-4 pt-2 border-t border-t-[#4C5361]"
        >
          Reviewed History
        </Text>

        <FlatList
          data={historyRequests}
          keyExtractor={(item) => item.id}
          renderItem={renderLeaveCard}
          scrollEnabled={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={() => (
            <View
              className="p-6 items-center justify-center"
              style={{ backgroundColor: colors.CARD, borderRadius: 12 }}
            >
              <Text
                style={{ color: colors.SUB_TEXT }}
                className="mt-1 text-sm text-center"
              >
                No previous leave requests found.
              </Text>
            </View>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default TeacherLeaveViewer;
