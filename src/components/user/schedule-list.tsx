import { useScheduleList } from "@/hooks/use-schedule-list"
import { Service } from "@/services/app.service"
import { Octicons } from "@expo/vector-icons"
import TimePicker from "@react-native-community/datetimepicker"
import moment from "moment"
import { FC } from "react"
import { Controller, useForm } from "react-hook-form"
import { FlatList, Text, View } from "react-native"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"
import { Input } from "../ui/input"

export const ScheduleList: FC = () => {
  const { data, refetch } = useScheduleList()

  const form = useForm<Schedule>({
    mode: "all",
    defaultValues: {
      time: Date.now(),
    },
  })

  async function submit({ title, time }: Schedule, callback: () => void) {
    const { data, statusText } = await Service.schedule.create({ title, time })
    if (data) {
      refetch()
      form.reset({
        title: "",
        time: Date.now(),
      })
      callback()
    } else {
      form.setError("root", statusText as any)
    }
  }

  async function deleteSchedule(id: string) {
    const { data } = await Service.schedule.delete(id)
    if (data) refetch()
  }

  return (
    <View className="p-4">
      <Dialog>
        <DialogTrigger>
          <Button variant="primary" leftIcon={<Octicons name="plus" />} className="mb-4">
            Thêm lịch đọc
          </Button>
        </DialogTrigger>
        <DialogContent className="flex w-full max-w-sm flex-col gap-2">
          {({ setOpen }) => (
            <>
              <Text className="text-xl font-semibold">Thêm lịch đọc</Text>
              <View className="flex flex-row gap-2">
                <Controller
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <TimePicker
                      value={new Date(field.value)}
                      onChange={function (e) {
                        field.onChange(e.nativeEvent.timestamp)
                      }}
                      mode="time"
                    />
                  )}
                />
                <Controller
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <Input
                      value={field.value}
                      onChangeText={field.onChange}
                      placeholder="Tiêu đề (không bắt buộc)"
                      maxLength={15}
                      className="grow"
                    />
                  )}
                />
              </View>
              <Text className="text-error">{form.formState.errors.root?.message}</Text>
              <Button
                variant="primary"
                onPress={form.handleSubmit((values) =>
                  submit(values, function () {
                    setOpen(false)
                  }),
                )}
              >
                OK
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
      <FlatList
        className="h-full"
        data={data}
        keyExtractor={(e) => e._id}
        renderItem={({ item }) => (
          <View className="py-2">
            <View className="flex flex-row items-center justify-between gap-4 rounded border border-primary p-2">
              <View className="flex flex-row items-center gap-4">
                <Text className="font-semibold text-primary-700">{moment(item.time).format("HH:mm")}</Text>
                <Text numberOfLines={1} ellipsizeMode="tail">
                  {item.title}
                </Text>
              </View>
              <Button leftIcon={<Octicons name="trash" />} onPress={() => deleteSchedule(item._id)} />
            </View>
          </View>
        )}
      />
    </View>
  )
}
