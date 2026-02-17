import { ContainerSafeAreaView } from "@/components/customs/containers/ContainerSafeAreaView";
import { globalStyle } from "@/styles/globalStyles";
import { ScrollView, Text, View } from "react-native";

export default function Question() {
  return (
    <ContainerSafeAreaView>
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
          <Text>Komunitas</Text>
        </View>
      </ScrollView>
    </ContainerSafeAreaView>
  );
}
