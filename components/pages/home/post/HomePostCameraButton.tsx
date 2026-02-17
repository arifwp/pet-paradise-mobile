import { TempImg, useAddPostStore } from "@/hooks/stores/useAddPostStore";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Alert, Pressable } from "react-native";

export const HomePostCameraButton = () => {
  const { isLoading, setImgs } = useAddPostStore();

  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access the media library is required.",
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      allowsMultipleSelection: true,
      selectionLimit: 4,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      const imagesWithId: TempImg[] = result.assets.map((image, index) => ({
        id: `${Date.now()}-${index}`,
        uri: image.uri,
      }));

      setImgs(imagesWithId);
    }
  };

  return (
    <Pressable onPress={openCamera} disabled={isLoading}>
      <Ionicons name="camera-outline" size={24} color="black" />
    </Pressable>
  );
};
