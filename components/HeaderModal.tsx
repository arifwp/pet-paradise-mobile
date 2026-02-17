import { globalStyle } from "@/styles/globalStyles";
import { StyleSheet, View, ViewProps } from "react-native";
import { TextInter } from "./texts/TextInter";

interface Props extends ViewProps {
  title: string;
}

export const HeaderModal = ({ title, ...rest }: Props) => {
  return (
    <View style={styles.container} {...rest}>
      <View style={globalStyle.headerModal} />

      <TextInter style={styles.title}>{title}</TextInter>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: 10,
  },
  title: {
    fontWeight: "600",
    fontSize: 16,
  },
});
