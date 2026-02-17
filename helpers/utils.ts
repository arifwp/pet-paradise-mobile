import { FeedItem } from "@/components/pages/home/HomePostLayout";
import { Post } from "@/components/pages/home/post/PostItem";
import { Question } from "@/components/pages/home/question/QuestionItem";
import { getRandomNumber } from "./number";

export const createFeedData = (
  posts: Post[],
  questions: Question[],
): FeedItem[] => {
  const feedItems: FeedItem[] = [];

  // Generate random index (antara 5-8, yang berarti setelah post index 4-7)
  const randomIndex = getRandomNumber(5, 8);

  posts.forEach((post, index) => {
    // Tambahkan post
    feedItems.push({ type: "post", data: post });

    // Sisipkan 3 questions pada index acak
    if (index === randomIndex) {
      // Ambil 3 questions acak dari dummyQuestions
      const shuffledQuestions = [...questions].sort(() => 0.5 - Math.random());
      const selectedQuestions = shuffledQuestions.slice(0, 3);

      feedItems.push({ type: "questions", data: selectedQuestions });
    }
  });

  return feedItems;
};
