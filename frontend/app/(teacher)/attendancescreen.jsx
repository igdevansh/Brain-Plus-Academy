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
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";

const TeacherAttendance = () => {
  const router = useRouter();
  const [selectedClass, setSelectedClass] = useState("10A - Mathematics");
  const [attendanceDate, setAttendanceDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [students, setStudents] = useState([
    // Initial attendance is assumed to be Present
    { id: "S001", name: "Riya Sharma", status: "Present" },
    { id: "S002", name: "Aman Gupta", status: "Present" },
    { id: "S003", name: "Priya Singh", status: "Present" },
    { id: "S004", name: "Vikas Kumar", status: "Present" },
    { id: "S005", name: "Jia Khan", status: "Present" },
  ]);

  const classes = [
    "10A - Mathematics",
    "9B - Science",
    "11C - Computer Science",
  ];

  const colors = {
    BG: "#282C34",
    CARD: "#333842",
    ACCENT: "#f49b33",
    TEXT: "#FFFFFF",
    SUB_TEXT: "#BBBBBB",
    INPUT_BORDER: "#616A7D",
    PRESENT: "#4CAF50", // Green
    ABSENT: "#F44336", // Red
    LATE: "#FFC107", // Yellow/Orange
  };

  // --- Date Picker Handlers ---
  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || attendanceDate;
    setShowDatePicker(Platform.OS === "ios");
    setAttendanceDate(currentDate);
    // In a real app, this would trigger fetching attendance data for the new date
    console.log(`Fetching attendance for ${formatDate(currentDate)}`);
  };

  const showDate = () => {
    setShowDatePicker(true);
  };

  // Date format is DD-MM-YYYY
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // --- Attendance Toggler: Cycles P -> A -> L -> P ---
  const toggleStatus = (studentId, currentStatus) => {
    const nextStatus =
      currentStatus === "Present"
        ? "Absent"
        : currentStatus === "Absent"
          ? "Late"
          : "Present";

    setStudents(
      students.map((s) =>
        s.id === studentId ? { ...s, status: nextStatus } : s
      )
    );
  };

  // --- Submit Attendance ---
  const handleSubmitAttendance = () => {
    Alert.alert(
      "Confirm Submission",
      `Submit attendance for ${selectedClass} on ${formatDate(attendanceDate)}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Submit",
          style: "default",
          onPress: () => {
            console.log("Attendance Data Submitted:", students);
            Alert.alert("Success", "Attendance submitted successfully!");
          },
        },
      ]
    );
  };

  // --- Render Student Row ---
  const renderStudentRow = ({ item }) => {
    let statusColor;
    let statusBg;
    switch (item.status) {
      case "Present":
        statusColor = colors.PRESENT;
        statusBg = `${colors.PRESENT}30`;
        break;
      case "Absent":
        statusColor = colors.ABSENT;
        statusBg = `${colors.ABSENT}30`;
        break;
      case "Late":
        statusColor = colors.LATE;
        statusBg = `${colors.LATE}30`;
        break;
      default:
        statusColor = colors.SUB_TEXT;
        statusBg = colors.CARD;
    }

    return (
      <View
        style={{ backgroundColor: colors.CARD, borderLeftColor: statusColor }}
        className="p-3 rounded-xl mb-3 flex-row justify-between items-center border-l-4"
      >
        {/* Student Name */}
        <View className="flex-1">
          <Text
            style={{ color: colors.TEXT }}
            className="text-base font-medium"
          >
            {item.name}
          </Text>
          
        </View>

        {/* Status Toggle Button */}
        <TouchableOpacity
          onPress={() => toggleStatus(item.id, item.status)}
          style={{ backgroundColor: statusBg, borderColor: statusColor }}
          className="px-4 py-2 rounded-full border"
        >
          <Text style={{ color: statusColor }} className="text-sm font-bold">
            {item.status.toUpperCase()}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

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
          Attendance Manager
        </Text>
      </View>

      <View className="px-4 mb-4" style={{ backgroundColor: colors.BG }}>
        <Text
          style={{ color: colors.ACCENT }}
          className="text-xl font-semibold mb-3"
        >
          Mark Daily Attendance
        </Text>

        {/* Class Selector and Date Picker */}
        <View className="flex-row justify-between mb-4">
          {/* Class Selector (Simple Dropdown Mock) */}
          <View style={{ flex: 1, marginRight: 8 }}>
            <Text style={{ color: colors.SUB_TEXT }} className="text-xs mb-1">
              Select Class
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
              className="p-3 rounded-lg border flex-row items-center justify-between"
            >
              <Text
                style={{ color: colors.TEXT }}
                className="text-base font-semibold"
              >
                {selectedClass}
              </Text>
              <Ionicons name="caret-down" size={16} color={colors.SUB_TEXT} />
            </TouchableOpacity>
          </View>

          {/* Date Picker */}
          <View style={{ width: 130 }}>
            <Text style={{ color: colors.SUB_TEXT }} className="text-xs mb-1">
              Date
            </Text>
            <TouchableOpacity
              onPress={showDate}
              style={{
                borderColor: colors.INPUT_BORDER,
                backgroundColor: colors.CARD,
              }}
              className="p-3 rounded-lg border flex-row items-center justify-between"
            >
              <Text
                style={{ color: colors.TEXT }}
                className="text-base font-semibold"
              >
                {formatDate(attendanceDate)}
              </Text>
              <Ionicons
                name="calendar-outline"
                size={18}
                color={colors.SUB_TEXT}
              />
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                testID="datePicker"
                value={attendanceDate}
                mode="date"
                display="default"
                onChange={onChangeDate}
              />
            )}
          </View>
        </View>
      </View>

      {/* Student List */}
      <FlatList
        data={students}
        keyExtractor={(item) => item.id}
        renderItem={renderStudentRow}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
        ListFooterComponent={() => (
          <TouchableOpacity
            onPress={handleSubmitAttendance}
            style={{ backgroundColor: colors.ACCENT }}
            className="py-3 rounded-xl items-center mt-4"
          >
            <Text style={{ color: colors.BG }} className="text-lg font-bold">
              Finalize & Submit Attendance
            </Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default TeacherAttendance;
