import { Text, View } from "react-native";
import { GlobalText } from "@/components/GlobalText";

export default function Home() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/home.tsx to edit this screen.</Text>
      <GlobalText type="title">testing regular font.</GlobalText>
    </View>
  );
}
