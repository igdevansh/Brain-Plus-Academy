import React, { useState, useCallback } from "react";
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
import { Calendar, LocaleConfig } from "react-native-calendars";

LocaleConfig.locales["en"] = {
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  dayNames: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  dayNamesShort: ["S", "M", "T", "W", "T", "F", "S"],
  today: "Today",
};
LocaleConfig.defaultLocale = "en";

const AttendanceCalendar = () => {
  const router = useRouter();
  const [selectedSubject, setSelectedSubject] = useState("Mathematics");

  const colors = {
    bg: "#282C34",
    card: "#333842",
    accent: "#f49b33",
    text: "#FFFFFF",
    subText: "#BBBBBB",
    present: "#f49b33", // Orange (Matches your visual for Present)
    absent: "#F44336", // Red
    leave: "#FFC107", // Yellow
    canceled: "#607D8B", // Blue-Grey
  };

  const calendarTheme = {
    backgroundColor: colors.bg,
    calendarBackground: colors.card,
    textSectionTitleColor: colors.subText,
    todayTextColor: colors.accent,
    dayTextColor: colors.text,
    textDisabledColor: "#5C616B",
    arrowColor: colors.accent,
    monthTextColor: colors.text,
    indicatorColor: colors.accent,
    textDayFontSize: 14,
    textMonthFontSize: 16,
    textDayHeaderFontSize: 12,
    "stylesheet.calendar.header": {
      week: {
        marginTop: 6,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 12,
      },
    },
  };

  // --- MOCK DATA: Attendance and Summary Data ---
  const subjectAttendanceData = {
    Mathematics: {
      markedDates: {
        "2025-11-01": {
          startingDay: true,
          endingDay: true,
          color: colors.present,
          textColor: colors.bg,
        },
        "2025-11-03": {
          startingDay: true,
          endingDay: true,
          color: colors.absent,
          textColor: colors.text,
        },
        "2025-11-04": {
          startingDay: true,
          endingDay: true,
          color: colors.canceled,
          textColor: colors.text,
        },
        "2025-11-05": {
          startingDay: true,
          endingDay: true,
          color: colors.present,
          textColor: colors.bg,
        },
        "2025-11-08": {
          startingDay: true,
          endingDay: true,
          color: colors.leave,
          textColor: colors.bg,
        },
        "2025-10-28": {
          startingDay: true,
          endingDay: true,
          color: colors.present,
          textColor: colors.bg,
        },
      },
      summary: {
        total: 20,
        attended: 15,
        absent: 3,
        canceled: 2,
        percentage: "75%",
      },
    },
    Physics: {
      markedDates: {
        "2025-11-01": {
          startingDay: true,
          endingDay: true,
          color: colors.present,
          textColor: colors.bg,
        },
        "2025-11-03": {
          startingDay: true,
          endingDay: true,
          color: colors.canceled,
          textColor: colors.text,
        },
        "2025-11-04": {
          startingDay: true,
          endingDay: true,
          color: colors.present,
          textColor: colors.bg,
        },
        "2025-10-25": {
          startingDay: true,
          endingDay: true,
          color: colors.absent,
          textColor: colors.text,
        },
      },
      summary: {
        total: 15,
        attended: 12,
        absent: 2,
        canceled: 1,
        percentage: "80%",
      },
    },
    "Computer Science": {
      markedDates: {
        "2025-11-01": {
          startingDay: true,
          endingDay: true,
          color: colors.absent,
          textColor: colors.text,
        },
        "2025-11-04": {
          startingDay: true,
          endingDay: true,
          color: colors.present,
          textColor: colors.bg,
        },
        "2025-11-05": {
          startingDay: true,
          endingDay: true,
          color: colors.present,
          textColor: colors.bg,
        },
      },
      summary: {
        total: 10,
        attended: 8,
        absent: 2,
        canceled: 0,
        percentage: "80%",
      },
    },
  };

  const subjects = Object.keys(subjectAttendanceData);
  const markedDates = subjectAttendanceData[selectedSubject]?.markedDates || {};
  const summary = subjectAttendanceData[selectedSubject]?.summary || {};
  // ----------------------------------------------------------------------

  const renderSubjectButton = useCallback(
    (item) => (
      <TouchableOpacity
        key={item}
        onPress={() => setSelectedSubject(item)}
        style={{
          backgroundColor:
            item === selectedSubject ? colors.accent : colors.card,
          borderColor: "#4C5361",
          borderWidth: item === selectedSubject ? 0 : 1,
        }}
        className={`py-2 px-4 rounded-full mr-2 mb-2`}
      >
        <Text
          style={{ color: item === selectedSubject ? colors.bg : colors.text }}
          className={`${item === selectedSubject ? "font-bold" : ""}`}
        >
          {item}
        </Text>
      </TouchableOpacity>
    ),
    [selectedSubject, colors]
  );

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.bg }}
      className="pt-8"
    >
      <StatusBar backgroundColor={colors.bg} barStyle="light-content" />

      {/* Header */}
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
          Attendance Tracker
        </Text>
      </View>

      <ScrollView className="flex-1 px-4">
        {/* Subject Filter */}
        <View className="mb-5">
          <Text
            style={{ color: colors.text }}
            className="text-lg font-semibold mb-3"
          >
            Select Subject:
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {subjects.map((subject) => renderSubjectButton(subject))}
          </ScrollView>
        </View>

        

        {/* Dynamic Calendar View */}
        <View
          className={`rounded-xl overflow-hidden mb-8 border border-[#4C5361]`}
        >
          <Calendar
            key={selectedSubject}
            theme={calendarTheme}
            markingType={"period"}
            markedDates={markedDates}
            enableSwipeMonths={true}
            renderHeader={(date) => {
              const monthName = new Date(date).toLocaleString("default", {
                month: "long",
                year: "numeric",
              });
              return (
                <View
                  style={{ backgroundColor: colors.card }}
                  className="flex-row justify-center items-center px-2 py-2"
                >
                  <Text
                    style={{ color: colors.text }}
                    className="text-lg font-bold"
                  >
                    {monthName}
                  </Text>
                </View>
              );
            }}
          />
        </View>

        {/* Legend */}
        <View
          style={{ backgroundColor: colors.card }}
          className="flex-row flex-wrap justify-around p-4 rounded-xl mb-8"
        >
          <View className="flex-row items-center mb-2">
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: colors.present,
                marginRight: 6,
              }}
            />
            <Text style={{ color: colors.text }} className="text-sm">
              Present
            </Text>
          </View>
          <View className="flex-row items-center mb-2">
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: colors.absent,
                marginRight: 6,
              }}
            />
            <Text style={{ color: colors.text }} className="text-sm">
              Absent
            </Text>
          </View>
          <View className="flex-row items-center mb-2">
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: colors.leave,
                marginRight: 6,
              }}
            />
            <Text style={{ color: colors.text }} className="text-sm">
              Leave
            </Text>
          </View>
          <View className="flex-row items-center mb-2">
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: colors.canceled,
                marginRight: 6,
              }}
            />
            <Text style={{ color: colors.text }} className="text-sm">
              Canceled
            </Text>
          </View>
        </View>
        
        
      </ScrollView>
    </SafeAreaView>
  );
};

export default AttendanceCalendar;
