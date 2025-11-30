import { getTimeDisplay } from "@/helpers/date";
import { colors } from "@/styles/colors";
import { globalStyle } from "@/styles/globalStyles";
import {
  Entypo,
  Feather,
  FontAwesome6,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { ImageBase } from "../imgs/ImageBase";
import { Question } from "../QuestionItem";
import { TextInter } from "../texts/TextInter";

export interface Post {
  id: string;
  userId: string;
  name: string;
  username: string;
  avatar: string;
  isFollowed: boolean;
  content: string;
  medias: string[];
  isUpvote: boolean;
  isDownVote: boolean;
  countComment: number;
  countLike: number;
  countUpvote: number;
  question?: Pick<Question, "id" | "title"> | null;
  created_at: string;
  updated_at: string;
  timezone: string;
}

export const PostItem = ({ data }: { data: Post }) => {
  const timeDisplay = getTimeDisplay(data);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        console.log("clicked post=", data.id);
      }}
    >
      {/* Header */}
      <View
        style={[
          globalStyle.containerRow,
          {
            flex: 1,
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
          <ImageBase source={data.avatar} style={styles.avatar} />

          <View
            style={[
              globalStyle.containerColumn,
              {
                gap: 2,
                flexShrink: 1,
              },
            ]}
          >
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
      <View style={styles.containerContent}>
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
      </View>

      {/* Footer */}
      <View style={[globalStyle.containerRow]}>
        {/* Vote */}
        <View
          style={[
            globalStyle.containerRow,
            {
              gap: 0,
            },
          ]}
        >
          {/* Upvote */}
          <Pressable
            style={[
              globalStyle.containerRow,
              {
                gap: 4,
                paddingVertical: 6,
                paddingStart: 8,
                paddingEnd: 8,
                borderTopLeftRadius: 12,
                borderBottomLeftRadius: 12,
                borderRightWidth: 1,
                borderRightColor: colors.neutral200,
                backgroundColor: colors.neutral50,
              },
            ]}
            onPress={() => {
              console.log("clicked up vote", data.id);
            }}
          >
            {data.isUpvote ? (
              <MaterialCommunityIcons
                name="arrow-up-bold"
                size={16}
                color={colors.primary}
              />
            ) : (
              <MaterialCommunityIcons
                name="arrow-up-bold-outline"
                size={16}
                color={colors.primary}
              />
            )}

            <TextInter
              style={{
                fontSize: 12,
                color: data?.isUpvote ? colors.primary : colors.secondaryText,
              }}
            >
              Up
            </TextInter>

            <Entypo
              name="dot-single"
              size={14}
              style={{ marginHorizontal: -6 }}
              color={data?.isUpvote ? colors.primary : colors.secondaryText}
            />

            <TextInter
              style={{
                fontSize: 12,
                color: data?.isUpvote ? colors.primary : colors.secondaryText,
              }}
            >
              {data.countUpvote}
            </TextInter>
          </Pressable>

          {/* Downvote */}
          <Pressable
            style={{
              paddingVertical: 6,
              paddingStart: 8,
              paddingEnd: 8,
              borderTopEndRadius: 12,
              borderBottomEndRadius: 12,
              backgroundColor: colors.neutral50,
            }}
            onPress={() => {
              console.log("clicked down vote", data.id);
            }}
          >
            <MaterialCommunityIcons
              name="arrow-down-bold-outline"
              size={16}
              color={colors.primary}
            />
          </Pressable>
        </View>

        {/* Comment */}
        <Pressable
          style={[
            globalStyle.containerRow,
            {
              gap: 4,
            },
          ]}
          onPress={() => {
            console.log("clicked comment", data.id);
          }}
        >
          <FontAwesome6 name="comment" size={16} color={colors.secondaryText} />

          <TextInter style={{ fontSize: 12, color: colors.secondaryText }}>
            {data.countComment}
          </TextInter>
        </Pressable>

        {/* Repost */}
        <Pressable
          style={[
            globalStyle.containerRow,
            {
              gap: 4,
            },
          ]}
          onPress={() => {
            console.log("clicked re-post", data.id);
          }}
        >
          <Feather name="repeat" size={16} color={colors.secondaryText} />

          <TextInter style={{ fontSize: 12, color: colors.secondaryText }}>
            {data.countLike}
          </TextInter>
        </Pressable>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: "column",
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    aspectRatio: 1 / 1,
    alignSelf: "flex-start",
  },
  containerContent: {
    flexDirection: "column",
  },
});
