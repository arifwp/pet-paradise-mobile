import { ButtonBackNavigation } from "@/components/customs/buttons/ButtonBackNavigation";
import { ButtonSolid } from "@/components/customs/buttons/ButtonSolid";
import { ContainerSafeAreaView } from "@/components/customs/containers/ContainerSafeAreaView";
import { colors } from "@/styles/colors";
import { globalStyle } from "@/styles/globalStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

enum Display {
  QUESTION = "question",
  INFO = "info",
}

export default function ModalAnswerQuestion() {
  const { postId } = useLocalSearchParams<{ postId: string }>();
  const [selectedDisplay, setSelectedDisplay] = useState<Display>(
    Display.QUESTION,
  );

  const isDisplayQuestion = selectedDisplay === Display.QUESTION;

  return (
    <ContainerSafeAreaView>
      <View
        style={[
          globalStyle.baseContainer,
          {
            paddingTop: 0,
          },
        ]}
      >
        {/* HEADER */}
        <View
          style={[
            globalStyle.containerRow,
            {
              height: 40,
              justifyContent: "space-between",
            },
          ]}
        >
          <ButtonBackNavigation
            icon={
              <MaterialCommunityIcons
                name="window-close"
                size={24}
                color={colors.primaryBlack}
              />
            }
          />

          <View style={[globalStyle.containerRow]}>
            <MaterialCommunityIcons
              name="information-slab-circle-outline"
              size={24}
              color={colors.primaryBlack}
              onPress={() => setSelectedDisplay(Display.INFO)}
            />

            <ButtonSolid
              title="Kirimkan"
              onPress={() => {
                console.log("send");
              }}
            />
          </View>
        </View>

        {/* BODY */}
        <View></View>
      </View>
    </ContainerSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
});
