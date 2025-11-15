import React, { useState } from "react";
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

const StudentTestScores = () => {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("All Subjects");

  const colors = {
    bg: "#282C34",
    card: "#333842",
    accent: "#f49b33",
    text: "#FFFFFF",
    subText: "#BBBBBB",
    pass: "#4CAF50", 
    fail: "#F44336", 
    softCard: "#4C5361",
  };

  const allScores = [
    {
      id: "1",
      subject: "Mathematics",
      examType: "Mid-Term Exam",
      date: "Oct 2025",
      score: 88,
      maxScore: 100,
      grade: "A", 
      result: "Pass",
    },
    {
      id: "2",
      subject: "Physics",
      examType: "Weekly Quiz 3",
      date: "Nov 2025",
      score: 18,
      maxScore: 25,
      grade: "B+",
      result: "Pass",
    },
    {
      id: "3",
      subject: "Computer Science",
      examType: "Internal Test 1",
      date: "Sep 2025",
      score: 25,
      maxScore: 50,
      grade: "D",
      result: "Fail",
    },
    {
      id: "4",
      subject: "Mathematics",
      examType: "Final Exam",
      date: "Dec 2025",
      score: 95,
      maxScore: 100,
      grade: "A+",
      result: "Pass",
    },
    {
      id: "5",
      subject: "Communication Skills",
      examType: "Mid-Term Exam",
      date: "Oct 2025",
      score: 72,
      maxScore: 100,
      grade: "B",
      result: "Pass",
    },
  ];

  const filteredScores = allScores.filter((score) => {
    if (activeFilter === "All Subjects") return true;
    if (activeFilter === "Mid-Term Exam")
      return score.examType === activeFilter;
    return score.subject === activeFilter;
  });

  const uniqueSubjects = [...new Set(allScores.map((score) => score.subject))];
  const uniqueExamTypes = [
    ...new Set(allScores.map((score) => score.examType)),
  ];
  const filters = ["All Subjects", ...uniqueSubjects, ...uniqueExamTypes];

  const renderScoreCard = ({ item }) => {
    const isPass = item.result === "Pass";
    const resultColor = isPass ? colors.pass : colors.fail;
    const scorePercentage = ((item.score / item.maxScore) * 100).toFixed(0);

    return (
      <TouchableOpacity
        key={item.id}
        onPress={() => console.log(`Viewing score detail for ${item.title}`)}
        activeOpacity={0.8}
        style={{ backgroundColor: colors.card, borderLeftColor: resultColor }}
        className="p-4 rounded-xl mb-3 flex-row justify-between border-l-4"
      >
        <View className="flex-1 pr-3">
          <Text
            style={{ color: colors.text }}
            className="text-base font-semibold"
          >
            {item.subject} - {item.examType}
          </Text>
          <Text style={{ color: colors.subText }} className="text-xs mt-1">
            Date: {item.date}
          </Text>
          <Text
            style={{ color: resultColor }}
            className="text-xs font-semibold mt-2"
          >
            Result: {item.result}
          </Text>
        </View>

        <View className="items-end justify-center">
          <Text style={{ color: colors.text }} className="text-3xl font-bold">
            {item.score}
          </Text>
          <Text style={{ color: colors.subText }} className="text-xs">
            / {item.maxScore} ({scorePercentage}%)
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
          Test Scores
        </Text>
      </View>

      <View className="px-4 mb-4">
        <Text
          style={{ color: colors.text }}
          className="text-lg font-semibold mb-2"
        >
          Filter Scores:
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-4"
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              onPress={() => setActiveFilter(filter)}
              style={{
                backgroundColor:
                  filter === activeFilter ? colors.accent : colors.card,
                borderColor: colors.softCard,
                borderWidth: filter === activeFilter ? 0 : 1,
              }}
              className={`py-2 px-4 rounded-full mr-2`}
            >
              <Text
                style={{
                  color: filter === activeFilter ? colors.bg : colors.text,
                }}
                className="font-semibold"
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredScores}
        keyExtractor={(item) => item.id}
        renderItem={renderScoreCard}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
        ListEmptyComponent={() => (
          <View
            className="p-10 items-center justify-center"
            style={{ backgroundColor: colors.card, borderRadius: 12 }}
          >
            <Ionicons
              name="documents-outline"
              size={32}
              color={colors.accent}
            />
            <Text
              style={{ color: colors.text }}
              className="mt-4 text-lg font-semibold"
            >
              No Scores Found
            </Text>
            <Text
              style={{ color: colors.subText }}
              className="mt-1 text-sm text-center"
            >
              Check back after the next exam!
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default StudentTestScores;
