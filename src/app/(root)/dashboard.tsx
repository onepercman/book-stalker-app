import { useReadTime } from "@/hooks/use-read-time"
import { FontAwesome, Octicons } from "@expo/vector-icons"
import Constants from "expo-constants"
import { useMemo } from "react"
import { Dimensions, ScrollView, Text, View } from "react-native"
import { LineChart } from "react-native-chart-kit"
import Carousel from "react-native-reanimated-carousel"

export default function () {
  const width = Dimensions.get("window").width

  const { data: day } = useReadTime("day")
  const { data: week } = useReadTime("week")
  const { data: month } = useReadTime("month")

  const totalDay = useMemo(
    function () {
      if (!day?.length) return "0 Phút"
      const total = day.reduce((acc, obj) => acc + obj.value, 0)
      var hours = Math.floor(total / 3600000)
      var minutes = Math.floor((total % 3600000) / 60000)
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
      var hours = Math.floor(total / 3600000)
      var minutes = Math.floor((total % 3600000) / 60000)
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
      var hours = Math.floor(total / 3600000)
      var minutes = Math.floor((total % 3600000) / 60000)
      let text = ""
      if (hours) text += `${hours} Giờ `
      if (minutes) text += `${minutes} Phút`
      return text || "0 Phút"
    },
    [month],
  )

  return (
    <View>
      <View className="-mb-16 h-40 w-full bg-primary p-4" style={{ paddingTop: Constants.statusBarHeight }}>
        <Text className="mx-auto text-xl font-medium text-invert">
          <FontAwesome size={16} name="dashboard" /> Tổng quan
        </Text>
      </View>
      <View>
        <ScrollView className="flex h-full">
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

          <View className="px-4 py-2">
            <Carousel
              loop={false}
              style={{ width: width }}
              data={["day", "week", "month"]}
              width={width}
              height={300}
              renderItem={function ({ index }) {
                const data = [day, week, month][index]
                if (!data) return <View></View>
                return (
                  <LineChart
                    data={{
                      labels: data.map((item) => item.time),
                      datasets: [
                        {
                          data: data.map((el) => el.value),
                        },
                      ],
                    }}
                    width={Dimensions.get("window").width - 32}
                    height={220}
                    withDots={false}
                    yAxisLabel="$"
                    yAxisSuffix="k"
                    yAxisInterval={1}
                    chartConfig={{
                      backgroundColor: "#e26a00",
                      backgroundGradientFrom: "#fb2722",
                      backgroundGradientTo: "#ffa726",
                      decimalPlaces: 2,
                      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                      style: { borderRadius: 16 },
                    }}
                    bezier
                    style={{
                      borderRadius: 4,
                    }}
                  />
                )
              }}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  )
}
