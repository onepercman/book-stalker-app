import { Ionicons } from "@expo/vector-icons"
import { Tabs } from "expo-router"

export default function () {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{ headerShown: false, tabBarIcon: ({ color }) => <Ionicons color={color} /> }}
      />
      <Tabs.Screen name="profile" options={{ headerShown: false }} />
    </Tabs>
  )
}
