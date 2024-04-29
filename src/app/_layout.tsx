import { ToastProvider } from "@/components/toast";
import { useStore } from "@/libs/valtio";
import { userStore } from "@/stores/user.store";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import "../styles/globals.css";

export default function () {
  const { user } = useStore(userStore);

  const router = useRouter();

  useEffect(() => {
    router.push("/(root)/home");
  }, []);

  return (
    <ToastProvider position="top">
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(root)" />
      </Stack>
    </ToastProvider>
  );
}
