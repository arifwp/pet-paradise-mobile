import { globalStyle } from "@/styles/globalStyles";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Adopt() {
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
          <Text>Adopt</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
