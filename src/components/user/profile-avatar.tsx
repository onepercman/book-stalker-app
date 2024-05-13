import { useStore } from "@/libs/valtio"
import { userStore } from "@/stores/user.store"
import { FC } from "react"
import { Image, Pressable } from "react-native"

export const ProfileAvatar: FC = () => {
  const { user } = useStore(userStore)

  return (
    <Pressable>
      <Image source={{ uri: user?.avatar }} width={90} height={90} className="rounded bg-primary" />
    </Pressable>
  )
}
