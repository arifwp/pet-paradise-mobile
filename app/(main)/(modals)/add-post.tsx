import { ButtonOutline } from "@/components/customs/buttons/ButtonOutline";
import { ButtonSolid } from "@/components/customs/buttons/ButtonSolid";
import { ContainerSafeAreaView } from "@/components/customs/containers/ContainerSafeAreaView";
import { AddPostForm } from "@/components/customs/pages/home/post/AddPostForm";
import { AddQuestionForm } from "@/components/customs/pages/home/question/AddQuestionForm";
import {
  PostType,
  useAddPostMutations,
  useAddPostStore,
} from "@/hooks/stores/useAddPostStore";
import { colors } from "@/styles/colors";
import { globalStyle } from "@/styles/globalStyles";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Alert, Pressable, View } from "react-native";

export default function ModalAddPost() {
  const router = useRouter();
  const { postType, isLoading, setPostType } = useAddPostStore();
  const { addPostMutation, addQuestionMutation } = useAddPostMutations();
  const isPost = postType === PostType.POST;

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

              Alert.alert(
                "Yakin ingin membatalkan?",
                "Data yang sudah diisi sebelumnya akan hilang.",
                [
                  { text: "Tidak", style: "cancel" },
                  {
                    text: "Ya, Batalkan",
                    style: "destructive",
                    onPress: () => {
                      router.back();
                    },
                  },
                ],
              );
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
              disabled={isLoading}
              isLoading={isLoading}
            />
          </View>
        </View>

        {isPost ? <AddPostForm /> : <AddQuestionForm />}
      </View>
    </ContainerSafeAreaView>
  );
}
