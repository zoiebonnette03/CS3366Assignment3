import { Stack, Tabs } from "expo-router";
import { RecipeProvider } from "./RecipeContext";
import { useFonts } from "expo-font";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    InterMedium: require("../assets/fonts/Inter_18pt-Medium.ttf"),
    InterRegular: require("../assets/fonts/Inter_18pt-Regular.ttf"),
    InterBold: require("../assets/fonts/Inter_24pt-Bold.ttf"),
    InterLightItalic: require("../assets/fonts/Inter_18pt-LightItalic.ttf"),
  });
  return (
    <RecipeProvider children={undefined}>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#F3EDE4",
            elevation: 0, // Remove shadow on Android
            shadowOpacity: 0,
            borderTopWidth: 0, // Remove the top border
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
            tabBarLabel: () => null,
            tabBarActiveTintColor: "#306090",
            tabBarInactiveTintColor: "#222222",
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcon icon={faCalendar} color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen name="home" options={{ headerShown: false }} />
      </Tabs>
    </RecipeProvider>
  );
}
