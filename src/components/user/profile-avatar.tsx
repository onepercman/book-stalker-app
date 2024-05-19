import { useStore } from "@/libs/valtio"
import { userStore } from "@/stores/user.store"
import { FC } from "react"
import { Image, Pressable } from "react-native"

export const ProfileAvatar: FC = () => {
  const { user } = useStore(userStore)

  return (
    <Pressable onPress={() => userStore.updateAvatar()}>
      <Image
        source={{ uri: user?.avatar }}
        width={90}
        height={90}
        resizeMode="cover"
        className="rounded-full bg-primary"
      />
    </Pressable>
  )
}
