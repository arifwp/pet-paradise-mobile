import { TextInter } from "@/components/texts/TextInter";
import { colors } from "@/styles/colors";
import { StyleSheet, View } from "react-native";
import { Question, QuestionItem } from "./QuestionItem";

export const HomeQuestionFeedLayout = ({
  questions,
}: {
  questions: Question[];
}) => {
  return (
    <View style={styles.questionsWrapper}>
      {/* Title */}
      <View style={styles.questionsTitleContainer}>
        <TextInter style={styles.questionsTitle}>
          Lihat juga pertanyaan disusun untuk anda
        </TextInter>
      </View>

      {/* List of Questions */}
      <View style={styles.questionsListContainer}>
        {questions.map((question, idx) => (
          <View key={question.id}>
            <QuestionItem data={question} />
            {/* Separator antar question */}
            {idx < questions.length - 1 && (
              <View style={styles.questionSeparator} />
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  questionsWrapper: {
    backgroundColor: colors.neutral50,
    paddingVertical: 16,
  },
  questionsTitleContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  questionsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.primaryBlack,
  },
  questionsListContainer: {
    backgroundColor: colors.white,
  },
  questionSeparator: {
    height: 1,
    backgroundColor: colors.neutral100,
  },
});
