import { Community } from "@/app/(main)/(modals)/list-communities";
import { colors } from "@/styles/colors";
import { globalStyle } from "@/styles/globalStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, PressableProps, View } from "react-native";
import { ImageBase } from "../../imgs/ImageBase";
import { TextInter } from "../../texts/TextInter";

interface Props extends PressableProps {
  isSelected: boolean;
  data: Community;
  onPress: VoidFunction;
}

export const HomeCommunityIem = ({
  isSelected,
  data,
  onPress,
  ...rest
}: Props) => {
  return (
    <Pressable
      style={[
        globalStyle.containerRow,
        {
          paddingVertical: 4,
          paddingHorizontal: 16,
        },
      ]}
      onPress={onPress}
      {...rest}
    >
      <View style={{ position: "relative" }}>
        <ImageBase
          source="https://placehold.co/500x500.png"
          style={{
            width: 50,
            height: 50,
            borderRadius: 8,
            aspectRatio: 1 / 1,
          }}
        />

        {isSelected && (
          <MaterialCommunityIcons
            name="check-circle"
            size={16}
            color={colors.primary}
            style={{ position: "absolute", right: 0, bottom: 0 }}
          />
        )}
      </View>

      <View
        style={[
          globalStyle.containerColumn,
          {
            gap: 4,
          },
        ]}
      >
        <TextInter style={{ fontWeight: "500" }}>{data.name}</TextInter>

        {data.totalMember && (
          <TextInter style={{ color: colors.secondaryText, fontSize: 12 }}>
            {data.totalMember} Anggota
          </TextInter>
        )}
      </View>
    </Pressable>
  );
};
