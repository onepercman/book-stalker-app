import { cn } from "@/libs/utils"
import { LinearGradient } from "expo-linear-gradient"
import { useRouter } from "expo-router"
import { FC } from "react"
import { ImageBackground, Pressable, Text } from "react-native"

export const BookCard: FC<{ data: Book; className?: string }> = ({ data, className }) => {
  const router = useRouter()

  return (
    <Pressable className={cn("h-56 w-full p-2", className)} onPress={() => router.push(`/${data._id}`)}>
      <ImageBackground
        source={{ uri: data.thumbnail }}
        className="flex h-full flex-col justify-end gap-4 overflow-hidden rounded-xl"
      >
        <LinearGradient
          colors={["transparent", "black"]}
          locations={[0, 0.8]}
          style={{
            height: 60,
            justifyContent: "flex-end",
            padding: 4,
          }}
        >
          <Text className="line-clamp-2 text-center text-sm font-medium text-invert">{data.name}</Text>
        </LinearGradient>
      </ImageBackground>
    </Pressable>
  )
}
