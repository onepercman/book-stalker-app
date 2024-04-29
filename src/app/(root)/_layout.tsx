import { useStore } from "@/libs/valtio";
import { userStore } from "@/stores/user.store";
import { Octicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function () {
  const { user } = useStore(userStore);

  if (!user) return;

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
          tabBarLabel: "Home",
          tabBarIcon: () => <Octicons name="home" size={18} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: user.name,
          tabBarIcon: () => <Octicons name="person" size={18} />,
        }}
      />
    </Tabs>
  );
}
