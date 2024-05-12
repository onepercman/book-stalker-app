import { Service } from "@/services/app.service"
import { Octicons } from "@expo/vector-icons"
import * as DocumentPicker from "expo-document-picker"
import { FC, Fragment, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Modal, TouchableOpacity, View } from "react-native"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

interface UploadBookDto {
  name: string
  thumbnail: string
  file: File
}

const DEFAULT_VALUES: Partial<UploadBookDto> = {
  name: undefined,
  thumbnail: undefined,
  file: undefined,
}

export const UploadBook: FC = () => {
  const [visible, setVisible] = useState(false)

  const form = useForm<UploadBookDto>()

  async function pickFile() {
    const { assets, canceled } = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
    })
    if (canceled) return
    const asset = assets[0] as Required<DocumentPicker.DocumentPickerAsset>
    const file = new File([asset.uri], "name")
    form.setValue("file", file)
    setVisible(true)
  }

  async function submit({ name, file }: UploadBookDto) {
    const { data, statusText } = await Service.book.upload(name, file)
    console.log("🚀 ~ submit ~ data:", data, statusText)
  }

  return (
    <Fragment>
      <Button
        variant="primary"
        className="absolute bottom-4 right-4"
        rightIcon={<Octicons name="upload" />}
        onPress={pickFile}
      >
        Upload now
      </Button>
      <Modal transparent visible={visible} animationType="fade" onRequestClose={() => setVisible(false)}>
        <TouchableOpacity className="h-full w-full" onPress={() => setVisible(false)}>
          <View className="flex flex-1 items-center justify-center bg-black/75 p-4">
            <TouchableOpacity
              className="w-full rounded-lg border border-line bg-background p-6 shadow-lg"
              activeOpacity={1}
            >
              <View className="flex flex-col gap-4">
                <Controller
                  control={form.control}
                  name="name"
                  rules={{ required: "Name is required" }}
                  render={({ field, fieldState }) => (
                    <Input
                      value={field.value}
                      onChangeText={field.onChange}
                      error={fieldState.error?.message}
                      placeholder="Enter the book name"
                    />
                  )}
                />
                <View className="flex flex-row gap-4">
                  <Button onPress={() => setVisible(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    onPress={form.handleSubmit(submit)}
                    className="flex-1"
                    loading={form.formState.isSubmitting}
                  >
                    Upload
                  </Button>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </Fragment>
  )
}
