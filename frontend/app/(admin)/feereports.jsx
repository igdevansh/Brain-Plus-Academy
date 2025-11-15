import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const FeeReports = () => {
  const router = useRouter();

  // Mock data for fee reports
  const summary = [
    { title: "Collected", amount: "₹1.2L", color: "text-[#f49b33]" },
    { title: "Pending", amount: "₹45k", color: "text-[#f49b33]" },
  ];

  const recentTransactions = [
    {
      id: "1",
      name: "Devansh Gupta",
      amount: "₹5,000",
      date: "2025-11-15",
      status: "Paid",
    },
    {
      id: "2",
      name: "Amit Sharma",
      amount: "₹4,500",
      date: "2025-11-14",
      status: "Paid",
    },
    {
      id: "3",
      name: "Priya Singh",
      amount: "₹5,000",
      date: "2025-11-12",
      status: "Pending",
    },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case "Paid":
        return "bg-green-500/20 text-[#f49b33]";
      case "Pending":
        return "bg-yellow-500/20 text-[#f49b33]";
      default:
        return "bg-gray-500/20 text-[#f49b33]";
    }
  };

  const renderTransaction = ({ item }) => (
    <View className="bg-[#333842] p-4 rounded-xl mb-3 border border-[#4C5361]">
      <View className="flex-row justify-between items-center">
        <View>
          <Text className="text-white font-bold text-base">{item.name}</Text>
          <Text className="text-gray-400 text-xs">{item.date}</Text>
        </View>
        <View className="items-end">
          <Text className="text-white font-semibold">{item.amount}</Text>
          <View
            className={`px-2 py-1 rounded mt-1 ${getStatusStyle(item.status)}`}
          >
            <Text
              className={`text-xs font-bold ${getStatusStyle(item.status)}`}
            >
              {item.status}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#282C34] pt-8">
      <StatusBar backgroundColor="#282C34" barStyle="light-content" />

      {/* Header */}
      <View className="px-4 pb-4 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold ml-2">Fee Reports</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Summary */}
        <View className="flex-row justify-around bg-[#333842] p-4 rounded-xl border border-[#4C5361] mb-6">
          {summary.map((item, index) => (
            <View key={index} className="items-center">
              <Text className={`text-2xl font-bold ${item.color}`}>
                {item.amount}
              </Text>
              <Text className="text-gray-400 text-sm">{item.title}</Text>
            </View>
          ))}
        </View>

        {/* Recent Transactions */}
        <Text className="text-[#f49b33] text-lg font-semibold mb-4">
          Recent Activity
        </Text>
        <FlatList
          data={recentTransactions}
          keyExtractor={(item) => item.id}
          renderItem={renderTransaction}
          scrollEnabled={false} // Disable scroll for the inner list
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default FeeReports;
