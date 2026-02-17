import { colors } from "@/styles/colors";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

export const DotSeparator = ({ style }: { style?: StyleProp<ViewStyle> }) => {
  return <View style={[styles.container, style]} />;
};

const styles = StyleSheet.create({
  container: {
    height: 3,
    width: 3,
    borderRadius: 999,
    backgroundColor: colors.primaryBlack,
  },
});
