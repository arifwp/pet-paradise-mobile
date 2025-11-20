import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const globalStyle = StyleSheet.create({
  baseContainer: {
    flex: 1,
    flexDirection: "column",
    padding: 24,
    gap: 24,
    backgroundColor: colors.bgNeutral,
  },
  containerRow: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  logoSm: {
    width: 64,
    height: 64,
    resizeMode: "contain",
    borderRadius: 6,
  },
});
