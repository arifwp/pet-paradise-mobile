import { TextInter } from "@/components/customs/texts/TextInter";
import { globalStyle } from "@/styles/globalStyles";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.sv}>
        <View
          style={[
            globalStyle.baseContainer,
            {
              width: "100%",
              paddingVertical: 0,
            },
          ]}
        >
          <TextInter>Sign Out</TextInter>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sv: {},
});
