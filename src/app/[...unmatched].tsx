import { Link } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotFoundScreen() {
  return (
    <SafeAreaView>
      <View>
        <Link href="/" className="mt-4 py-4">
          <Text className="text-base text-blue-600">Go to home screen!</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
}
