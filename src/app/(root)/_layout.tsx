import { Octicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function () {
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Recent Reading",
          tabBarIcon: () => <Octicons name="home" />,
        }}
      />
    </Tabs>
  );
}
