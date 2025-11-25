import { globalStyle } from "@/styles/globalStyles";
import { Link } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Community() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View
          style={[
            globalStyle.baseContainer,
            {
              width: "100%",
              paddingVertical: 0,
            },
          ]}
        >
          <Text>Community</Text>
          <Link href={"/(app)/story"}>Story</Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
