import { ContainerSafeAreaView } from "@/components/containers/ContainerSafeAreaView";
import { ImageBase } from "@/components/imgs/ImageBase";
import { HomeCommentButton } from "@/components/pages/home/post/HomeCommentButton";
import { HomeLikeButton } from "@/components/pages/home/post/HomeLikeButton";
import { HomeRepostButton } from "@/components/pages/home/post/HomeRepostButton";
import { HomeShareButton } from "@/components/pages/home/post/HomeShareButton";
import { Post } from "@/components/pages/home/post/PostItem";
import { colors } from "@/styles/colors";
import { globalStyle } from "@/styles/globalStyles";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  FlatList,
  Image,
  ImageStyle,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ImageDimension {
  width: number;
  height: number;
}

export default function ModalImagePreview() {
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const [showUtility, setShowUtility] = useState<boolean>(true);
  const flatListRef = useRef<FlatList>(null);

  // Parse postData dan initialIndex dari params
  const postData: Post =
    typeof params.postData === "string"
      ? JSON.parse(params.postData)
      : ({} as Post);

  const images = useMemo(() => {
    const images = postData.medias || [];
    return images;
  }, [postData.medias]);

  const initialIndex =
    typeof params.initialIndex === "string" ? parseInt(params.initialIndex) : 0;

  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [imageDimensions, setImageDimensions] = useState<{
    [key: number]: ImageDimension;
  }>({});

  useEffect(() => {
    // Load semua image dimensions
    images.forEach((imageUri: string, index: number) => {
      Image.getSize(
        imageUri,
        (width, height) => {
          setImageDimensions((prev) => ({
            ...prev,
            [index]: { width, height },
          }));
        },
        (error) => {
          console.log("Error getting image size:", error);
          // Set default aspect ratio jika gagal
          setImageDimensions((prev) => ({
            ...prev,
            [index]: { width: 1, height: 1 },
          }));
        },
      );
    });
  }, [images]);

  useEffect(() => {
    // Scroll ke index yang dipilih saat modal dibuka
    setTimeout(() => {
      flatListRef.current?.scrollToIndex({
        index: initialIndex,
        animated: false,
      });
    }, 100);
  }, [initialIndex]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / screenWidth);
    setCurrentIndex(index);
  };

  const handleClose = () => {
    router.back();
  };

  const handleToggleUtility = () => {
    setShowUtility((prev) => !prev);
  };

  const renderItem = ({ item, index }: { item: string; index: number }) => {
    const dimensions = imageDimensions[index];
    let imageStyle: ImageStyle = {
      objectFit: "contain",
    };

    if (dimensions) {
      const aspectRatio = dimensions.width / dimensions.height;
      const maxWidth = screenWidth; // Full width, no padding
      const maxHeight = screenHeight - 140; // ruang untuk button dan indicator

      let finalWidth = maxWidth;
      let finalHeight = finalWidth / aspectRatio;

      // Jika tinggi melebihi maxHeight, scale berdasarkan height
      if (finalHeight > maxHeight) {
        finalHeight = maxHeight;
        finalWidth = finalHeight * aspectRatio;
      }

      imageStyle = {
        ...imageStyle,
        width: finalWidth,
        height: finalHeight,
      };
    }

    return (
      <Pressable style={[styles.imageContainer]} onPress={handleToggleUtility}>
        <ImageBase source={item} style={imageStyle} />
      </Pressable>
    );
  };

  return (
    <ContainerSafeAreaView style={{ backgroundColor: colors.primaryBlack }}>
      <StatusBar style="light" />

      <View style={[globalStyle.containerColumn, styles.modalContainer]}>
        {showUtility && (
          <Pressable style={styles.closeButton} onPress={handleClose}>
            <Ionicons name="close" size={24} color={colors.white} />
          </Pressable>
        )}

        <FlatList
          ref={flatListRef}
          data={images}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          getItemLayout={(_, index) => ({
            length: screenWidth,
            offset: screenWidth * index,
            index,
          })}
        />

        {/* FOOTER */}
        {showUtility && (
          <View
            style={[
              globalStyle.containerColumn,
              styles.footerContainer,
              {
                height: insets.bottom + 60,
                paddingHorizontal: insets.left + 24,
              },
            ]}
            pointerEvents="box-none"
          >
            {images.length > 1 && (
              <View
                style={[
                  globalStyle.containerRow,
                  {
                    gap: 6,
                    justifyContent: "center",
                  },
                ]}
              >
                {images.map((_: any, index: number) => (
                  <View
                    key={index}
                    style={[
                      styles.indicator,
                      currentIndex === index && styles.indicatorActive,
                    ]}
                  />
                ))}
              </View>
            )}

            {/* BUTTON */}
            <View
              style={[
                globalStyle.containerRow,
                { justifyContent: "space-around" },
              ]}
            >
              <HomeLikeButton
                postId={postData.id}
                countLike={postData.countLike}
                isLike={postData.isLike}
                iconColor={colors.white}
                iconSize={18}
                containerStyle={{ gap: 6 }}
                textStyle={{ color: colors.white }}
              />

              <HomeRepostButton
                postId={postData.id}
                countRepost={postData.countRepost}
                isRepost={postData.isRepost}
                iconColor={colors.white}
                iconSize={18}
                containerStyle={{ gap: 6 }}
                textStyle={{ color: colors.white }}
              />

              <HomeCommentButton
                postId={postData.id}
                countComment={postData.countComment}
                iconColor={colors.white}
                iconSize={18}
                containerStyle={{ gap: 6 }}
                textStyle={{ color: colors.white }}
              />

              <HomeShareButton
                postId={postData.id}
                iconColor={colors.white}
                iconSize={18}
                containerStyle={{ gap: 6 }}
              />
            </View>
          </View>
        )}
      </View>
    </ContainerSafeAreaView>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: colors.primaryBlack,
    justifyContent: "center",
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 10,
    width: 30,
    height: 30,
    borderRadius: 999,
    backgroundColor: `${colors.primaryBlack}80`,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 999,
    backgroundColor: colors.secondaryText,
  },
  indicatorActive: {
    backgroundColor: colors.white,
    width: 24,
  },
  footerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 16,
    backgroundColor: `${colors.primaryBlack}80`,
  },
});
