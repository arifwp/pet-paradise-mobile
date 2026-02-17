import Checkbox, { CheckboxProps } from "expo-checkbox";
import { StyleSheet } from "react-native";
import { View } from "react-native-reanimated/lib/typescript/Animated";
import { TextInter } from "../texts/TextInter";

interface Props extends CheckboxProps {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export const InputCheckbox = ({
  label = "Data",
  value,
  onValueChange,
  ...rest
}: Props) => {
  return (
    <View style={styles.container}>
      <Checkbox
        style={styles.checkbox}
        value={value}
        onValueChange={onValueChange}
        color={value ? "#4630EB" : undefined}
      />

      <TextInter style={styles.label}>{label}</TextInter>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  checkbox: {},
  label: {},
});
