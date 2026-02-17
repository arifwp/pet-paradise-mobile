import { TempImg, useAddPostStore } from "@/hooks/stores/useAddPostStore";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Alert, Pressable } from "react-native";

export const HomePostGalleryButton = () => {
  const { imgs, isLoading, setImgs } = useAddPostStore();

  const pickImage = async () => {
    const currentImages = imgs || [];
    const currentImageCount = currentImages.length;
    const maxImages = 4;
    const remainingSlots = maxImages - currentImageCount;

    if (remainingSlots <= 0) {
      Alert.alert(
        "Batas Maksimal",
        "Anda sudah memilih 4 gambar. Hapus beberapa gambar terlebih dahulu jika ingin mengganti.",
      );
      return;
    }

    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access the media library is required.",
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      allowsMultipleSelection: true,
      selectionLimit: remainingSlots,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      const imagesWithId: TempImg[] = result.assets.map((image, index) => ({
        id: `${Date.now()}-${index}`,
        uri: image.uri,
      }));

      setImgs([...currentImages, ...imagesWithId]);
    }
  };

  return (
    <Pressable onPress={pickImage} disabled={isLoading}>
      <Ionicons name="image-outline" size={23} color="black" />
    </Pressable>
  );
};
