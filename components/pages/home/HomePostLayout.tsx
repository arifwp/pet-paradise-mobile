import { createFeedData } from "@/helpers/utils";
import { colors } from "@/styles/colors";
import { FlatList, StyleSheet, View } from "react-native";
import { Post, PostItem } from "./post/PostItem";
import { HomeQuestionFeedLayout } from "./question/HomeQuestionFeedLayout";
import { Question } from "./question/QuestionItem";

export const dummyPosts: Post[] = [
  {
    id: "1",
    userId: "user-1",
    name: "Budi Santoso",
    username: "budisantoso",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
    isFollowed: true,
    isRepost: false,
    isLike: true,
    content:
      "Hari ini saya bawa Milo ke vet untuk vaksin tahunan. Dia sangat berani dan dapat treat special setelahnya! 🐕💉",
    medias: [
      "https://images.unsplash.com/photo-1552053831-71594a27632d?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=720&h=1280&fit=crop",
      "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=720&h=1280&fit=crop&crop=face",
    ],
    countComment: 23,
    countLike: 156,
    countRepost: 12,
    created_at: "2024-01-15T08:30:00+07:00",
    updated_at: "2024-01-15T08:30:00+07:00",
    timezone: "Asia/Jakarta",
  },
  {
    id: "2",
    userId: "user-2",
    name: "Sari Dewi",
    username: "saridewi_catlove",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    isFollowed: false,
    isRepost: true,
    isLike: false,
    content:
      "Mimi baru saja melahirkan 4 anak kucing yang lucu! Butuh saran untuk merawat induk dan bayi kucing yang baru lahir. Foto-foto momen kelahirannya:",
    medias: [
      "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500&h=300&fit=crop",
    ],
    countComment: 45,
    countLike: 289,
    countRepost: 12,
    created_at: "2024-01-14T14:20:00+07:00",
    updated_at: "2024-01-14T14:20:00+07:00",
    timezone: "Asia/Jakarta",
  },
  {
    id: "3",
    userId: "user-3",
    name: "Rudi Hermawan",
    username: "rudi_birdlover",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    isFollowed: true,
    isRepost: false,
    isLike: true,
    content:
      "Lovebird saya baru bertelur! Tips untuk membuat sarang yang nyaman dan makanan yang tepat untuk lovebird yang sedang bertelur?",
    medias: [
      "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1551085254-e96b210db58a?w=500&h=300&fit=crop",
    ],
    countComment: 18,
    countLike: 124,
    countRepost: 12,
    created_at: "2024-01-13T10:15:00+07:00",
    updated_at: "2024-01-13T10:15:00+07:00",
    timezone: "Asia/Jakarta",
  },
  {
    id: "4",
    userId: "user-4",
    name: "Maya Putri",
    username: "maya_fishkeeper",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    isFollowed: false,
    isRepost: false,
    isLike: false,
    content:
      "Aquascape baru untuk ikan cupang saya! Butuh waktu 2 minggu untuk setup. Hasilnya memuaskan!",
    medias: [
      "https://images.unsplash.com/photo-1564466809056-1bca753bde5c?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1452857297128-d9c29adba80b?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1552053831-71594a27632d?w=500&h=300&fit=crop",
    ],
    countComment: 32,
    countLike: 198,
    countRepost: 12,
    created_at: "2024-01-12T16:45:00+07:00",
    updated_at: "2024-01-12T16:45:00+07:00",
    timezone: "Asia/Jakarta",
  },
  {
    id: "5",
    userId: "user-5",
    name: "Ahmad Fauzi",
    username: "ahmad_rabbitdad",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    isFollowed: true,
    isRepost: true,
    isLike: true,
    content:
      "Kelinci saya baru saja dioperasi karena hairball. Sedih lihatnya pakai cone, tapi dia tetap lucu! Pengalaman merawat kelinci pasca operasi?",
    medias: [
      "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1452857297128-d9c29adba80b?w=500&h=300&fit=crop",
    ],
    countComment: 29,
    countLike: 167,
    countRepost: 12,
    created_at: "2024-01-11T09:10:00+07:00",
    updated_at: "2024-01-11T09:10:00+07:00",
    timezone: "Asia/Jakarta",
  },
  {
    id: "6",
    userId: "user-6",
    name: "Dina Marlina",
    username: "dina_hamsterlover",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    isFollowed: false,
    isRepost: false,
    isLike: true,
    content:
      "Hamster saya lagi hamil! Siap-siap menyambut baby hamster baru. Ada yang punya pengalaman merawat induk hamster?",
    medias: [
      "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=500&h=300&fit=crop",
    ],
    countComment: 15,
    countLike: 98,
    countRepost: 12,
    created_at: "2024-01-10T11:20:00+07:00",
    updated_at: "2024-01-10T11:20:00+07:00",
    timezone: "Asia/Jakarta",
  },
  {
    id: "7",
    userId: "user-7",
    name: "Hendra Wijaya",
    username: "hendra_reptile",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    isFollowed: true,
    isRepost: false,
    isLike: false,
    content:
      "Kura-kura saya mulai aktif setelah hibernasi! Siap-siap kasih makan banyak nih.",
    medias: [
      "https://images.unsplash.com/photo-1552053831-71594a27632d?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1564466809056-1bca753bde5c?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500&h=300&fit=crop",
    ],
    countComment: 11,
    countLike: 76,
    countRepost: 12,
    created_at: "2024-01-09T13:45:00+07:00",
    updated_at: "2024-01-09T13:45:00+07:00",
    timezone: "Asia/Jakarta",
  },
  {
    id: "8",
    userId: "user-8",
    name: "Putri Wulandari",
    username: "putri_petlover",
    avatar:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=150&h=150&fit=crop&crop=face",
    isFollowed: false,
    isRepost: true,
    isLike: true,
    content:
      "Kucing liar di kompleks saya baru melahirkan. Lagi cari adopter yang bertanggung jawab!",
    medias: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=500&h=300&fit=crop",
    ],
    countComment: 67,
    countLike: 234,
    countRepost: 12,
    created_at: "2024-01-08T09:30:00+07:00",
    updated_at: "2024-01-08T09:30:00+07:00",
    timezone: "Asia/Jakarta",
  },
  {
    id: "9",
    userId: "user-9",
    name: "Agus Salim",
    username: "agus_ikanhias",
    avatar:
      "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=150&h=150&fit=crop&crop=face",
    isFollowed: true,
    isRepost: false,
    isLike: false,
    content:
      "Diskus saya mulai bertelur! Persiapan kolam untuk burayak sudah siap.",
    medias: [
      "https://images.unsplash.com/photo-1564466809056-1bca753bde5c?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1452857297128-d9c29adba80b?w=500&h=300&fit=crop",
    ],
    countComment: 21,
    countLike: 145,
    countRepost: 12,
    created_at: "2024-01-07T15:50:00+07:00",
    updated_at: "2024-01-07T15:50:00+07:00",
    timezone: "Asia/Jakarta",
  },
  {
    id: "10",
    userId: "user-10",
    name: "Nadia Ramadhani",
    username: "nadia_sugarGlider",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    isFollowed: false,
    isRepost: true,
    isLike: true,
    content:
      "Sugar glider saya belajar gliding! Senang banget lihat perkembangannya. 🥰",
    medias: [
      "https://images.unsplash.com/photo-1552053831-71594a27632d?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1551085254-e96b210db58a?w=500&h=300&fit=crop",
    ],
    countComment: 27,
    countLike: 189,
    countRepost: 12,
    created_at: "2024-01-06T12:15:00+07:00",
    updated_at: "2024-01-06T12:15:00+07:00",
    timezone: "Asia/Jakarta",
  },
];

export const dummyQuestions: Question[] = [
  {
    id: "1",
    userId: "user123",
    name: "Budi Santoso",
    username: "budisantoso",
    question:
      "Apakah aman memberikan obat cacing pada kucing yang sedang hamil?",
    isUpvote: false,
    isDownVote: false,
    isFollowed: true,
    countAnswer: 15,
    countFollow: 42,
    countUpvote: 38,
    created_at: "2024-01-15T08:30:00Z",
    updated_at: "2024-01-15T08:30:00Z",
    timezone: "Asia/Jakarta",
  },
  {
    id: "2",
    userId: "user456",
    name: "Sari Dewi",
    username: "saridewi_catlove",
    question: "Makanan apa yang baik untuk anjing dengan masalah ginjal?",
    isUpvote: true,
    isDownVote: false,
    isFollowed: false,
    countAnswer: 8,
    countFollow: 23,
    countUpvote: 45,
    created_at: "2024-01-14T14:20:00Z",
    updated_at: "2024-01-14T14:20:00Z",
    timezone: "Asia/Jakarta",
  },
  {
    id: "3",
    userId: "user789",
    name: "Rudi Hermawan",
    username: "rudi_birdlover",
    question: "Bagaimana cara merawat lovebird yang sedang bertelur?",
    isUpvote: false,
    isDownVote: true,
    isFollowed: false,
    countAnswer: 22,
    countFollow: 67,
    countUpvote: 12,
    created_at: "2024-01-13T09:45:00Z",
    updated_at: "2024-01-13T09:45:00Z",
    timezone: "Asia/Singapore",
  },
  {
    id: "4",
    userId: "user234",
    name: "Maya Putri",
    username: "maya_fishkeeper",
    question: "Berapa kali idealnya memberi makan ikan cupang dalam sehari?",
    isUpvote: false,
    isDownVote: false,
    isFollowed: true,
    countAnswer: 31,
    countFollow: 89,
    countUpvote: 56,
    created_at: "2024-01-12T11:15:00Z",
    updated_at: "2024-01-12T11:15:00Z",
    timezone: "Asia/Jakarta",
  },
  {
    id: "5",
    userId: "user567",
    name: "Ahmad Fauzi",
    username: "ahmad_rabbitdad",
    question:
      "Apakah kelinci perlu dimandikan? Jika iya, bagaimana cara yang benar?",
    isUpvote: true,
    isDownVote: false,
    isFollowed: true,
    countAnswer: 45,
    countFollow: 112,
    countUpvote: 78,
    created_at: "2024-01-11T16:30:00Z",
    updated_at: "2024-01-11T16:30:00Z",
    timezone: "Asia/Jakarta",
  },
  {
    id: "6",
    userId: "user890",
    name: "Dina Marlina",
    username: "dina_hamsterlover",
    question: "Tanda-tanda hamster stress dan cara mengatasinya?",
    isUpvote: false,
    isDownVote: false,
    isFollowed: false,
    countAnswer: 18,
    countFollow: 34,
    countUpvote: 27,
    created_at: "2024-01-10T10:00:00Z",
    updated_at: "2024-01-10T10:00:00Z",
    timezone: "Asia/Jakarta",
  },
  {
    id: "7",
    userId: "user1234",
    name: "Hendra Wijaya",
    username: "hendra_reptile",
    question: "Berapa suhu ideal untuk kandang kura-kura Brazil?",
    isUpvote: false,
    isDownVote: true,
    isFollowed: false,
    countAnswer: 12,
    countFollow: 56,
    countUpvote: 8,
    created_at: "2024-01-09T13:25:00Z",
    updated_at: "2024-01-09T13:25:00Z",
    timezone: "Asia/Jakarta",
  },
  {
    id: "8",
    userId: "user5678",
    name: "Putri Wulandari",
    username: "putri_petlover",
    question: "Vaksin apa saja yang wajib untuk kucing peliharaan?",
    isUpvote: true,
    isDownVote: false,
    isFollowed: true,
    countAnswer: 27,
    countFollow: 71,
    countUpvote: 63,
    created_at: "2024-01-08T08:45:00Z",
    updated_at: "2024-01-08T08:45:00Z",
    timezone: "Asia/Jakarta",
  },
  {
    id: "9",
    userId: "user9012",
    name: "Agus Salim",
    username: "agus_ikanhias",
    question: "Cara mengatasi ikan discus yang mogok makan?",
    isUpvote: false,
    isDownVote: false,
    isFollowed: false,
    countAnswer: 33,
    countFollow: 95,
    countUpvote: 41,
    created_at: "2024-01-07T15:20:00Z",
    updated_at: "2024-01-07T15:20:00Z",
    timezone: "Asia/Jakarta",
  },
  {
    id: "10",
    userId: "user3456",
    name: "Nadia Ramadhani",
    username: "nadia_sugarGlider",
    question: "Makanan alami apa yang aman untuk sugar glider selain pellet?",
    isUpvote: false,
    isDownVote: false,
    isFollowed: true,
    countAnswer: 19,
    countFollow: 48,
    countUpvote: 34,
    created_at: "2024-01-06T12:10:00Z",
    updated_at: "2024-01-06T12:10:00Z",
    timezone: "Asia/Jakarta",
  },
];

export type FeedItem =
  | { type: "post"; data: Post }
  | { type: "questions"; data: Question[] };

export const HomePostLayout = () => {
  const feedData = createFeedData(dummyPosts, dummyQuestions);

  const renderItem = ({ item }: { item: FeedItem }) => {
    if (item.type === "post") {
      return <PostItem data={item.data} />;
    } else {
      return <HomeQuestionFeedLayout questions={item.data} />;
    }
  };

  return (
    <View style={[styles.container]}>
      <FlatList
        style={styles.flatListPost}
        data={feedData}
        keyExtractor={(item, index) =>
          item.type === "post" ? `post-${item.data.id}` : `questions-${index}`
        }
        renderItem={renderItem}
        ItemSeparatorComponent={({ leadingItem }) => {
          // Hanya tampilkan separator antar post, bukan sebelum/sesudah questions
          if (leadingItem.type === "post") {
            return <View style={styles.separator} />;
          }
          return null;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  flatListPost: {},
  itemFlatListPost: {
    paddingHorizontal: 24,
  },
  separator: {
    height: 1,
    backgroundColor: colors.neutral50,
  },
});
