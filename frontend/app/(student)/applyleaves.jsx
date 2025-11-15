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
  Alert,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";

const ApplyLeaves = () => {
  const router = useRouter();

  const [reason, setReason] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const colors = {
    bg: "#282C34",
    card: "#333842",
    accent: "#f49b33",
    text: "#FFFFFF",
    subText: "#BBBBBB",
    recorded: "#4CAF50",
    softCard: "#4C5361",
    inputBorder: "#616A7D",
  };

  // --- Mock Data: Leave History (Dates updated to DD-MM-YYYY for consistency) ---
  const leaveHistory = [
    {
      id: "1",
      reason: "High fever, will resume on 27 Oct.",
      startDate: "25-10-2025",
      endDate: "26-10-2025",
      appliedDate: "24-10-2025",
    },
    {
      id: "2",
      reason: "Attending family event out of town.",
      startDate: "10-11-2025",
      endDate: "12-11-2025",
      appliedDate: "01-11-2025",
    },
    {
      id: "3",
      reason: "Medical appointment, one day only.",
      startDate: "01-09-2025",
      endDate: "01-09-2025",
      appliedDate: "31-08-2025",
    },
  ];

  // --- Utility function updated to format dates as DD-MM-YYYY ---
  const formatDate = (date) => {
    if (date instanceof Date && !isNaN(date)) {
      // Simple manual formatting for DD-MM-YYYY
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    }
    return "Select Date";
  };

  // --- Date Picker Handlers (Remain the same, as they handle Date objects) ---
  const onChangeStartDate = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartDatePicker(Platform.OS === "ios");
    setStartDate(currentDate);
    if (currentDate > endDate) {
      setEndDate(currentDate);
    }
  };

  const onChangeEndDate = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndDatePicker(Platform.OS === "ios");
    setEndDate(currentDate);
    if (currentDate < startDate) {
      setStartDate(currentDate);
    }
  };

  const showDatePicker = (setter) => {
    setter(true);
  };

  // --- Submit Leave Notification (Uses new formatDate) ---
  const handleSubmitLeave = () => {
    if (!reason.trim()) {
      Alert.alert(
        "Error",
        "Please provide a reason for the leave notification."
      );
      return;
    }
    if (startDate > endDate) {
      Alert.alert("Error", "Start date cannot be after end date.");
      return;
    }

    Alert.alert(
      "Leave Notification Recorded",
      `From: ${formatDate(startDate)}\nTo: ${formatDate(endDate)}\nReason: ${reason}\n\nThe school has been informed.`,
      [
        {
          text: "OK",
          onPress: () => {
            // Mock addition to history (uses new formatDate)
            const newLeave = {
              id: (leaveHistory.length + 1).toString(),
              reason: reason,
              startDate: formatDate(startDate),
              endDate: formatDate(endDate),
              appliedDate: formatDate(new Date()),
            };
            leaveHistory.unshift(newLeave);

            // Reset form
            setReason("");
            setStartDate(new Date());
            setEndDate(new Date());
          },
        },
      ]
    );
  };

  // --- Render Leave History Card (No functional change, uses existing item data) ---
  const renderLeaveItem = ({ item }) => {
    const statusColor = colors.recorded;

    return (
      <View
        key={item.id}
        style={{ backgroundColor: colors.card, borderLeftColor: statusColor }}
        className="p-4 rounded-xl mb-3 border-l-4"
      >
        <View className="flex-row justify-between items-start">
          <View className="flex-1">
            <Text
              style={{ color: colors.text }}
              className="text-base font-semibold mb-2"
              numberOfLines={2}
            >
              {item.reason}
            </Text>

            <View className="border-t border-[#4C5361] pt-2">
              <Text style={{ color: colors.subText }} className="text-sm">
                {item.startDate} to {item.endDate}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.bg }}
      className="pt-8"
    >
      <StatusBar backgroundColor={colors.bg} barStyle="light-content" />
      {/* Header, Form, and History rendering logic remains unchanged */}
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
          Leave Notification
        </Text>
      </View>

      <ScrollView className="flex-1 px-4">
        {/* New Leave Notification Section */}
        <View
          className="mb-6 p-4 rounded-xl"
          style={{ backgroundColor: colors.card }}
        >
          <Text
            style={{ color: colors.accent }}
            className="text-xl font-semibold mb-4"
          >
            Inform your Teacher
          </Text>

          {/* Start Date Picker */}
          <Text style={{ color: colors.subText }} className="text-sm mb-2">
            Start Date
          </Text>
          <TouchableOpacity
            onPress={() => showDatePicker(setShowStartDatePicker)}
            style={{ borderColor: colors.inputBorder }}
            className="flex-row items-center justify-between p-3 rounded-lg border mb-4"
          >
            <Text style={{ color: colors.text }} className="text-base">
              {formatDate(startDate)}
            </Text>
            <Ionicons
              name="calendar-outline"
              size={20}
              color={colors.subText}
            />
          </TouchableOpacity>
          {showStartDatePicker && (
            <DateTimePicker
              testID="startDatePicker"
              value={startDate}
              mode="date"
              display="default"
              onChange={onChangeStartDate}
            />
          )}

          {/* End Date Picker */}
          <Text style={{ color: colors.subText }} className="text-sm mb-2">
            End Date
          </Text>
          <TouchableOpacity
            onPress={() => showDatePicker(setShowEndDatePicker)}
            style={{ borderColor: colors.inputBorder }}
            className="flex-row items-center justify-between p-3 rounded-lg border mb-4"
          >
            <Text style={{ color: colors.text }} className="text-base">
              {formatDate(endDate)}
            </Text>
            <Ionicons
              name="calendar-outline"
              size={20}
              color={colors.subText}
            />
          </TouchableOpacity>
          {showEndDatePicker && (
            <DateTimePicker
              testID="endDatePicker"
              value={endDate}
              mode="date"
              display="default"
              onChange={onChangeEndDate}
            />
          )}

          {/* Reason Input */}
          <Text style={{ color: colors.subText }} className="text-sm mb-2">
            Reason for Absence (Mandatory)
          </Text>
          <TextInput
            multiline
            numberOfLines={4}
            placeholder="E.g., High fever, family trip, required medical appointment."
            placeholderTextColor={colors.subText}
            value={reason}
            onChangeText={setReason}
            style={{
              backgroundColor: colors.bg,
              color: colors.text,
              borderColor: colors.inputBorder,
              textAlignVertical: "top",
            }}
            className="p-3 rounded-lg border mb-6 text-base"
          />

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSubmitLeave}
            style={{ backgroundColor: colors.accent }}
            className="py-3 rounded-xl items-center"
          >
            <Text style={{ color: colors.bg }} className="text-lg font-bold">
              Record Absence Notification
            </Text>
          </TouchableOpacity>
        </View>

        {/* Leave History Section */}
        <View className="mb-8">
          <Text
            style={{ color: colors.accent }}
            className="text-xl font-semibold mb-3"
          >
            Your Notification History
          </Text>
          <FlatList
            data={leaveHistory}
            keyExtractor={(item) => item.id}
            renderItem={renderLeaveItem}
            scrollEnabled={false}
            ListEmptyComponent={() => (
              <View
                className="p-10 items-center justify-center"
                style={{ backgroundColor: colors.card, borderRadius: 12 }}
              >
                <Ionicons
                  name="alert-circle-outline"
                  size={32}
                  color={colors.accent}
                />
                <Text
                  style={{ color: colors.text }}
                  className="mt-4 text-lg font-semibold"
                >
                  No Notification History Yet
                </Text>
                <Text
                  style={{ color: colors.subText }}
                  className="mt-1 text-sm text-center"
                >
                  All absences must be recorded here.
                </Text>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ApplyLeaves;
