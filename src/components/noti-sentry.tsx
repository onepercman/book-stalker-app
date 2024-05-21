import { useScheduleList } from "@/hooks/use-schedule-list"
import * as Notifications from "expo-notifications"
import moment from "moment"
import { useEffect } from "react"

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
})

export function NotiSentry() {
  const { data: schedules } = useScheduleList()

  async function execSchedule() {
    const data = await Notifications.requestPermissionsAsync()
    if (!data.granted || !schedules?.length) return

    await Notifications.cancelAllScheduledNotificationsAsync()

    schedules.forEach(function (schedule) {
      Notifications.scheduleNotificationAsync({
        content: {
          title: "BookStalker 👋👋👋",
          body: schedule.title || "Đã đến giờ đọc sách, đừng bỏ lỡ thói quen của bạn nhé!",
          sound: true,
        },
        trigger: {
          hour: moment(schedule.time).hours(),
          minute: moment(schedule.time).minutes(),
          repeats: true,
        },
      })
    })
  }

  useEffect(() => {
    execSchedule()
  }, [schedules])

  return null
}
