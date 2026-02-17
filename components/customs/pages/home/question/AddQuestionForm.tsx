import { ImageBase } from "@/components/customs/imgs/ImageBase";
import { globalStyle } from "@/styles/globalStyles";
import { View } from "react-native";
import { HomeInputQuestion } from "./HomeInputQuestion";

export const AddQuestionForm = () => {
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

      <HomeInputQuestion />
    </View>
  );
};
