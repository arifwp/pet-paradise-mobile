import { useAddPostStore } from "@/hooks/stores/useAddPostStore";
import { globalStyle } from "@/styles/globalStyles";
import { StyleSheet, TextInput } from "react-native";

export const HomeInputPost = () => {
  const { content, setContent } = useAddPostStore();

  return (
    <TextInput
      editable
      multiline
      maxLength={1000}
      onChangeText={(text) => setContent(text)}
      value={content ?? ""}
      autoCorrect={false}
      autoCapitalize="none"
      placeholder="Tulis postingan kamu..."
      style={[globalStyle.input, styles.input]}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: "auto",
    minHeight: 40,
    borderWidth: 0,
    padding: 0,
    borderRadius: 0,
  },
});
