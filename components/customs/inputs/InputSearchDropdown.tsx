import { Dispatch, SetStateAction, useState } from "react";
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export interface SelectOption {
  id: string | number;
  name: string;
  value: string;
}

interface Props {
  options: SelectOption[];
  value: SelectOption;
  onSelectedValue: Dispatch<SetStateAction<SelectOption>>; // onSelectedValue: (value: SelectOption) => void;
  label: string;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

export const InputSearchDropdown = ({
  options,
  value,
  onSelectedValue,
  label,
  containerStyle,
  labelStyle,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Apple 🍎", value: "apple" },
    { label: "Banana 🍌", value: "banana" },
    { label: "Orange 🍊", value: "orange" },
  ]);

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={open}
        value={value?.value}
        items={options}
        setOpen={setOpen}
        setValue={onSelectedValue}
        // setItems={setItems}
        placeholder="Select a fruit"
        listMode="SCROLLVIEW"
        style={styles.dropdown}
        searchable={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    paddingHorizontal: 20,
    zIndex: 1000,
  },
  dropdown: {
    borderColor: "#ccc",
  },
});
