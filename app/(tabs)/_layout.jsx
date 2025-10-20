import { Tabs } from 'expo-router'
import { Colors } from '../../assets/Colors'
import { Ionicons } from '@expo/vector-icons';

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.PRIMARY,
        tabBarInActiveTintColor: Colors.dark.text,
        tabBarStyle: {
          backgroundColor: Colors.SECONDARY,
          paddingBottom: 14,
          height: 75,
        },
        tabBarLabelStyle: { fontSize: 12, fontWeight: "bold" },
      }}
    >
      <Tabs.Screen name="home" options={{
        title: "HOME", tabBarIcon: ({ color }) => (
        <Ionicons name='home' size={21} color={color}/>
      ) }} />
      <Tabs.Screen name="history" options={{
        title: "HISTORY", tabBarIcon: ({ color }) => (
        <Ionicons name='time' size={21} color={color}/>
      ) }} />
      <Tabs.Screen name="profile" options={{
        title: "PROFILE", tabBarIcon: ({ color }) => (
          <Ionicons name='person' size={21} color={color}/>
        )
      }} />
    </Tabs>
  );
}

export default TabLayout