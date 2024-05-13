import { useStore } from "@/libs/valtio"
import { appStore } from "@/stores/app.store"
import { FC } from "react"
import { ActivityIndicator, Modal, View } from "react-native"

export const Loader: FC = () => {
  const { loading } = useStore(appStore)

  return (
    <Modal transparent animationType="fade" visible={loading}>
      <View className="flex flex-1 items-center justify-center bg-black/75">
        <ActivityIndicator color="white" size="large" />
      </View>
    </Modal>
  )
}
