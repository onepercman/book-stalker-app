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

  async function submit({ title, time }: Schedule) {
    const { data, statusText } = await Service.schedule.create({ title, time })
    if (data) {
      refetch()
      form.reset({
        title: "",
        time: Date.now(),
      })
    } else {
      form.setError("root", statusText as any)
    }
  }

  return (
    <View className="p-4">
      <Dialog>
        <DialogTrigger>
          <Button leftIcon={<Octicons name="plus" />}>Add schedule</Button>
        </DialogTrigger>
        <DialogContent className="flex w-full max-w-sm flex-col gap-2">
          <Text className="text-xl font-semibold">Add new schedule</Text>
          <View className="flex flex-row gap-2">
            <Controller
              control={form.control}
              name="title"
              render={({ field }) => (
                <Input value={field.value} onChangeText={field.onChange} placeholder="Title" className="grow" />
              )}
            />
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
          </View>
          <Text className="text-error">{form.formState.errors.root?.message}</Text>
          <Button variant="primary" onPress={form.handleSubmit(submit)}>
            OK
          </Button>
        </DialogContent>
      </Dialog>
      <FlatList
        className="h-full"
        numColumns={3}
        data={data}
        keyExtractor={(e) => e._id}
        renderItem={({ item }) => (
          <View className="flex flex-row items-center justify-between gap-4">
            <View className="flex flex-row items-center gap-4">
              <Text>{item.title}</Text>
              <Text>{moment(item.time).format("ll")}</Text>
            </View>
            <Button leftIcon={<Octicons name="trash" />} />
          </View>
        )}
      />
    </View>
  )
}
