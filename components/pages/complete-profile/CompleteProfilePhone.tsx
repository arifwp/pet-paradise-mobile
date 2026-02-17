import { CompleteProfileActiveForm } from "@/app/(main)/complete-profile";
import { ButtonSolid } from "@/components/buttons/ButtonSolid";
import { errMsg } from "@/constants/error";
import { validatePhone } from "@/helpers/number";
import { useMutation } from "@tanstack/react-query";
import { getCalendars } from "expo-localization";
import { Dispatch, SetStateAction } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Toast } from "toastify-react-native";
import { InputPhoneNumber } from "../../inputs/InputPhoneNumber";

interface Props {
  setActiveForm: Dispatch<SetStateAction<CompleteProfileActiveForm>>;
}

interface PhoneForm {
  phone: string;
}

export const CompleteProfilePhone = ({ setActiveForm }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<PhoneForm>();

  const phoneMutation = useMutation({
    mutationFn: async (data: PhoneForm) => {
      const currentTimezone = getCalendars()[0]?.timeZone || "Asia/Jakarta";

      return true;
    },
    onSuccess: () => {
      setActiveForm(CompleteProfileActiveForm.OTP);
    },
    onError: (error: any) => {
      Toast.error(error?.message || errMsg.common);
    },
  });

  const onSubmitPhone = (data: PhoneForm) => {
    const { valid } = validatePhone(data.phone);
    if (!valid) {
      setError("phone", {
        type: "custom",
        message: "Format nomor tidak valid",
      });
      return;
    }

    phoneMutation.mutate(data);
  };

  return (
    <View
      style={{
        width: "100%",
        flexGrow: 1,
        gap: 24,
        justifyContent: "space-between",
      }}
    >
      <Controller
        name="phone"
        control={control}
        rules={{
          required: "Nomor whatsapp harus diisi",
          pattern: {
            value: /^08\d{6,13}$/, // minimal 8 digit, maksimal 15
            message: "Nomor harus diawali dengan 08",
          },
        }}
        render={({ field }) => (
          <InputPhoneNumber
            label="Nomor Whatsapp"
            onValueChange={field.onChange}
            value={field.value}
            error={errors.phone?.message}
          />
        )}
      />

      <ButtonSolid
        onPress={() => {
          clearErrors();
          handleSubmit(onSubmitPhone)();
        }}
        title="Kirim OTP"
      />
    </View>
  );
};

const styles = StyleSheet.create({});
