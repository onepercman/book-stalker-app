import { useStore } from "@/libs/valtio"
import { userStore } from "@/stores/user.store"
import { Entypo } from "@expo/vector-icons"
import { Tabs } from "expo-router"
import { Text } from "react-native"
import colors from "tailwindcss/colors"

export default function () {
  const { user } = useStore(userStore)

  if (!user) return

  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.violet[500],
        tabBarLabel({ children, color }) {
          return (
            <Text className="text-lg font-semibold" style={{ color }}>
              {children}
            </Text>
          )
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Entypo size={16} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => <Entypo size={16} name="compass" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: user.name,
          tabBarIcon: ({ color }) => <Entypo size={16} name="user" color={color} />,
        }}
      />
    </Tabs>
  )
}
