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

const ClassNotes = () => {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("All Subjects");

  const colors = {
    bg: "#282C34",
    card: "#333842",
    accent: "#f49b33",
    text: "#FFFFFF",
    subText: "#BBBBBB",
    downloadColor: "#4CAF50", 
    softCard: "#4C5361",
  };

  const allNotes = [
    {
      id: "1",
      subject: "Mathematics",
      title: "Algebra - Unit 3: Quadratic Equations",
      date: "01-11-2025",
      type: "PDF",
      size: "1.2 MB",
      url: "link_to_math_pdf",
    },
    {
      id: "2",
      subject: "Physics",
      title: "Mechanics - Lecture 5 Summary",
      date: "28-10-2025",
      type: "DOCX",
      size: "450 KB",
      url: "link_to_physics_doc",
    },
    {
      id: "3",
      subject: "Computer Science",
      title: "Data Structures - Linked Lists (Code Examples)",
      date: "25-10-2025",
      type: "ZIP",
      size: "3.5 MB",
      url: "link_to_cs_zip",
    },
    {
      id: "4",
      subject: "Mathematics",
      title: "Geometry - Circles and Tangents",
      date: "20-10-2025",
      type: "PDF",
      size: "800 KB",
      url: "link_to_math_pdf2",
    },
  ];

  const filteredNotes = allNotes.filter((note) => {
    if (activeFilter === "All Subjects") return true;
    return note.subject === activeFilter;
  });

  const uniqueSubjects = [...new Set(allNotes.map((note) => note.subject))];
  const filters = ["All Subjects", ...uniqueSubjects];

  const handleDownload = (note) => {
    console.log(`Downloading/Viewing: ${note.title} from URL: ${note.url}`);
  };

  const renderNoteCard = ({ item }) => (
    <View
      key={item.id}
      style={{
        backgroundColor: colors.card,
        borderLeftColor: colors.downloadColor,
      }}
      className="p-4 rounded-xl mb-3 flex-row justify-between border-l-4"
    >
      <View className="flex-1 pr-3">
        <Text style={{ color: colors.subText }} className="text-xs font-medium">
          {item.subject}
        </Text>
        <Text
          style={{ color: colors.text }}
          className="text-base font-semibold mt-1"
        >
          {item.title}
        </Text>
        <Text style={{ color: colors.subText }} className="text-xs mt-2">
          Uploaded: {item.date}
        </Text>
      </View>

      <View className="items-end justify-center">

        <TouchableOpacity
          onPress={() => handleDownload(item)}
          style={{ borderColor: colors.downloadColor }}
          className="rounded-lg px-3 py-1.5 border flex-row items-center"
        >
          <Ionicons
            name="download-outline"
            size={16}
            color={colors.downloadColor}
          />
          <Text
            style={{ color: colors.downloadColor }}
            className="font-bold text-sm ml-1"
          >
            Download
          </Text>
        </TouchableOpacity>
      </View>
    </View>
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
          Class Notes
        </Text>
      </View>

      <View className="px-4 mb-4">
        <Text
          style={{ color: colors.text }}
          className="text-lg font-semibold mb-2"
        >
          Filter by Subject:
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
        data={filteredNotes}
        keyExtractor={(item) => item.id}
        renderItem={renderNoteCard}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
        ListEmptyComponent={() => (
          <View
            className="p-10 items-center justify-center"
            style={{ backgroundColor: colors.card, borderRadius: 12 }}
          >
            <Ionicons
              name="folder-open-outline"
              size={32}
              color={colors.accent}
            />
            <Text
              style={{ color: colors.text }}
              className="mt-4 text-lg font-semibold"
            >
              No Notes Available
            </Text>
            <Text
              style={{ color: colors.subText }}
              className="mt-1 text-sm text-center"
            >
              Check back after the next class session.
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default ClassNotes;
