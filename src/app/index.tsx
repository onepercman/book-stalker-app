import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, SafeAreaView, View } from "react-native";

export default function () {
  const { push } = useRouter();

  return (
    <SafeAreaView className="flex h-screen w-screen flex-col items-center justify-between">
      <View className="grow flex flex-col justify-center">
        <Text className="text-6xl">BookStalker</Text>
        <Text>Simple stalking your reading process</Text>
        <Button
          className="mt-4 min-w-[15rem]"
          onPress={() => push("/(auth)/login")}
        >
          <Text>
            Login <AntDesign name="login" />
          </Text>
        </Button>
      </View>

      <Pressable
        onPress={() => push("/(auth)/register")}
        className="active:scale-125"
      >
        <Text>Don't have an account yet? Register</Text>
      </Pressable>
    </SafeAreaView>
  );
}
