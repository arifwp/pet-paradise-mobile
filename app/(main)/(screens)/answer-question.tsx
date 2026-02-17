import { ButtonBackNavigation } from "@/components/buttons/ButtonBackNavigation";
import { ButtonSolid } from "@/components/buttons/ButtonSolid";
import { ContainerSafeAreaView } from "@/components/containers/ContainerSafeAreaView";
import { ImageBase } from "@/components/imgs/ImageBase";
import { InputLongText } from "@/components/inputs/InputLongText";
import { TextInter } from "@/components/texts/TextInter";
import { errMsg } from "@/constants/error";
import { useAuthStore } from "@/hooks/stores/useAuthStore";
import { colors } from "@/styles/colors";
import { globalStyle } from "@/styles/globalStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Toast } from "toastify-react-native";

enum Display {
  QUESTION = "question",
  INFO = "info",
}

export default function ModalAnswerQuestion() {
  const { postId, question } = useLocalSearchParams<{
    postId: string;
    question: string;
  }>();
  const { user } = useAuthStore();
  const [selectedDisplay, setSelectedDisplay] = useState<Display>(
    Display.QUESTION,
  );
  const [answer, setAnswer] = useState<string>("");
  const isDisplayQuestion = selectedDisplay === Display.QUESTION;

  const sendAnswerMutation = useMutation({
    mutationFn: async () => {
      console.log("postId", postId);

      return true;
    },
    onSuccess: () => {
      Toast.success("Berhasil mengirimkan jawaban");
    },
    onError: (error) => {
      Toast.error(error?.message || errMsg.common);
    },
  });

  return (
    <ContainerSafeAreaView>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
        }}
        keyboardShouldPersistTaps="handled"
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
                  onPress={() => sendAnswerMutation.mutate()}
                  disabled={sendAnswerMutation.isPending}
                  isLoading={sendAnswerMutation.isPending}
                />
              </View>
            </View>

            {/* BODY */}
            <View
              style={[
                globalStyle.containerColumn,
                {
                  flex: 1,
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                },
              ]}
            >
              <View
                style={[
                  globalStyle.containerRow,
                  {
                    gap: 8,
                  },
                ]}
              >
                <ImageBase
                  source="https://placehold.co/500x500.png"
                  style={[globalStyle.avatar, styles.avatar]}
                />

                <TextInter style={styles.name}>{user?.name}</TextInter>
              </View>

              <TextInter style={styles.question}>{question}</TextInter>

              <InputLongText
                value={answer}
                onValueChange={setAnswer}
                placeholder="Tulis jawaban kamu"
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </ContainerSafeAreaView>
  );
}

const styles = StyleSheet.create({
  avatar: {
    height: 30,
    width: 30,
  },
  name: {
    fontWeight: 600,
    color: colors.secondaryText,
    fontSize: 12,
  },
  question: {
    fontWeight: 500,
  },
});
