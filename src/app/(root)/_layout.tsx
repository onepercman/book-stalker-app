import { useStore } from "@/libs/valtio"
import { userStore } from "@/stores/user.store"
import { Entypo } from "@expo/vector-icons"
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
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.violet[500],
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
            tabBarIcon: ({ color }) => <Entypo size={16} name="compass" color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: user.name,
            tabBarIcon: () => <Image width={16} height={16} source={{ uri: user.avatar }} className="rounded-full" />,
          }}
        />
      </Tabs>
    </View>
  )
}
