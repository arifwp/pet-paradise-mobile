import { ButtonOutline } from "@/components/buttons/ButtonOutline";
import { ImageBase } from "@/components/imgs/ImageBase";
import { TextInter } from "@/components/texts/TextInter";
import { getTimeDisplay } from "@/helpers/date";
import { colors } from "@/styles/colors";
import { globalStyle } from "@/styles/globalStyles";
import { Entypo } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";
import { HomeCommentButton } from "./HomeCommentButton";
import { HomeLikeButton } from "./HomeLikeButton";
import { HomeRepostButton } from "./HomeRepostButton";
import { HomeShareButton } from "./HomeShareButton";
import { PostItemImage } from "./PostItemImage";

export interface Post {
  id: string;
  userId: string;
  name: string;
  username: string;
  avatar?: string;
  isFollowed: boolean;
  isRepost: boolean;
  isLike: boolean;
  content: string;
  medias: string[];
  countComment: number;
  countLike: number;
  countRepost: number;
  created_at: string;
  updated_at: string;
  timezone: string;
}

export const PostItem = ({ data }: { data: Post }) => {
  const timeDisplay = getTimeDisplay({
    createdAt: data.created_at,
    dateTimezone: data.timezone,
  });

  return (
    <Pressable
      style={[globalStyle.containerColumn, { padding: 16 }]}
      onPress={() => {
        console.log("clicked post=", data.id);
      }}
    >
      {/* Header */}
      <View
        style={[
          globalStyle.containerRow,
          {
            minWidth: 0,
            flexShrink: 1,
            justifyContent: "space-between",
            alignItems: "flex-start",
          },
        ]}
      >
        {/* User Profile */}
        <Pressable
          style={[
            globalStyle.containerRow,
            {
              flex: 1,
              flexShrink: 0,
              minWidth: 0,
              gap: 10,
            },
          ]}
          onPress={() => {
            console.log("clicked profile", data.userId);
          }}
        >
          <ImageBase source={data.avatar} style={globalStyle.avatar} />

          <View
            style={[
              globalStyle.containerColumn,
              {
                gap: 2,
                flexShrink: 1,
              },
            ]}
          >
            <View style={[globalStyle.containerRow, { gap: 8 }]}>
              <TextInter
                style={{
                  fontWeight: 600,
                  fontSize: 14,
                  color: colors.primaryBlack,
                }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {data.name}
              </TextInter>

              {!data.isFollowed && (
                <ButtonOutline
                  onPress={() => {
                    console.log("followed");
                  }}
                  title="Follow"
                  buttonStyle={styles.buttonFollow}
                  textStyle={{ fontSize: 10, fontWeight: 500 }}
                />
              )}
            </View>

            <TextInter
              style={{
                fontWeight: 400,
                fontSize: 12,
                color: colors.secondaryText,
              }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {timeDisplay.displayTime}
            </TextInter>
          </View>
        </Pressable>

        {/* Menu */}
        <Pressable
          onPress={() => {
            console.log("clicked menu post", data.id);
          }}
        >
          <Entypo
            name="dots-three-horizontal"
            size={16}
            color={colors.secondaryText}
          />
        </Pressable>
      </View>

      {/* Content */}
      <View style={[globalStyle.containerColumn]}>
        <TextInter
          style={{
            fontSize: 14,
            color: colors.primaryBlack,
          }}
          numberOfLines={3}
          ellipsizeMode="tail"
        >
          {data.content}
        </TextInter>

        {data.medias && data.medias.length > 0 && <PostItemImage data={data} />}
      </View>

      {/* Footer */}
      <View
        style={[globalStyle.containerRow, { justifyContent: "space-between" }]}
      >
        <View style={[globalStyle.containerRow]}>
          {/* Like */}
          <HomeLikeButton
            postId={data.id}
            countLike={data.countLike}
            isLike={data.isLike}
          />

          {/* Repost */}
          <HomeRepostButton
            postId={data.id}
            countRepost={data.countRepost}
            isRepost={data.isRepost}
          />

          {/* Comment */}
          <HomeCommentButton
            postId={data.id}
            countComment={data.countComment}
          />
        </View>

        {/* Share */}
        <HomeShareButton postId={data.id} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonFollow: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderWidth: 0.5,
    borderRadius: 6,
  },
});
