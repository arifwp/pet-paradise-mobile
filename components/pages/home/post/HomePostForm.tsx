import { ImageBase } from "@/components/imgs/ImageBase";
import { InputLongText } from "@/components/inputs/InputLongText";
import { TextInter } from "@/components/texts/TextInter";
import { useAddPostStore } from "@/hooks/stores/useAddPostStore";
import { colors } from "@/styles/colors";
import { globalStyle } from "@/styles/globalStyles";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { HomePostCameraButton } from "./HomePostCameraButton";
import { HomePostGalleryButton } from "./HomePostGalleryButton";
import { HomePostTempImg } from "./HomePostTempImg";

export const HomePostForm = () => {
  const router = useRouter();
  const { imgs, shareTo, content, setContent } = useAddPostStore();
  const [avatarWidth, setAvatarWidth] = useState<number>(0);

  return (
    <View style={styles.contentContainer}>
      {/* Body Wrapper */}
      <View style={[globalStyle.containerColumn]}>
        {/* Input Post */}
        <View
          style={[
            globalStyle.containerRow,
            {
              paddingHorizontal: 16,
              gap: 12,
              alignItems: "flex-start",
            },
          ]}
        >
          <View
            onLayout={(event) => {
              const { width } = event.nativeEvent.layout;
              setAvatarWidth(width);
            }}
          >
            <ImageBase
              source="https://placehold.co/500x500.png"
              style={globalStyle.avatar}
            />
          </View>

          <View
            style={[
              globalStyle.containerColumn,
              {
                gap: 12,
                flex: 1,
              },
            ]}
          >
            {/* Dropdown Share To Button */}
            <Pressable
              style={[globalStyle.containerRow, styles.containerDropdown]}
              onPress={() => router.push("/(main)/(screens)/list-communities")}
            >
              <TextInter style={{ fontSize: 12, color: colors.primary }}>
                {shareTo?.name}
              </TextInter>

              <MaterialIcons
                name="keyboard-arrow-down"
                size={18}
                color={colors.primary}
              />
            </Pressable>

            <InputLongText
              value={content}
              onValueChange={setContent}
              maxLength={1000}
              placeholder="Tulis postingan kamu..."
            />
          </View>
        </View>

        {/* List Image Post */}
        {imgs && imgs.length > 0 && (
          <View style={{ height: "auto" }}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={[
                globalStyle.containerRow,
                {
                  gap: 8,
                  paddingStart: avatarWidth + 28,
                  paddingEnd: 16,
                },
              ]}
            >
              {imgs.map((item) => (
                <HomePostTempImg key={item.id} data={item} />
              ))}
            </ScrollView>
          </View>
        )}
      </View>

      {/* Footer */}
      <View style={styles.containerFooter}>
        <HomePostGalleryButton />

        <HomePostCameraButton />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "space-between",
  },
  containerDropdown: {
    alignSelf: "flex-start",
    paddingVertical: 2,
    paddingLeft: 10,
    paddingRight: 6,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 24,
    gap: 0,
  },
  containerFooter: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    gap: 16,
    borderTopWidth: 1,
    borderTopColor: colors.neutral100,
    flexDirection: "row",
  },
});
