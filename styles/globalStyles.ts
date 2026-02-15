import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const globalStyle = StyleSheet.create({
  baseContainer: {
    flex: 1,
    flexDirection: "column",
    padding: 16,
    gap: 24,
    backgroundColor: colors.white,
  },
  containerRow: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  containerColumn: {
    flexDirection: "column",
    gap: 16,
    alignItems: "stretch",
  },
  logoSm: {
    width: 72,
    height: 72,
    resizeMode: "contain",
    borderRadius: 6,
  },
  primaryLink: {
    fontWeight: 600,
    color: colors.primary,
  },
  backButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    fontSize: 14,
    fontWeight: 500,
    color: colors.red400,
  },
  inputCheckbox: {
    borderRadius: 4,
    borderWidth: 1.5,
  },
  inputFocus: {
    borderColor: colors.primary,
  },
  inputError: {
    borderColor: colors.red400,
  },
  textError: {
    color: colors.red400,
    fontSize: 12,
  },
  label: {
    fontWeight: 400,
    fontSize: 14,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: colors.neutral400,
    borderRadius: 8,
    padding: 10,
    textAlignVertical: "top",
  },
  inputContainer: {
    gap: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    aspectRatio: 1 / 1,
  },
  headerModal: {
    width: 60,
    height: 6,
    borderRadius: 24,
    backgroundColor: colors.neutral300,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    textAlign: "center",
    fontWeight: 600,
    fontSize: 14,
  },
});
