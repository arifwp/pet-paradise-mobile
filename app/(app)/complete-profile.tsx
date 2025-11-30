import { InputPhoneNumber } from "@/components/customs/inputs/InputPhoneNumber";
import {
  InputSearchDropdown,
  SelectOption,
} from "@/components/customs/inputs/InputSearchDropdown";
import { TextInter } from "@/components/customs/texts/TextInter";
import { errMsg } from "@/constants/error";
import { queryKeys } from "@/constants/queryKeys";
import { CompleteProfile, useAuthStore } from "@/hooks/stores/useAuthStore";
import { colors } from "@/styles/colors";
import { globalStyle } from "@/styles/globalStyles";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Toast } from "toastify-react-native";

export const provinces: SelectOption[] = [
  { id: 1, name: "DKI Jakarta", value: "dki_jakarta" },
  { id: 2, name: "Jawa Barat", value: "jawa_barat" },
  { id: 3, name: "Jawa Timur", value: "jawa_timur" },
];

export const cities: SelectOption[] = [
  { id: 1, name: "Jakarta Selatan", value: "jakarta_selatan" },
  { id: 2, name: "Bandung", value: "bandung" },
  { id: 3, name: "Surabaya", value: "surabaya" },
];

export const districts: SelectOption[] = [
  { id: 1, name: "Kebayoran Baru", value: "kebayoran_baru" },
  { id: 2, name: "Coblong", value: "coblong" },
  { id: 3, name: "Gubeng", value: "gubeng" },
];

export const villages: SelectOption[] = [
  { id: 1, name: "Selong", value: "selong" },
  { id: 2, name: "Dago", value: "dago" },
  { id: 3, name: "Gubeng", value: "gubeng" },
];

export default function CompleteProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const queryClient = useQueryClient();
  const { setProfileComplete } = useAuthStore();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CompleteProfile>();

  const profileMutation = useMutation({
    mutationFn: async () => {},
    onSuccess: () => {},
    onError: (error: any) => {
      Toast.error(error?.message || errMsg.common);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey.includes(queryKeys.user.current);
        },
      });
    },
  });

  const onSubmit = (data: CompleteProfile) => {
    // router.push("/");
    setProfileComplete(data);
    // profileMutation.mutate()
  };

  return (
    <ScrollView
      contentContainerStyle={styles.sv}
      keyboardShouldPersistTaps="handled"
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View
          style={[
            globalStyle.baseContainer,
            {
              paddingTop: 16,
              paddingBottom: insets.bottom + 24,
              width: "100%",
              gap: 52,
              alignItems: "center",
            },
          ]}
        >
          <View style={styles.header}>
            <TextInter style={styles.titlePage}>
              Complete Your Profile
            </TextInter>

            <TextInter style={styles.subtitlePage}>
              {
                "Don`t worry, only you can see your personal data. No one else will be able to see it."
              }
            </TextInter>
          </View>

          <View style={{ width: "100%", gap: 24 }}>
            <Controller
              name="phone"
              control={control}
              rules={{ required: "Nomor whatsapp harus diisi" }}
              render={({ field }) => (
                <InputPhoneNumber
                  label="Nomor Whatsapp"
                  onValueChange={field.onChange}
                  value={field.value}
                  error={errors.phone?.message}
                />
              )}
            />

            <Controller
              name="province"
              control={control}
              rules={{ required: "Provinsi harus diisi" }}
              render={({ field }) => (
                <InputSearchDropdown
                  options={provinces}
                  value={field.value}
                  onSelectedValue={field.onChange}
                  label="Provinsi"
                />
              )}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  sv: {
    flexGrow: 1,
  },
  header: {
    width: "100%",
    gap: 12,
    alignItems: "center",
    flexDirection: "column",
  },
  titlePage: { fontWeight: 600, fontSize: 32, textAlign: "center" },
  subtitlePage: {
    fontSize: 14,
    color: colors.secondaryText,
    textAlign: "center",
  },
});
