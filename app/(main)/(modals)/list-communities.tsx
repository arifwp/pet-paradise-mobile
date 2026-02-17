import { HomeCommunityIem } from "@/components/pages/home/HomeCommunityIem";
import { useAddPostStore } from "@/hooks/stores/useAddPostStore";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { FlatList, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export interface Community {
  id: string;
  name: string;
  totalMember?: number;
  avatar?: string;
}

export const dummyCommunities: Community[] = [
  {
    id: "01",
    name: "Hewan Tersangar",
    totalMember: 120,
    avatar: "https://placehold.co/500x500.png",
  },
  {
    id: "02",
    name: "Komunitas Kakaktua",
    totalMember: 32,
    avatar: "https://placehold.co/500x500.png",
  },
  {
    id: "03",
    name: "Hewan Bandel",
    totalMember: 16,
    avatar: "https://placehold.co/500x500.png",
  },
  {
    id: "04",
    name: "Reptil Mania",
    totalMember: 72,
    avatar: "https://placehold.co/500x500.png",
  },
  {
    id: "05",
    name: "Reptil Mania",
    totalMember: 72,
    avatar: "https://placehold.co/500x500.png",
  },
  {
    id: "06",
    name: "Reptil Mania",
    totalMember: 72,
    avatar: "https://placehold.co/500x500.png",
  },
];

export default function ListCommunities() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { shareTo, setShareTo } = useAddPostStore();

  useEffect(() => {
    setShareTo(dummyCommunities[0]);
  }, []);

  return (
    <View style={{ flexDirection: "column" }}>
      <FlatList
        data={dummyCommunities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HomeCommunityIem
            data={item}
            isSelected={item.id === shareTo?.id}
            onPress={() => {
              setShareTo(item);
              router.back();
            }}
          />
        )}
        contentContainerStyle={{
          paddingBottom: insets.bottom + 32,
        }}
        scrollIndicatorInsets={{
          bottom: insets.bottom,
        }}
      />
    </View>
  );
}
