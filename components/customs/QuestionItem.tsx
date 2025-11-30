import { StyleSheet, View } from "react-native";
import { TextInter } from "./texts/TextInter";

export interface Question {
  id: string;
  title: string;
  isFollowed: boolean;
  countFollowed: number;
  countAnswered: number;
}

export const QuestionItem = () => {
  return (
    <View style={styles.container}>
      <TextInter>Questions</TextInter>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexDirection: "row",
    flex: 1,
  },
});
