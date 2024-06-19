import { useReadTime } from "@/hooks/use-read-time"
import { FontAwesome, Octicons } from "@expo/vector-icons"
import Constants from "expo-constants"
import { useMemo } from "react"
import { ActivityIndicator, Dimensions, SafeAreaView, ScrollView, Text, View } from "react-native"
import { BarChart } from "react-native-gifted-charts"

export default function () {
  const width = Dimensions.get("window").width

  const { data: day } = useReadTime("day")
  const { data: week } = useReadTime("week")
  const { data: month } = useReadTime("month")

  const totalDay = useMemo(
    function () {
      if (!day?.length) return "0 Phút"
      const total = day.reduce((acc, obj) => acc + obj.value, 0)
      var hours = Math.floor(total / 3600)
      var minutes = Math.floor((total % 3600) / 60)
      let text = ""
      if (hours) text += `${hours} Giờ `
      if (minutes) text += `${minutes} Phút`
      return text || "0 Phút"
    },
    [day],
  )

  const totalWeek = useMemo(
    function () {
      if (!week?.length) return "0 Phút"
      const total = week.reduce((acc, obj) => acc + obj.value, 0)
      var hours = Math.floor(total / 3600)
      var minutes = Math.floor((total % 3600) / 60)
      let text = ""
      if (hours) text += `${hours} Giờ `
      if (minutes) text += `${minutes} Phút`
      return text || "0 Phút"
    },
    [week],
  )

  const totalMonth = useMemo(
    function () {
      if (!month?.length) return "0 Phút"
      const total = month.reduce((acc, obj) => acc + obj.value, 0)
      var hours = Math.floor(total / 3600)
      var minutes = Math.floor((total % 3600) / 60)
      let text = ""
      if (hours) text += `${hours} Giờ `
      if (minutes) text += `${minutes} Phút`
      return text || "0 Phút"
    },
    [month],
  )

  if (!day || !week || !month)
    return (
      <SafeAreaView className="flex h-full">
        <ActivityIndicator className="m-auto" />
      </SafeAreaView>
    )

  return (
    <View>
      <View className="absolute h-40 w-full bg-primary" />
      <View>
        <ScrollView>
          <View className="flex flex-col gap-1 py-4" style={{ marginTop: Constants.statusBarHeight }}>
            <Text className="mx-auto text-xl font-medium text-invert">
              <FontAwesome size={16} name="dashboard" /> Tổng quan
            </Text>
          </View>
          <View>
            <View className="flex h-full">
              <View className="px-4 py-2">
                <View className="flex flex-col gap-4 rounded bg-primary-100 p-6">
                  <Text className="text-2xl font-semibold text-primary">
                    <Octicons size={18} name="clock" /> Thời gian đọc hôm nay
                  </Text>
                  <Text className="text-4xl font-bold text-primary">{totalDay}</Text>
                </View>
              </View>
              <View className="px-4 py-2">
                <View className="flex flex-col gap-4 rounded bg-primary-200 p-6">
                  <Text className="text-2xl font-semibold text-primary">
                    <Octicons size={18} name="clock" /> Thời gian đọc tuần này
                  </Text>
                  <Text className="text-4xl font-bold text-primary">{totalWeek}</Text>
                </View>
              </View>
              <View className="px-4 py-2">
                <View className="flex flex-col gap-4 rounded bg-primary-300 p-6">
                  <Text className="text-2xl font-semibold text-primary">
                    <Octicons size={18} name="clock" /> Thời gian đọc tháng này
                  </Text>
                  <Text className="text-4xl font-bold text-primary">{totalMonth}</Text>
                </View>
              </View>

              <View className="bg-white px-4 py-2">
                <Text className="mb-4 text-center text-xl font-medium text-primary">Biểu đồ ngày</Text>
                <BarChart
                  width={Dimensions.get("window").width - 32}
                  data={day.map((el) => ({
                    value: el.value,
                    label: el.time,
                  }))}
                  formatYLabel={function (e) {
                    if (+e >= 60 * 60) {
                      return Math.ceil(+e / 60 / 60) + "h"
                    }
                    if (+e >= 60) {
                      return Math.ceil(+e / 60) + "p" + Math.ceil(+e % 60) + "s"
                    }
                    return Math.ceil(+e) + "s"
                  }}
                  barWidth={22}
                  barBorderRadius={4}
                  frontColor="lightblue"
                  yAxisThickness={0}
                  xAxisThickness={0}
                  initialSpacing={0}
                  adjustToWidth
                />
              </View>
              <View className="bg-white px-4 py-2">
                <Text className="mb-4 text-center text-xl font-medium text-primary">Biểu đồ tuần</Text>
                <BarChart
                  width={Dimensions.get("window").width - 32}
                  data={week.map((el) => ({
                    value: el.value,
                    label: el.time,
                  }))}
                  formatYLabel={function (e) {
                    if (+e >= 60 * 60) {
                      return Math.ceil(+e / 60 / 60) + "h"
                    }
                    if (+e >= 60) {
                      return Math.ceil(+e / 60) + "p" + Math.ceil(+e % 60) + "s"
                    }
                    return Math.ceil(+e) + "s"
                  }}
                  barWidth={22}
                  barBorderRadius={4}
                  frontColor="lightblue"
                  yAxisThickness={0}
                  xAxisThickness={0}
                  initialSpacing={0}
                  adjustToWidth
                />
              </View>
              <View className="bg-white px-4 py-2">
                <Text className="mb-4 text-center text-xl font-medium text-primary">Biểu đồ tháng</Text>
                <BarChart
                  width={Dimensions.get("window").width - 32}
                  data={month.map((el) => ({
                    value: el.value,
                    label: el.time,
                  }))}
                  formatYLabel={function (e) {
                    if (+e >= 60 * 60) {
                      return Math.ceil(+e / 60 / 60) + "h"
                    }
                    if (+e >= 60) {
                      return Math.ceil(+e / 60) + "p" + Math.ceil(+e % 60) + "s"
                    }
                    return Math.ceil(+e) + "s"
                  }}
                  barWidth={22}
                  barBorderRadius={4}
                  frontColor="lightblue"
                  yAxisThickness={0}
                  xAxisThickness={0}
                  initialSpacing={0}
                  adjustToWidth
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  )
}
