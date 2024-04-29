import { FlatList, SafeAreaView, Text, View } from "react-native";

export default function () {
  return (
    <SafeAreaView>
      <View>
        <FlatList
          className="grid grid-cols-2"
          data={Array(20)
            .fill(0)
            .map((el) => ({
              id: 1,
              name: "Dummy",
            }))}
          renderItem={({ item }) => (
            <View className="grow border">
              <Text>
                {item.id} - {item.name}
              </Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
        />
      </View>
    </SafeAreaView>
  );
}
