import { ImageBase } from "@/components/imgs/ImageBase";
import { TextInter } from "@/components/texts/TextInter";
import { colors } from "@/styles/colors";
import { globalStyle } from "@/styles/globalStyles";
import { AntDesign, Feather } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";

export const HomeHeader = () => {
  const router = useRouter();

  return (
    <View style={[globalStyle.containerRow, styles.header]}>
      <View
        style={[
          globalStyle.containerRow,
          {
            gap: 12,
            flex: 1,
          },
        ]}
      >
        <ImageBase
          source="https://placehold.co/500x500.png"
          style={globalStyle.avatar}
        />

        <View
          style={{
            gap: 2,
            flexDirection: "column",
            alignItems: "flex-start",
            flex: 1,
            flexShrink: 1,
          }}
        >
          <TextInter
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: colors.primaryBlack,
            }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s
          </TextInter>

          <TextInter
            style={{
              fontSize: 12,
              fontWeight: 400,
              color: colors.secondaryText,
            }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            @Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s
          </TextInter>
        </View>
      </View>

      <View style={[globalStyle.containerRow, { gap: 24 }]}>
        <Pressable onPress={() => router.push("/(main)/(screens)/search")}>
          <Feather name="search" size={20} color={colors.primaryBlack} />
        </Pressable>

        <Link href={"/(main)/(modals)/add-post"}>
          <AntDesign name="plus-circle" size={20} color={colors.primaryBlack} />
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sv: {},
  header: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    justifyContent: "space-between",
  },
});
