import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const globalStyle = StyleSheet.create({
  baseContainer: {
    flex: 1,
    flexDirection: "column",
    padding: 24,
    gap: 24,
    backgroundColor: colors.white,
  },
  containerRow: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  logoSm: {
    width: 72,
    height: 72,
    resizeMode: "contain",
    borderRadius: 6,
  },
  primaryLink: { fontWeight: 600, color: colors.primary },
  backButton: {
    padding: 4,
    backgroundColor: colors.bgNeutral300,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});
