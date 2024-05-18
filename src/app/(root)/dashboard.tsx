import { Dimensions, SafeAreaView, ScrollView, Text, View } from "react-native"
import { LineChart } from "react-native-chart-kit"

export default function () {
  return (
    <SafeAreaView>
      <ScrollView className="flex h-full">
        <View className="px-4 py-2">
          <View className="flex flex-col gap-4 rounded bg-primary p-6">
            <Text className="text-2xl font-semibold text-invert">Thời gian đọc hôm nay</Text>
            <Text className="text-4xl font-bold text-invert">2 giờ 5 phút</Text>
          </View>
        </View>
        <View className="px-4 py-2">
          <View className="flex flex-col gap-4 rounded bg-primary-400 p-6">
            <Text className="text-2xl font-semibold text-invert">Thời gian đọc tuần này</Text>
            <Text className="text-4xl font-bold text-invert">2 giờ 5 phút</Text>
          </View>
        </View>
        <View className="px-4 py-2">
          <View className="flex flex-col gap-4 rounded bg-primary-300 p-6">
            <Text className="text-2xl font-semibold text-invert">Thời gian đọc tháng này</Text>
            <Text className="text-4xl font-bold text-invert">2 giờ 5 phút</Text>
          </View>
        </View>

        <View className="px-4 py-2">
          <LineChart
            data={{
              labels: ["January", "February", "March", "April", "May", "June"],
              datasets: [
                {
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                  ],
                },
              ],
            }}
            width={Dimensions.get("window").width - 32}
            height={220}
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
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726",
              },
            }}
            bezier
            style={{
              borderRadius: 8,
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
