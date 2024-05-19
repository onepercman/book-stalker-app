import { useStore } from "@/libs/valtio"
import { userStore } from "@/stores/user.store"
import { Entypo, FontAwesome, FontAwesome6 } from "@expo/vector-icons"
import { Tabs } from "expo-router"
import { Image, Text, View } from "react-native"
import colors from "tailwindcss/colors"

export default function () {
  const { user } = useStore(userStore)

  if (!user) return

  return (
    <View className="h-full">
      <Tabs
        initialRouteName="home"
        sceneContainerStyle={{ backgroundColor: colors.blue[50] }}
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.blue[500],
          tabBarStyle: { height: 76 },
          tabBarLabel({ children, color }) {
            return (
              <Text className="text-xs font-semibold" style={{ color }}>
                {children}
              </Text>
            )
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Trang chủ",
            tabBarIcon: ({ color }) => <Entypo size={16} name="home" color={color} />,
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: "Khám phá",
            tabBarIcon: ({ color }) => <FontAwesome6 size={16} name="compass" color={color} />,
          }}
        />
        <Tabs.Screen
          name="dashboard"
          options={{
            title: "Tổng quan",
            tabBarIcon: ({ color }) => <FontAwesome size={16} name="dashboard" color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Tài khoản",
            tabBarIcon: () => (
              <Image width={16} height={16} source={{ uri: user.avatar }} className="rounded-full border border-line" />
            ),
          }}
        />
      </Tabs>
    </View>
  )
}
