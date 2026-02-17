import { ButtonBackNavigation } from "@/components/customs/buttons/ButtonBackNavigation";
import { InputSearch } from "@/components/customs/inputs/InputSearch";
import { useDebounce } from "@/hooks/useDebounce";
import { globalStyle } from "@/styles/globalStyles";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={[
          globalStyle.baseContainer,
          {
            width: "100%",
            gap: 0,
            paddingTop: 0,
            paddingBottom: insets.bottom,
          },
        ]}
      >
        {/* Header */}
        <View
          style={[
            globalStyle.containerRow,
            {
              gap: 12,
            },
          ]}
        >
          <ButtonBackNavigation />

          <InputSearch
            value={search}
            onValueChange={setSearch}
            placeholder="Cari postingan..."
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
});
