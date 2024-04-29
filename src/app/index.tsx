import { Button } from "@/components/button";
import { Octicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, SafeAreaView, Text, View } from "react-native";

export default function () {
  const router = useRouter();

  return (
    <SafeAreaView className="flex h-screen w-screen flex-col items-center justify-between">
      <View className="grow flex flex-col justify-center items-center text-center">
        <Text className="text-6xl font-semibold">BookStalker</Text>
        <Text>Simple stalking your reading process</Text>
        <Button
          className="mt-4 self-stretch"
          onPress={() => router.push("/(auth)/login")}
          rightIcon={<Octicons name="arrow-right" />}
        >
          Login
        </Button>
      </View>

      <Pressable
        onPress={() => router.push("/(auth)/register")}
        className="active:scale-125"
      >
        <Text>Don't have an account yet? Register</Text>
      </Pressable>
    </SafeAreaView>
  );
}
