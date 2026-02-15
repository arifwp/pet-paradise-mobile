import { Community } from "@/app/(main)/(modals)/list-communities";
import { errMsg } from "@/constants/error";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Toast } from "toastify-react-native";
import { create } from "zustand";

export enum PostType {
  POST = "post",
  QUESTION = "question",
}

export interface TempImg {
  id: string;
  uri: string;
}

export interface AddPost {
  content?: string;
  imgs?: TempImg[];
}

interface AddPostStore {
  // State
  postType: PostType;
  question?: string;
  content?: string;
  imgs?: TempImg[];
  shareTo: Community | undefined;
  isLoading: boolean;

  // Actions
  setPostType: (postType: PostType) => void;
  setQuestion: (question: string) => void;
  setContent: (content: string) => void;
  setImgs: (imgs: TempImg[]) => void;
  removeImg: (img: TempImg) => void;
  setShareTo: (community: Community) => void;
  clear: VoidFunction;

  // Internal setter for isLoading
  _setIsLoading: (isLoading: boolean) => void;
}

export const useAddPostStore = create<AddPostStore>((set) => ({
  // Initial state
  postType: PostType.POST,
  question: undefined,
  content: undefined,
  imgs: [],
  shareTo: undefined,
  isLoading: false,

  // Actions
  setPostType: (postType) =>
    set(() => ({
      postType,
    })),
  setQuestion: (question: string) =>
    set(() => ({
      question,
    })),
  setContent: (content: string) =>
    set(() => ({
      content,
    })),
  setImgs: (imgs: TempImg[]) =>
    set(() => ({
      imgs,
    })),
  removeImg: (imgId: TempImg) => {
    set((state) => ({
      imgs: state.imgs?.filter((v) => v?.id !== imgId?.id),
    }));
  },
  setShareTo: (community: Community) => {
    set(() => ({
      shareTo: community,
    }));
  },
  clear: () => {
    set(() => ({
      question: undefined,
      content: undefined,
      imgs: [],
      shareTo: undefined,
    }));
  },
  _setIsLoading: (isLoading: boolean) => {
    set(() => ({
      isLoading,
    }));
  },
}));

// Custom hook untuk mutations
export const useAddPostMutations = () => {
  const router = useRouter();
  const { clear, _setIsLoading } = useAddPostStore();

  const addPostMutation = useMutation({
    mutationFn: async () => {
      // TODO: Implement actual API call
      // const response = await api.createPost({...});
      // return response;

      // Simulasi API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return true;
    },
    onMutate: () => {
      _setIsLoading(true);
    },
    onSuccess: () => {
      Toast.success("Sukses mempublish postingan");
      clear();
      router.back();
    },
    onError: (error: Error) => {
      Toast.error(error?.message || errMsg.common);
    },
    onSettled: () => {
      _setIsLoading(false);
    },
  });

  const addQuestionMutation = useMutation({
    mutationFn: async () => {
      // TODO: Implement actual API call
      // const response = await api.createQuestion({...});
      // return response;

      // Simulasi API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return true;
    },
    onMutate: () => {
      _setIsLoading(true);
    },
    onSuccess: () => {
      Toast.success("Sukses mempublish pertanyaan");
      clear();
      router.back();
    },
    onError: (error: Error) => {
      Toast.error(error?.message || errMsg.common);
    },
    onSettled: () => {
      _setIsLoading(false);
    },
  });

  return {
    addPostMutation,
    addQuestionMutation,
  };
};
