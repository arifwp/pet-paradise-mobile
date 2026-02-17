import { ContainerSafeAreaView } from "@/components/containers/ContainerSafeAreaView";
import { HomeHeader } from "@/components/pages/home/HomeHeader";
import { HomePostLayout } from "@/components/pages/home/HomePostLayout";
import { globalStyle } from "@/styles/globalStyles";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const insets = useSafeAreaInsets();

  return (
    <ContainerSafeAreaView>
      <View
        style={[
          globalStyle.baseContainer,
          {
            width: "100%",
            padding: 0,
            gap: 0,
            paddingBottom: insets.bottom,
          },
        ]}
      >
        <HomeHeader />
        <HomePostLayout />
      </View>
    </ContainerSafeAreaView>
  );
}
