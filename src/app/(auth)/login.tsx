import { Button } from "@/components/ui/button";
import { useRouter } from "expo-router";
import { SafeAreaView, Text, TextInput } from "react-native";

export default function () {
  const router = useRouter();

  return (
    <SafeAreaView className="flex h-screen flex-col items-center justify-center gap-4">
      <Text className="text-3xl font-bold text-white">Login</Text>
      <TextInput
        className="h-16 w-full rounded border border-muted p-2 text-white"
        placeholder="Email"
      />
      <TextInput
        textContentType="password"
        className="h-16 w-full rounded border border-muted p-2 text-white"
        placeholder="Password"
      />
      <Button className="self-end">
        <Text>Login</Text>
      </Button>
    </SafeAreaView>
  );
}
