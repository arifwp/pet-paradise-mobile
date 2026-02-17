import { ImageBase } from "@/components/customs/imgs/ImageBase";
import { TempImg, useAddPostStore } from "@/hooks/stores/useAddPostStore";
import { colors } from "@/styles/colors";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";

export const HomeAddPostTempImage = ({ data }: { data: TempImg }) => {
  const { removeImg } = useAddPostStore();

  const deleteImg = () => {
    removeImg(data);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={deleteImg} style={styles.iconDelete}>
        <Ionicons name="close-sharp" size={18} color={colors.white} />
      </Pressable>

      <ImageBase
        source={data.uri}
        style={styles.image}
        contentFit="cover"
        cachePolicy={"none"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    position: "relative",
  },
  image: {
    aspectRatio: 1 / 1,
    height: 120,
    borderRadius: 12,
    zIndex: 0,
  },
  iconDelete: {
    position: "absolute",
    top: 6,
    right: 6,
    padding: 2,
    borderRadius: 99,
    backgroundColor: `${colors.primaryBlack.toString()}50`,
    zIndex: 1,
  },
});
