import { TextInter } from "@/components/texts/TextInter";
import { colors } from "@/styles/colors";
import { globalStyle } from "@/styles/globalStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";

export const HomeQuestionAnswerButton = ({
  postId,
}: {
  postId: string | undefined;
}) => {
  return (
    <Link
      style={[
        globalStyle.containerRow,
        {
          gap: 4,
        },
      ]}
      href={`/(main)/(modals)/answer-question?postId=${postId}`}
    >
      <MaterialCommunityIcons
        name="text-box-edit-outline"
        size={14}
        color={colors.primaryBlack}
      />

      <TextInter
        style={{
          fontSize: 12,
          color: colors.primaryBlack,
          fontWeight: 500,
        }}
      >
        Jawab
      </TextInter>
    </Link>
  );
};
