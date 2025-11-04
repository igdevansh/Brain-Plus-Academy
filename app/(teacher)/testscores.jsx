import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  FlatList,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const TeacherScoreSubmission = () => {
  const router = useRouter();

  // --- State for Selection ---
  const [selectedClass, setSelectedClass] = useState("10A - Mathematics");
  const [selectedExam, setSelectedExam] = useState("Mid-Term 2025");
  const [testName, setTestName] = useState("");
  const [maxScore, setMaxScore] = useState("100");

  // --- Student Data State (Scores are mutable) ---
  const [students, setStudents] = useState([
    { id: "S001", name: "Riya Sharma", score: "88" },
    { id: "S002", name: "Aman Gupta", score: "65" },
    { id: "S003", name: "Priya Singh", score: "72" },
    { id: "S004", name: "Vikas Kumar", score: "" }, // Score yet to be entered
    { id: "S005", name: "Jia Khan", score: "95" },
    { id: "S006", name: "Mohan Raj", score: "78" },
  ]);

  const exams = ["Mid-Term 2025", "Quarterly Exam", "Final Semester Exam"];
  const classes = ["10A - Mathematics", "9B - Science", "11C - Physics"];

  const colors = {
    BG: "#282C34",
    CARD: "#333842",
    ACCENT: "#f49b33",
    TEXT: "#FFFFFF",
    SUB_TEXT: "#BBBBBB",
    INPUT_BORDER: "#616A7D",
    SUBMIT: "#4CAF50", // Green for Submit
    ERROR: "#F44336", // Red for errors
  };

  // --- Score Update Handler ---
  const handleScoreChange = (text, studentId) => {
    // Only allow numbers and empty string
    const newText = text.replace(/[^0-9]/g, "");

    setStudents(
      students.map((s) => (s.id === studentId ? { ...s, score: newText } : s))
    );
  };

  // --- Submit Scores ---
  const handleSubmitScores = () => {
    const scoreValue = parseInt(maxScore);
    if (isNaN(scoreValue) || scoreValue <= 0) {
      Alert.alert("Error", "Please set a valid Maximum Score.");
      return;
    }

    const pendingCount = students.filter((s) => s.score.trim() === "").length;
    if (pendingCount > 0) {
      Alert.alert(
        "Warning",
        `There are ${pendingCount} scores still pending entry. Please enter all scores or mark them as 0.`
      );
      return;
    }

    const invalidScores = students.filter(
      (s) => parseInt(s.score) > scoreValue
    );
    if (invalidScores.length > 0) {
      Alert.alert(
        "Validation Error",
        "One or more scores exceed the maximum score. Please check your entries."
      );
      return;
    }

    Alert.alert(
      "Confirm Score Publication",
      `Publish scores for ${selectedExam} (${selectedClass})? All students will see these results.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Publish",
          style: "default",
          onPress: () => {
            console.log("Scores Published:", students);
            Alert.alert(
              "Success",
              "Scores have been submitted and published successfully!"
            );
            // Reset logic in a real app would likely fetch new empty data
          },
        },
      ]
    );
  };

  // --- Render Student Score Row ---
  const renderStudentRow = ({ item, index }) => {
    const isValid =
      item.score === "" || parseInt(item.score) <= parseInt(maxScore);
    const borderColor =
      item.score.trim() === ""
        ? colors.ACCENT
        : isValid
          ? colors.SUBMIT
          : colors.ERROR;

    return (
      <View
        style={{
          backgroundColor: colors.CARD,
          borderLeftColor: borderColor,
        }}
        className="p-3 rounded-xl mb-3 flex-row justify-between items-center border-l-4"
      >
        {/* Student Name */}
        <View className="flex-1 pr-3">
          <Text
            style={{ color: colors.TEXT }}
            className="text-base font-medium"
          >
            {index + 1}. {item.name}
          </Text>
          <Text style={{ color: colors.SUB_TEXT }} className="text-xs mt-1">
            ID: {item.id}
          </Text>
        </View>

        {/* Score Input */}
        <View style={{ width: 80 }}>
          <TextInput
            placeholder="Score"
            placeholderTextColor={colors.SUB_TEXT}
            value={item.score}
            onChangeText={(text) => handleScoreChange(text, item.id)}
            keyboardType="numeric"
            maxLength={4} // Allows up to 9999
            style={{
              backgroundColor: colors.BG,
              color: colors.TEXT,
              borderColor: isValid ? colors.INPUT_BORDER : colors.ERROR,
              textAlign: "center",
              borderWidth: 1,
            }}
            className="p-2 rounded-lg text-base font-bold"
          />
        </View>
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
          Score Submission Tool
        </Text>
      </View>

      <ScrollView className="flex-1 px-4">
        <Text
          style={{ color: colors.ACCENT }}
          className="text-xl font-semibold mb-4"
        >
          Input & Publish Results
        </Text>

        <Text style={{ color: colors.SUB_TEXT }} className="text-sm mb-2">
          Test Name
        </Text>
        <TextInput 
          placeholder="E.g., Mid-Term 2025"
          placeholderTextColor={colors.SUB_TEXT}
          value={testName}
          onChangeText={(text) => setTestName(text)}
          keyboardType="default"
          style={{
            backgroundColor: colors.CARD,
            color: colors.TEXT,
            borderColor: colors.INPUT_BORDER,
          }}
          className="p-3 rounded-lg border mb-4 text-base"
        />

        {/* Max Score Input */}
        <Text style={{ color: colors.SUB_TEXT }} className="text-sm mb-2">
          Maximum Score
        </Text>
        <TextInput
          placeholder="E.g., 100"
          placeholderTextColor={colors.SUB_TEXT}
          value={maxScore}
          onChangeText={(text) => setMaxScore(text.replace(/[^0-9]/g, ""))}
          keyboardType="numeric"
          style={{
            backgroundColor: colors.CARD,
            color: colors.TEXT,
            borderColor: colors.INPUT_BORDER,
          }}
          className="p-3 rounded-lg border mb-4 text-base"
        />

        {/* Score List Header */}
        <View className="flex-row justify-between items-center px-3 py-2 border-b border-t border-[#4C5361]">
          <Text
            style={{ color: colors.SUB_TEXT }}
            className="text-sm font-semibold flex-1"
          >
            Student Name
          </Text>
          <Text
            style={{ color: colors.SUB_TEXT, width: 80, textAlign: "center" }}
            className="text-sm font-semibold text-center"
          >
            Score / {maxScore}
          </Text>
        </View>

        {/* Student Score List */}
        <FlatList
          data={students}
          keyExtractor={(item) => item.id}
          renderItem={renderStudentRow}
          scrollEnabled={false}
          contentContainerStyle={{ paddingVertical: 10 }}
        />

        {/* Submit Button */}
        <TouchableOpacity
          onPress={handleSubmitScores}
          style={{ backgroundColor: colors.ACCENT }}
          className="py-3 rounded-xl items-center mb-8"
        >
          <Text style={{ color: colors.BG }} className="text-lg font-bold">
            Publish Scores Now
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TeacherScoreSubmission;
