import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { userStore } from "@/stores/user.store"
import { useNavigation, useRouter } from "expo-router"
import { Controller, useForm } from "react-hook-form"
import { KeyboardAvoidingView, SafeAreaView, Text, View } from "react-native"

interface LoginDto {
  email: string
  password: string
  rePassword: string
}

export default function () {
  const router = useRouter()
  const navigation = useNavigation()

  const form = useForm<LoginDto>({
    mode: "all",
  })

  async function submit({ email, password }: LoginDto) {
    const { data, statusText } = await userStore.register(email, password)

    if (data) {
      router.push("/(root)/home")
    } else {
      if (statusText.toLowerCase().includes("email") || statusText.includes("user")) {
        form.setError("email", { message: statusText })
      } else {
        form.setError("password", { message: statusText })
      }
    }
  }

  return (
    <KeyboardAvoidingView>
      <SafeAreaView>
        <View className="flex h-full flex-col items-center justify-center gap-4 p-4">
          <Text className="text-3xl font-semibold text-primary">Tạo tài khoản mới</Text>
          <Controller
            control={form.control}
            name="email"
            rules={{
              required: "Hãy điền email của bạn",
              pattern: {
                value: RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"),
                message: "Email không hợp lệ",
              },
            }}
            render={({ field, fieldState }) => (
              <Input
                value={field.value}
                onChangeText={field.onChange}
                error={fieldState.error?.message}
                textContentType="emailAddress"
                placeholder="Email"
                className="w-full"
              />
            )}
          />
          <Controller
            control={form.control}
            name="password"
            rules={{ required: "Hãy điền mật khẩu của bạn" }}
            render={({ field, fieldState }) => (
              <Input
                value={field.value}
                onChangeText={field.onChange}
                error={fieldState.error?.message}
                secureTextEntry
                textContentType="password"
                placeholder="Mật khẩu"
                className="w-full"
              />
            )}
          />
          <Controller
            control={form.control}
            name="rePassword"
            rules={{
              required: "Hãy nhập mật khẩu xác nhận",
              validate: {
                check(rePass, { password }) {
                  return rePass === password || "Mật khẩu xác nhận chưa chính xác"
                },
              },
            }}
            render={({ field, fieldState }) => (
              <Input
                value={field.value}
                onChangeText={field.onChange}
                error={fieldState.error?.message}
                secureTextEntry
                textContentType="password"
                placeholder="Xác nhận mật khẩu"
                className="w-full"
              />
            )}
          />
          <View className="flex w-full flex-row gap-4">
            <Button className="flex-1" onPress={() => navigation.goBack()}>
              <Text>Quay lại</Text>
            </Button>
            <Button variant="primary" className="flex-1" onPress={form.handleSubmit(submit)}>
              <Text>Đăng ký</Text>
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}
