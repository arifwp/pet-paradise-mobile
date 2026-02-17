import { colors } from "@/styles/colors";
import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";

export default function LayoutTabs() {
  return (
    <NativeTabs disableTransparentOnScrollEdge backgroundColor={colors.white}>
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

      <NativeTabs.Trigger name="question">
        <Icon
          sf={{
            default: "rectangle.3.group.bubble",
            selected: "rectangle.3.group.bubble.fill",
          }}
          selectedColor={colors.primary}
        />
        <Label
          selectedStyle={{
            color: colors.primary,
          }}
        >
          Komunitas
        </Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="adopt">
        <Icon
          sf={{
            default: "rectangle.grid.2x2",
            selected: "rectangle.grid.2x2.fill",
          }}
          selectedColor={colors.primary}
        />
        <Label
          selectedStyle={{
            color: colors.primary,
          }}
        >
          Adopt
        </Label>
        {/* <Badge>9+</Badge> */}
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
