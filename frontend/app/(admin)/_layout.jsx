import { Stack } from "expo-router";

export default function AdminLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="admindashboard" />
      <Stack.Screen name="managestudents" />
      <Stack.Screen name="manageteachers" />
      <Stack.Screen name="globalnotices" />
      <Stack.Screen name="feereports" />
    </Stack>
  );
}
