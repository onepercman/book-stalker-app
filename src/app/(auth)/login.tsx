import { Button } from "@/components/ui/button";
import { createStore, useStore } from "@/libs/valtio";
import { useRouter } from "expo-router";
import EStorage from "expo-secure-store";
import { useEffect } from "react";
import { SafeAreaView, Text, TextInput } from "react-native";

class Todo {
  count = 1;

  inc() {
    this.count++;
  }
}

const todo = createStore(new Todo());

export default function () {
  const router = useRouter();

  useEffect(() => {
    console.log({ EStorage });
  }, []);

  const { count } = useStore(todo);

  function login() {
    todo.inc();
  }

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
      <Button className="self-end" onPress={login}>
        <Text>Login {count}</Text>
      </Button>
    </SafeAreaView>
  );
}
