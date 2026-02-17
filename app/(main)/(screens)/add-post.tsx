import { ButtonOutline } from "@/components/buttons/ButtonOutline";
import { ButtonSolid } from "@/components/buttons/ButtonSolid";
import { ContainerSafeAreaView } from "@/components/containers/ContainerSafeAreaView";
import { HomePostForm } from "@/components/pages/home/post/HomePostForm";
import { HomeQuestionForm } from "@/components/pages/home/question/HomeQuestionForm";
import {
  PostType,
  useAddPostMutations,
  useAddPostStore,
} from "@/hooks/stores/useAddPostStore";
import { colors } from "@/styles/colors";
import { globalStyle } from "@/styles/globalStyles";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { dummyCommunities } from "./list-communities";

export default function ModalAddPost() {
  const router = useRouter();
  const { postType, isLoading, setShareTo, setPostType } = useAddPostStore();
  const { addPostMutation, addQuestionMutation } = useAddPostMutations();
  const isPost = postType === PostType.POST;

  useEffect(() => {
    if (postType === PostType.POST) {
      setShareTo(dummyCommunities[0]);
    }
  }, [postType]);

  return (
    <ContainerSafeAreaView>
      <View
        style={[
          globalStyle.baseContainer,
          {
            padding: 0,
            gap: 16,
          },
        ]}
      >
        {/* Header */}
        <View
          style={[
            globalStyle.containerRow,
            {
              paddingHorizontal: 16,
              justifyContent: "space-between",
            },
          ]}
        >
          <Pressable
            onPress={() => {
              if (isLoading) return;
              router.back();
              // Alert.alert(
              //   "Yakin ingin membatalkan?",
              //   "Data yang sudah diisi sebelumnya akan hilang.",
              //   [
              //     { text: "Tidak", style: "cancel" },
              //     {
              //       text: "Ya, Batalkan",
              //       style: "destructive",
              //       onPress: () => {
              //         router.back();
              //       },
              //     },
              //   ],
              // );
            }}
          >
            <AntDesign name="close" size={20} color={colors.primaryBlack} />
          </Pressable>

          <View style={globalStyle.containerRow}>
            <ButtonOutline
              title={isPost ? "Tanya" : "Post"}
              onPress={() => {
                const setTo = isPost ? PostType.QUESTION : PostType.POST;
                setPostType(setTo);
              }}
              buttonStyle={styles.button}
              textStyle={styles.buttonText}
              disabled={isLoading}
              isLoading={isLoading}
            />

            <ButtonSolid
              title={"Publish"}
              onPress={() => {
                if (isPost) {
                  addPostMutation.mutate();
                  return;
                }

                return addQuestionMutation.mutate();
              }}
              buttonStyle={styles.button}
              textStyle={styles.buttonText}
              disabled={isLoading}
              isLoading={isLoading}
            />
          </View>
        </View>

        {isPost ? <HomePostForm /> : <HomeQuestionForm />}
      </View>
    </ContainerSafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  buttonText: {
    fontSize: 12,
  },
});
