import { Loader } from "@/components/loader"
import { ToastProvider } from "@/components/ui/toast"
import { queryClient } from "@/libs/react-query"
import { useStore } from "@/libs/valtio"
import { userStore } from "@/stores/user.store"
import { ReaderProvider } from "@epubjs-react-native/core"
import { QueryClientProvider } from "@tanstack/react-query"
import { Stack, useRouter } from "expo-router"
import { useEffect } from "react"
import { LogBox } from "react-native"
import "../styles/globals.css"
LogBox.ignoreAllLogs()

export default function () {
  const { user } = useStore(userStore)

  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.replace("/(root)/home")
    } else {
      router.replace("/")
    }
  }, [user])

  return (
    <ReaderProvider>
      <QueryClientProvider client={queryClient}>
        <Loader />
        <ToastProvider position="top">
          <Stack screenOptions={{ gestureEnabled: false }}>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(root)" options={{ headerShown: false }} />
            <Stack.Screen name="[id]" options={{ presentation: "modal", headerShown: false, gestureEnabled: true }} />
            <Stack.Screen name="reading/[id]" options={{ headerShown: false, gestureEnabled: true }} />
          </Stack>
        </ToastProvider>
      </QueryClientProvider>
    </ReaderProvider>
  )
}
