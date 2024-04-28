import { cn } from "@/lib/utils";
import { useColorScheme } from "@/libs/useColorScheme";
import { AntDesign } from "@expo/vector-icons";
import { Pressable, View } from "react-native";

export function ThemeToggle() {
  const { isDarkColorScheme, setColorScheme } = useColorScheme();
  return (
    <Pressable
      onPress={() => {
        const newTheme = isDarkColorScheme ? "light" : "dark";
        setColorScheme(newTheme);
      }}
      className="web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2"
    >
      {({ pressed }) => (
        <View
          className={cn(
            "aspect-square flex-1 items-start justify-center pt-0.5 web:px-5",
            pressed && "opacity-70",
          )}
        >
          {isDarkColorScheme ? (
            <AntDesign
              name="Safety"
              className="text-foreground"
              size={23}
              strokeWidth={1.25}
            />
          ) : (
            <AntDesign
              name="Safety"
              className="text-foreground"
              size={24}
              strokeWidth={1.25}
            />
          )}
        </View>
      )}
    </Pressable>
  );
}
