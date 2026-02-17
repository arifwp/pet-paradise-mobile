import { DotSeparator } from "@/components/customs/DotSeparator";
import { getTimeDisplay } from "@/helpers/date";
import { colors } from "@/styles/colors";
import { globalStyle } from "@/styles/globalStyles";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { TextInter } from "../../../texts/TextInter";
import { HomeQuestionAnswerButton } from "./HomeQuestionAnswerButton";

export interface Question {
  id: string;
  userId: string;
  name: string;
  username: string;
  question: string;
  isUpvote: boolean;
  isDownVote: boolean;
  isFollowed: boolean;
  countAnswer: number;
  countFollow: number;
  countUpvote: number;
  created_at: string;
  updated_at: string;
  timezone: string;
}

export const QuestionItem = ({ data }: { data: Question }) => {
  const updateTime = getTimeDisplay({
    createdAt: data.created_at,
    dateTimezone: data.timezone,
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        console.log("clicked Question=", data.id);
      }}
    >
      {/* Question */}
      <View style={[globalStyle.containerColumn, { gap: 8 }]}>
        <TextInter
          style={{
            fontSize: 14,
            color: colors.primaryBlack,
          }}
          ellipsizeMode="tail"
        >
          {data.question}
        </TextInter>

        <View style={[globalStyle.containerRow, { gap: 6 }]}>
          <TextInter
            style={{
              fontSize: 10,
              color: colors.secondaryText,
              fontWeight: 600,
            }}
          >
            {data.countAnswer} Jawaban
          </TextInter>

          <DotSeparator style={{ backgroundColor: colors.secondaryText }} />

          <TextInter
            style={{
              fontSize: 10,
              color: colors.secondaryText,
            }}
          >
            Terakhir update {updateTime.displayTime}
          </TextInter>
        </View>
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

        {/* Answer */}
        <HomeQuestionAnswerButton postId={data.id} />
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
});
