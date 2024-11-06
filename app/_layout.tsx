import { Stack, Tabs } from "expo-router";
import { RecipeProvider } from "./RecipeContext";
import { useFonts } from "expo-font";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import {
  faBasketShopping,
  faBookBookmark,
  faBookOpen,
} from "@fortawesome/free-solid-svg-icons";

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
            elevation: 0,
            shadowOpacity: 0,
            borderTopWidth: 0,
          },
        }}
      >
        <Tabs.Screen
          name="calendar"
          options={{
            headerShown: false,
            tabBarLabel: () => null,
            tabBarActiveTintColor: "#306090",
            tabBarInactiveTintColor: "gray",
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcon icon={faCalendar} color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="home"
          options={{
            headerShown: false,
            tabBarLabel: () => null,
            tabBarActiveTintColor: "#306090",
            tabBarInactiveTintColor: "gray",
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcon
                icon={faBasketShopping}
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
            tabBarLabel: () => null,
            tabBarActiveTintColor: "#306090",
            tabBarInactiveTintColor: "gray",
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcon
                icon={faBookBookmark}
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tabs>
    </RecipeProvider>
  );
}
