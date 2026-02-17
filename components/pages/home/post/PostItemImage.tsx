import { ImageBase } from "@/components/imgs/ImageBase";
import { Link } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { Post } from "./PostItem";

export const PostItemImage = ({ data }: { data: Post }) => {
  const imgs = data.medias;
  const imageCount = data.medias.length;

  // Fungsi untuk mendapatkan border radius berdasarkan posisi dan jumlah image
  const getBorderRadius = (index: number) => {
    const radius = 4;

    if (imageCount === 1) {
      return { borderRadius: radius };
    }

    if (imageCount === 2) {
      if (index === 0) {
        return { borderTopLeftRadius: radius, borderBottomLeftRadius: radius };
      }
      return { borderTopRightRadius: radius, borderBottomRightRadius: radius };
    }

    if (imageCount === 3) {
      if (index === 0) {
        return { borderTopLeftRadius: radius };
      }
      if (index === 1) {
        return { borderBottomLeftRadius: radius };
      }
      return {
        borderTopRightRadius: radius,
        borderBottomRightRadius: radius,
      };
    }

    if (imageCount === 4) {
      if (index === 0) {
        return { borderTopLeftRadius: radius };
      }
      if (index === 1) {
        return { borderBottomLeftRadius: radius };
      }
      if (index === 2) {
        return { borderTopRightRadius: radius };
      }
      return { borderBottomRightRadius: radius };
    }

    return {};
  };

  // Fungsi untuk mendapatkan container style berdasarkan jumlah image
  const getContainerStyle = () => {
    const baseStyle = [styles.container];

    if (imageCount === 1) {
      return [...baseStyle, styles.containerSingle];
    }
    if (imageCount === 2) {
      return [...baseStyle, styles.containerTwo];
    }
    if (imageCount === 3) {
      return [...baseStyle, styles.containerThree];
    }
    if (imageCount === 4) {
      return [...baseStyle, styles.containerFour];
    }
    return baseStyle;
  };

  // Fungsi untuk mendapatkan pressable style
  const getPressableStyle = (index: number) => {
    if (imageCount === 1) {
      return styles.singleImage;
    }

    if (imageCount === 2) {
      return styles.twoImages;
    }

    if (imageCount === 3) {
      if (index === 0 || index === 1) {
        return styles.threeImagesLeft;
      }
      return styles.threeImagesRight;
    }

    if (imageCount === 4) {
      return styles.fourImages;
    }

    return {};
  };

  return (
    <View style={getContainerStyle()}>
      {imageCount === 3 ? (
        // Layout untuk 3 gambar
        <>
          <View style={styles.leftColumn}>
            <Link
              href={{
                pathname: "/(main)/(modals)/image-preview",
                params: {
                  postData: JSON.stringify(data),
                  initialIndex: 0,
                },
              }}
              asChild
            >
              <Pressable style={getPressableStyle(0)}>
                <ImageBase
                  source={imgs[0]}
                  style={[styles.img, styles.fullSize, getBorderRadius(0)]}
                />
              </Pressable>
            </Link>
            <Link
              href={{
                pathname: "/(main)/(modals)/image-preview",
                params: {
                  postData: JSON.stringify(data),
                  initialIndex: 1,
                },
              }}
              asChild
            >
              <Pressable style={getPressableStyle(1)}>
                <ImageBase
                  source={imgs[1]}
                  style={[styles.img, styles.fullSize, getBorderRadius(1)]}
                />
              </Pressable>
            </Link>
          </View>
          <View style={styles.rightColumn}>
            <Link
              href={{
                pathname: "/(main)/(modals)/image-preview",
                params: {
                  postData: JSON.stringify(data),
                  initialIndex: 2,
                },
              }}
              asChild
            >
              <Pressable style={getPressableStyle(2)}>
                <ImageBase
                  source={imgs[2]}
                  style={[styles.img, styles.fullSize, getBorderRadius(2)]}
                />
              </Pressable>
            </Link>
          </View>
        </>
      ) : imageCount === 4 ? (
        // Layout untuk 4 gambar: 2 kolom dengan 2 baris
        <>
          <View style={styles.leftColumn}>
            <Link
              href={{
                pathname: "/(main)/(modals)/image-preview",
                params: {
                  postData: JSON.stringify(data),
                  initialIndex: 0,
                },
              }}
              asChild
            >
              <Pressable style={getPressableStyle(0)}>
                <ImageBase
                  source={imgs[0]}
                  style={[styles.img, styles.fullSize, getBorderRadius(0)]}
                />
              </Pressable>
            </Link>
            <Link
              href={{
                pathname: "/(main)/(modals)/image-preview",
                params: {
                  postData: JSON.stringify(data),
                  initialIndex: 1,
                },
              }}
              asChild
            >
              <Pressable style={getPressableStyle(1)}>
                <ImageBase
                  source={imgs[1]}
                  style={[styles.img, styles.fullSize, getBorderRadius(1)]}
                />
              </Pressable>
            </Link>
          </View>
          <View style={styles.rightColumn}>
            <Link
              href={{
                pathname: "/(main)/(modals)/image-preview",
                params: {
                  postData: JSON.stringify(data),
                  initialIndex: 2,
                },
              }}
              asChild
            >
              <Pressable style={getPressableStyle(2)}>
                <ImageBase
                  source={imgs[2]}
                  style={[styles.img, styles.fullSize, getBorderRadius(2)]}
                />
              </Pressable>
            </Link>
            <Link
              href={{
                pathname: "/(main)/(modals)/image-preview",
                params: {
                  postData: JSON.stringify(data),
                  initialIndex: 3,
                },
              }}
              asChild
            >
              <Pressable style={getPressableStyle(3)}>
                <ImageBase
                  source={imgs[3]}
                  style={[styles.img, styles.fullSize, getBorderRadius(3)]}
                />
              </Pressable>
            </Link>
          </View>
        </>
      ) : (
        // Layout untuk 1 dan 2 gambar
        imgs.map((item, index) => (
          <Link
            key={index}
            href={{
              pathname: "/(main)/(modals)/image-preview",
              params: {
                postData: JSON.stringify(data),
                initialIndex: index,
              },
            }}
            asChild
          >
            <Pressable style={getPressableStyle(index)}>
              <ImageBase
                source={item}
                style={[styles.img, styles.fullSize, getBorderRadius(index)]}
              />
            </Pressable>
          </Link>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  containerSingle: {
    aspectRatio: 16 / 9,
    overflow: "hidden",
    flexDirection: "row",
  },
  containerTwo: {
    aspectRatio: 16 / 9,
    overflow: "hidden",
    flexDirection: "row",
    gap: 2,
  },
  containerThree: {
    aspectRatio: 16 / 9,
    overflow: "hidden",
    flexDirection: "row",
    gap: 2,
  },
  containerFour: {
    aspectRatio: 16 / 9,
    overflow: "hidden",
    flexDirection: "row",
    gap: 2,
  },
  img: {
    objectFit: "cover",
  },
  fullSize: {
    width: "100%",
    height: "100%",
  },
  // Layout untuk 1 gambar
  singleImage: {
    width: "100%",
    height: "100%",
  },
  // Layout untuk 2 gambar
  twoImages: {
    width: "49.75%",
    height: "100%",
  },
  // Layout untuk 3 gambar
  leftColumn: {
    width: "49.75%",
    height: "100%",
    gap: 2,
  },
  rightColumn: {
    width: "49.75%",
    height: "100%",
    gap: 2,
  },
  threeImagesLeft: {
    width: "100%",
    height: "49.75%",
  },
  threeImagesRight: {
    width: "100%",
    height: "100%",
  },
  // Layout untuk 4 gambar
  fourImages: {
    width: "100%",
    height: "49.75%",
  },
});
