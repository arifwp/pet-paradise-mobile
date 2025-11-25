import { colors } from "@/styles/colors";
import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";

export default function TabsLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger
        name="index"
        options={{
          indicatorColor: colors.primary,
        }}
      >
        <Icon
          sf={{ default: "house", selected: "house.fill" }}
          selectedColor={colors.primary}
        />
        <Label
          selectedStyle={{
            color: colors.primary,
          }}
        >
          Home
        </Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="community">
        <Icon
          sf={{
            default: "globe.asia.australia",
            selected: "globe.asia.australia.fill",
          }}
          selectedColor={colors.primary}
        />
        <Label
          selectedStyle={{
            color: colors.primary,
          }}
        >
          Community
        </Label>
        {/* <Badge>9+</Badge> */}
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
