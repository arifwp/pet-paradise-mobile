import { useAddPostStore } from "@/hooks/stores/useAddPostStore";
import { colors } from "@/styles/colors";
import { globalStyle } from "@/styles/globalStyles";
import { StyleSheet, TextInput } from "react-native";

export const HomeInputQuestion = () => {
  const { question, setQuestion } = useAddPostStore();

  return (
    <TextInput
      editable
      multiline
      maxLength={1000}
      onChangeText={(text) => setQuestion(text)}
      value={question ?? ""}
      autoCorrect={false}
      autoCapitalize="none"
      placeholder="Tulis pertanyaan kamu..."
      style={[globalStyle.input, styles.input]}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: "auto",
    borderWidth: 0,
    paddingBottom: 16,
    borderRadius: 0,
    padding: 0,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral400,
    flex: 1,
  },
});
