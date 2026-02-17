import { OTPInput, OTPInputRef, type SlotProps } from "input-otp-native";
import { useRef } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

import { errMsg } from "@/constants/error";
import { queryKeys } from "@/constants/queryKeys";
import { isNumericString } from "@/helpers/number";
import { useAuthStore } from "@/hooks/stores/useAuthStore";
import { colors } from "@/styles/colors";
import { globalStyle } from "@/styles/globalStyles";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { Toast } from "toastify-react-native";

interface Otp {
  field1: string;
  field2: string;
  field3: string;
  field4: string;
}

export const CompleteProfileOtp = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { updateUser } = useAuthStore();
  // const { setProfileComplete } = useAuthStore();
  const ref = useRef<OTPInputRef>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
    getValues,
    setValue,
  } = useForm<Otp>();

  const otpMutation = useMutation({
    mutationFn: async (code: string) => {
      await updateUser({ phone: "08123123123" });
    },
    onSuccess: () => {
      Toast.success("Kode OTP berhasil diverifikasi");

      // setProfileComplete()
      router.replace("/");
    },
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

  const onComplete = (code: string) => {
    const isValid = isNumericString(code);

    if (!isValid) {
      Alert.alert("OTP harus berupa angka");
      ref.current?.clear();
      return;
    }

    otpMutation.mutate(code);
  };

  return (
    <View style={[globalStyle.containerColumn]}>
      <OTPInput
        ref={ref}
        onComplete={onComplete}
        containerStyle={styles.container}
        maxLength={5}
        inputMode="numeric"
        keyboardType="numeric"
        render={({ slots }) => (
          <View style={styles.slotsContainer}>
            {slots.map((slot, idx) => (
              <Slot key={idx} {...slot} />
            ))}
          </View>
        )}
      />

      <View style={[globalStyle.containerRow]}></View>
    </View>
  );
};

const Slot = ({ char, isActive }: SlotProps) => {
  return (
    <View
      style={[
        globalStyle.input,
        styles.input,
        isActive && globalStyle.inputFocus,
      ]}
    >
      {char !== null && <Text style={styles.char}>{char}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  slotsContainer: {
    flexDirection: "row",
    gap: 8,
  },
  input: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
  },
  char: {
    fontSize: 18,
    color: colors.primaryBlack,
  },
  fakeCaretContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  fakeCaret: {
    width: 2,
    height: 28,
    backgroundColor: "#000",
    borderRadius: 1,
  },
});
