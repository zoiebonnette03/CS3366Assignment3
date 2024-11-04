import { Stack, Tabs } from "expo-router";
import { RecipeProvider } from "./RecipeContext";
import { useFonts } from "expo-font";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    InterMedium: require("../assets/fonts/Inter_18pt-Medium.ttf"),
    InterRegular: require("../assets/fonts/Inter_18pt-Regular.ttf"),
    InterBold: require("../assets/fonts/Inter_24pt-Bold.ttf"),
    InterLightItalic: require("../assets/fonts/Inter_18pt-LightItalic.ttf"),
  });
  return (
    <RecipeProvider>
      <Tabs>
        <Tabs.Screen name="index" />
        <Tabs.Screen name="home" />
      </Tabs>
    </RecipeProvider>
  );
}
