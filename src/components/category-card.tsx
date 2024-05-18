import { cn } from "@/libs/utils"
import { useRouter } from "expo-router"
import { FC } from "react"
import { ImageBackground, Pressable, Text, View } from "react-native"

export const CategoryCard: FC<{ data: Category; className?: string }> = ({ data, className }) => {
  const router = useRouter()

  return (
    <Pressable
      className={cn("h-56 w-full p-2", className)}
      onPress={() => router.push(`/explore?category=${data._id}`)}
    >
      <ImageBackground
        source={{ uri: data.image }}
        className="relative flex h-full w-full flex-col gap-4 overflow-hidden rounded-xl"
      >
        <View className="absolute flex h-full w-full justify-center bg-black/60 text-center">
          <Text className="line-clamp-2 text-center text-lg font-semibold text-invert">{data.name}</Text>
        </View>
      </ImageBackground>
    </Pressable>
  )
}
