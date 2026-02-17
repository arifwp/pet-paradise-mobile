import { ImageBase } from "@/components/imgs/ImageBase";
import { InputLongText } from "@/components/inputs/InputLongText";
import { useAddPostStore } from "@/hooks/stores/useAddPostStore";
import { globalStyle } from "@/styles/globalStyles";
import { View } from "react-native";

export const HomeQuestionForm = () => {
  const { question, setQuestion } = useAddPostStore();

  return (
    <View
      style={[
        globalStyle.containerRow,
        {
          marginHorizontal: 16,
          gap: 12,
          alignItems: "flex-start",
        },
      ]}
    >
      <ImageBase
        source="https://placehold.co/500x500.png"
        style={globalStyle.avatar}
      />

      <InputLongText
        value={question}
        onValueChange={setQuestion}
        maxLength={1000}
      />
    </View>
  );
};
