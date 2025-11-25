import { ImageBase } from "@/components/customs/imgs/ImageBase";
import { TextInter } from "@/components/customs/texts/TextInter";
import { colors } from "@/styles/colors";
import { globalStyle } from "@/styles/globalStyles";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useVideoPlayer, VideoSource, VideoView } from "expo-video";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ListRenderItem,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewToken,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// Tipe data untuk story
interface Story {
  id: string;
  type: "video" | "image";
  uri: string;
  user: {
    name: string;
    avatar: string;
  };
}

// Mock data - mix video dan image
const STORIES: readonly Story[] = [
  {
    id: "1",
    type: "video",
    uri: "https://firebasestorage.googleapis.com/v0/b/instagram-clone-f3106.appspot.com/o/2.mp4?alt=media&token=fcd41460-a441-4841-98da-d8f9a714dd4d",
    user: {
      name: "John Doe",
      avatar: "https://placehold.co/500x500.png",
    },
  },
  {
    id: "2",
    type: "image",
    uri: "https://placehold.co/1080x1920.png",
    user: {
      name: "Jane Smith",
      avatar: "https://placehold.co/500x500.png",
    },
  },
  {
    id: "3",
    type: "video",
    uri: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    user: {
      name: "Mike Johnson",
      avatar: "https://placehold.co/500x500.png",
    },
  },
  {
    id: "4",
    type: "image",
    uri: "https://placehold.co/1080x1920/FF6B6B/FFFFFF.png",
    user: {
      name: "Sarah Williams",
      avatar: "https://placehold.co/500x500.png",
    },
  },
  {
    id: "5",
    type: "video",
    uri: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    user: {
      name: "David Brown",
      avatar: "https://placehold.co/500x500.png",
    },
  },
] as const;

const IMAGE_DURATION = 5000; // 5 detik untuk image
const VIDEO_STATUS_CHECK_INTERVAL = 200;
const LONG_PRESS_DURATION = 200;
const VIDEO_PLAY_DELAY = 200;

export default function StoryScreen() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [isVideoReady, setIsVideoReady] = useState<boolean>(false);

  const flatListRef = useRef<FlatList<Story>>(null);
  const imageTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const videoStatusIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null
  );
  const videoDurationIntervalRef = useRef<ReturnType<
    typeof setInterval
  > | null>(null);
  const progressAnimationRef = useRef<Animated.CompositeAnimation | null>(null);
  const isMountedRef = useRef<boolean>(true);
  const isNavigatingRef = useRef<boolean>(false);

  // Memoize progress animations untuk avoid re-creation
  const progressAnims = useMemo(
    () => STORIES.map(() => new Animated.Value(0)),
    []
  );

  // Gunakan single player untuk memory efficiency
  const player = useVideoPlayer(
    {
      uri: STORIES[0].type === "video" ? STORIES[0].uri : "",
      useCaching: true,
    },
    (player) => {
      player.loop = false;
    }
  );

  // Cleanup semua timers dan intervals
  const cleanupTimers = useCallback(() => {
    if (imageTimerRef.current) {
      clearTimeout(imageTimerRef.current);
      imageTimerRef.current = null;
    }
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
    if (videoStatusIntervalRef.current) {
      clearInterval(videoStatusIntervalRef.current);
      videoStatusIntervalRef.current = null;
    }
    if (videoDurationIntervalRef.current) {
      clearInterval(videoDurationIntervalRef.current);
      videoDurationIntervalRef.current = null;
    }
    if (progressAnimationRef.current) {
      progressAnimationRef.current.stop();
      progressAnimationRef.current = null;
    }
  }, []);

  // Navigate ke story prev/next - stable dengan useCallback
  const navigateStory = useCallback(
    (direction: "prev" | "next") => {
      if (isNavigatingRef.current) return;

      let newIndex: number;
      if (direction === "next") {
        if (currentIndex >= STORIES.length - 1) {
          // Sudah di akhir, close
          handleClose();
          return;
        }
        newIndex = currentIndex + 1;
      } else {
        if (currentIndex <= 0) {
          // Sudah di awal, tidak bisa prev
          return;
        }
        newIndex = currentIndex - 1;
      }

      isNavigatingRef.current = true;
      setCurrentIndex(newIndex);
      setIsPaused(false);
      setVideoDuration(0);
      setIsVideoReady(false);

      flatListRef.current?.scrollToIndex({
        index: newIndex,
        animated: true,
      });

      // Reset navigating flag setelah animasi selesai
      setTimeout(() => {
        isNavigatingRef.current = false;
      }, 400);
    },
    [currentIndex]
  );

  const handleClose = useCallback(() => {
    cleanupTimers();
    try {
      player.pause();
    } catch (error) {
      console.log("Error pausing player:", error);
    }
    // Navigation back atau close modal
    console.log("Close story screen");
  }, [player, cleanupTimers]);

  // Monitor video duration dan ready state
  useEffect(() => {
    const currentStory = STORIES[currentIndex];

    if (currentStory.type === "video" && isMountedRef.current) {
      videoDurationIntervalRef.current = setInterval(() => {
        if (!isMountedRef.current) return;

        try {
          const duration = player.duration;
          if (duration > 0) {
            if (videoDuration !== duration) {
              setVideoDuration(duration);
            }
            if (!isVideoReady) {
              setIsVideoReady(true);
            }
          }
        } catch (error) {
          console.log("Error getting duration:", error);
        }
      }, 100);

      return () => {
        if (videoDurationIntervalRef.current) {
          clearInterval(videoDurationIntervalRef.current);
          videoDurationIntervalRef.current = null;
        }
      };
    } else {
      setIsVideoReady(false);
      setVideoDuration(0);
    }
  }, [currentIndex, player, videoDuration, isVideoReady]);

  // Handle video status change untuk auto next
  useEffect(() => {
    const currentStory = STORIES[currentIndex];

    if (currentStory.type === "video" && isMountedRef.current && isVideoReady) {
      videoStatusIntervalRef.current = setInterval(() => {
        if (!isMountedRef.current || isNavigatingRef.current) return;

        try {
          const status = player.status;

          // Video selesai (idle) dan tidak sedang pause
          if (status === "idle" && !isPaused) {
            if (videoStatusIntervalRef.current) {
              clearInterval(videoStatusIntervalRef.current);
              videoStatusIntervalRef.current = null;
            }
            navigateStory("next");
          }
        } catch (error) {
          console.log("Error checking status:", error);
        }
      }, VIDEO_STATUS_CHECK_INTERVAL);

      return () => {
        if (videoStatusIntervalRef.current) {
          clearInterval(videoStatusIntervalRef.current);
          videoStatusIntervalRef.current = null;
        }
      };
    }
  }, [currentIndex, player, isPaused, isVideoReady, navigateStory]);

  // Animasi progress bar untuk image
  const startImageProgress = useCallback(() => {
    if (!isMountedRef.current || isNavigatingRef.current) return;

    if (imageTimerRef.current) {
      clearTimeout(imageTimerRef.current);
      imageTimerRef.current = null;
    }

    const currentAnim = progressAnims[currentIndex];
    currentAnim.setValue(0);

    progressAnimationRef.current = Animated.timing(currentAnim, {
      toValue: 1,
      duration: IMAGE_DURATION,
      useNativeDriver: false,
    });

    progressAnimationRef.current.start(({ finished }) => {
      if (
        finished &&
        !isPaused &&
        isMountedRef.current &&
        !isNavigatingRef.current
      ) {
        navigateStory("next");
      }
    });

    // Backup timer untuk safety
    imageTimerRef.current = setTimeout(() => {
      if (!isPaused && isMountedRef.current && !isNavigatingRef.current) {
        navigateStory("next");
      }
    }, IMAGE_DURATION);
  }, [currentIndex, isPaused, progressAnims, navigateStory]);

  // Update video/image source saat index berubah
  useEffect(() => {
    const currentStory = STORIES[currentIndex];

    // Clear previous timers
    cleanupTimers();

    // Reset progress semua story
    progressAnims.forEach((anim, index) => {
      if (index < currentIndex) {
        anim.setValue(1);
      } else if (index === currentIndex) {
        anim.setValue(0);
      } else {
        anim.setValue(0);
      }
    });

    if (currentStory.type === "video") {
      const videoSource: VideoSource = {
        uri: currentStory.uri,
        useCaching: true,
      };

      try {
        player.pause();
      } catch (error) {
        console.log("Error pausing player:", error);
      }

      setIsVideoReady(false);
      player.replace(videoSource);

      const playTimeout = setTimeout(() => {
        if (!isMountedRef.current || isNavigatingRef.current) return;

        try {
          if (!isPaused) {
            player.play();
          }
        } catch (error) {
          console.log("Error playing video:", error);
        }
      }, VIDEO_PLAY_DELAY);

      return () => {
        clearTimeout(playTimeout);
      };
    } else if (currentStory.type === "image") {
      // Handle image dengan timer
      if (!isPaused) {
        startImageProgress();
      }
    }

    return () => {
      cleanupTimers();
    };
  }, [
    currentIndex,
    player,
    isPaused,
    progressAnims,
    cleanupTimers,
    startImageProgress,
  ]);

  // Animasi progress bar untuk video - hanya start ketika video ready dan ada duration
  useEffect(() => {
    const currentStory = STORIES[currentIndex];

    if (
      currentStory.type === "video" &&
      videoDuration > 0 &&
      isVideoReady &&
      isMountedRef.current &&
      !isNavigatingRef.current
    ) {
      const currentAnim = progressAnims[currentIndex];

      // Stop animasi yang sedang berjalan
      if (progressAnimationRef.current) {
        progressAnimationRef.current.stop();
        progressAnimationRef.current = null;
      }

      currentAnim.setValue(0);

      if (!isPaused) {
        progressAnimationRef.current = Animated.timing(currentAnim, {
          toValue: 1,
          duration: videoDuration * 1000,
          useNativeDriver: false,
        });

        progressAnimationRef.current.start();
      }
    }

    return () => {
      if (progressAnimationRef.current) {
        progressAnimationRef.current.stop();
        progressAnimationRef.current = null;
      }
    };
  }, [currentIndex, videoDuration, isVideoReady, isPaused, progressAnims]);

  // Handle pause/resume
  useEffect(() => {
    const currentStory = STORIES[currentIndex];
    if (!isMountedRef.current || isNavigatingRef.current) return;

    if (isPaused) {
      if (currentStory.type === "video") {
        try {
          player.pause();
        } catch (error) {
          console.log("Error pausing:", error);
        }
      }

      // Stop animasi progress
      if (progressAnimationRef.current) {
        progressAnimationRef.current.stop();
        progressAnimationRef.current = null;
      }
      progressAnims[currentIndex].stopAnimation();

      if (imageTimerRef.current) {
        clearTimeout(imageTimerRef.current);
        imageTimerRef.current = null;
      }
    } else {
      if (currentStory.type === "video") {
        try {
          player.play();
        } catch (error) {
          console.log("Error playing:", error);
        }

        // Resume video progress animation
        if (videoDuration > 0 && isVideoReady) {
          const currentAnim = progressAnims[currentIndex];

          // Stop existing animation
          if (progressAnimationRef.current) {
            progressAnimationRef.current.stop();
          }

          // Get current progress and calculate remaining duration
          progressAnims[currentIndex].stopAnimation((value: number) => {
            const currentProgress = value ?? 0;
            const remainingDuration =
              videoDuration * 1000 * (1 - currentProgress);

            progressAnimationRef.current = Animated.timing(currentAnim, {
              toValue: 1,
              duration: remainingDuration,
              useNativeDriver: false,
            });
            progressAnimationRef.current.start();
          });
        }
      } else {
        // Resume image progress
        progressAnims[currentIndex].stopAnimation((value: number) => {
          const currentProgress = value ?? 0;
          const remainingDuration = IMAGE_DURATION * (1 - currentProgress);

          progressAnimationRef.current = Animated.timing(
            progressAnims[currentIndex],
            {
              toValue: 1,
              duration: remainingDuration,
              useNativeDriver: false,
            }
          );

          progressAnimationRef.current.start(({ finished }) => {
            if (finished && isMountedRef.current && !isNavigatingRef.current) {
              navigateStory("next");
            }
          });

          imageTimerRef.current = setTimeout(() => {
            if (isMountedRef.current && !isNavigatingRef.current) {
              navigateStory("next");
            }
          }, remainingDuration);
        });
      }
    }
  }, [
    isPaused,
    currentIndex,
    player,
    videoDuration,
    isVideoReady,
    progressAnims,
    navigateStory,
  ]);

  // Cleanup player dan timers saat unmount
  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
      isNavigatingRef.current = false;
      cleanupTimers();

      try {
        player.pause();
        player.release();
      } catch (error) {
        console.log("Error releasing player:", error);
      }
    };
  }, [cleanupTimers, player]);

  // Handle ketika user scroll/swipe - stable dengan useRef
  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (
        viewableItems.length > 0 &&
        viewableItems[0].index !== null &&
        !isNavigatingRef.current
      ) {
        const newIndex = viewableItems[0].index;
        if (newIndex !== currentIndex) {
          setCurrentIndex(newIndex);
          setIsPaused(false);
          setVideoDuration(0);
          setIsVideoReady(false);
        }
      }
    }
  ).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
    minimumViewTime: 0,
  }).current;

  // Handle long press - stable callbacks
  const handlePressIn = useCallback(() => {
    if (isNavigatingRef.current) return;

    longPressTimerRef.current = setTimeout(() => {
      if (isMountedRef.current && !isNavigatingRef.current) {
        setIsPaused(true);
      }
    }, LONG_PRESS_DURATION);
  }, []);

  const handlePressOut = useCallback(() => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
    if (isMountedRef.current && !isNavigatingRef.current) {
      setIsPaused(false);
    }
  }, []);

  // Handle navigation with boundary check
  const handleNavigation = useCallback(
    (direction: "prev" | "next") => {
      if (isNavigatingRef.current) return;

      if (direction === "prev" && currentIndex === 0) {
        // Di index pertama, tidak bisa prev
        return;
      }

      navigateStory(direction);
    },
    [currentIndex, navigateStory]
  );

  // Render item - memoized dengan useCallback untuk performance
  const renderItem: ListRenderItem<Story> = useCallback(
    ({ item, index }) => {
      const isActive = index === currentIndex;

      return (
        <View style={styles.storyContainer}>
          {/* Header */}
          <View style={[globalStyle.containerRow, styles.containerProfile]}>
            <View style={[globalStyle.containerRow, { gap: 12 }]}>
              <ImageBase style={styles.avatar} source={item.user.avatar} />
              <TextInter style={styles.name}>{item.user.name}</TextInter>
            </View>

            <TouchableOpacity onPress={handleClose} activeOpacity={0.7}>
              <MaterialCommunityIcons
                name="close"
                size={24}
                color={colors.white}
              />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View style={styles.contentWrapper}>
            {isActive ? (
              item.type === "video" ? (
                <VideoView
                  player={player}
                  style={styles.video}
                  nativeControls={false}
                  allowsPictureInPicture={false}
                />
              ) : (
                <Image
                  source={{ uri: item.uri }}
                  style={styles.image}
                  resizeMode="cover"
                />
              )
            ) : (
              <View style={styles.placeholder} />
            )}
          </View>

          {/* Navigation Overlay dengan Long Press */}
          <View style={styles.navigationOverlay}>
            <TouchableOpacity
              style={styles.navAreaLeft}
              onPress={() => handleNavigation("prev")}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              activeOpacity={1}
              disabled={currentIndex === 0}
            />
            <TouchableOpacity
              style={styles.navAreaRight}
              onPress={() => handleNavigation("next")}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              activeOpacity={1}
            />
          </View>

          {/* Pause Indicator */}
          {isPaused && isActive && (
            <View style={styles.pauseIndicator}>
              <MaterialCommunityIcons
                name="pause"
                size={60}
                color="rgba(255, 255, 255, 0.8)"
              />
            </View>
          )}
        </View>
      );
    },
    [
      currentIndex,
      player,
      handleNavigation,
      handleClose,
      isPaused,
      handlePressIn,
      handlePressOut,
    ]
  );

  // Key extractor - stable
  const keyExtractor = useCallback((item: Story) => item.id, []);

  // Get item layout - stable dengan useCallback
  const getItemLayout = useCallback(
    (_data: ArrayLike<Story> | null | undefined, index: number) => ({
      length: SCREEN_WIDTH,
      offset: SCREEN_WIDTH * index,
      index,
    }),
    []
  );

  // Scroll to index failed handler - stable
  const handleScrollToIndexFailed = useCallback(
    (info: {
      index: number;
      highestMeasuredFrameIndex: number;
      averageItemLength: number;
    }) => {
      const wait = new Promise((resolve) => setTimeout(resolve, 500));
      wait.then(() => {
        flatListRef.current?.scrollToIndex({
          index: info.index,
          animated: true,
        });
      });
    },
    []
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <FlatList
        ref={flatListRef}
        data={STORIES}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        onScrollToIndexFailed={handleScrollToIndexFailed}
        getItemLayout={getItemLayout}
        initialNumToRender={1}
        maxToRenderPerBatch={2}
        windowSize={3}
        removeClippedSubviews={true}
        decelerationRate="fast"
        snapToInterval={SCREEN_WIDTH}
        snapToAlignment="start"
        scrollEnabled={!isPaused && !isNavigatingRef.current}
      />

      {/* Story Progress Indicator dengan Animasi */}
      <View style={styles.progressContainer}>
        {STORIES.map((_, index) => (
          <View key={index} style={styles.progressBarContainer}>
            <View style={styles.progressBarBackground} />
            <Animated.View
              style={[
                styles.progressBarFill,
                {
                  width: progressAnims[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0%", "100%"],
                  }),
                },
              ]}
            />
          </View>
        ))}
      </View>

      {/* Counter */}
      <View style={styles.counter}>
        <TextInter style={styles.counterText}>
          {currentIndex + 1} / {STORIES.length}
        </TextInter>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  storyContainer: {
    width: SCREEN_WIDTH,
    height: "100%",
    backgroundColor: "#000",
    position: "relative",
  },
  containerProfile: {
    padding: 12,
    justifyContent: "space-between",
    backgroundColor: "transparent",
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    zIndex: 20,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.white,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  video: {
    width: "100%",
    aspectRatio: 9 / 16,
  },
  image: {
    width: "100%",
    aspectRatio: 9 / 16,
  },
  placeholder: {
    width: "100%",
    aspectRatio: 9 / 16,
    backgroundColor: "#1a1a1a",
  },
  navigationOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
  },
  navAreaLeft: {
    flex: 1,
    backgroundColor: "transparent",
  },
  navAreaRight: {
    flex: 1,
    backgroundColor: "transparent",
  },
  progressContainer: {
    position: "absolute",
    top: 60,
    left: 12,
    right: 12,
    flexDirection: "row",
    gap: 4,
    zIndex: 15,
  },
  progressBarContainer: {
    flex: 1,
    height: 3,
    position: "relative",
  },
  progressBarBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 2,
  },
  progressBarFill: {
    position: "absolute",
    height: "100%",
    backgroundColor: colors.white,
    borderRadius: 2,
  },
  counter: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  counterText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.white,
  },
  pauseIndicator: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -30 }, { translateY: -30 }],
    zIndex: 10,
  },
});
