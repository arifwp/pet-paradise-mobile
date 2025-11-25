import { ButtonPrimary } from "@/components/customs/buttons/ButtonPrimary";
import { InputPrimary } from "@/components/customs/inputs/InputPrimary";
import { TextInter } from "@/components/customs/texts/TextInter";
import { colors } from "@/styles/colors";
import { globalStyle } from "@/styles/globalStyles";
import { Controller, useForm } from "react-hook-form";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface ForgotPassword {
  email: string;
}

export default function ForgotPasswordScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPassword>();

  const onSubmit = (data: ForgotPassword) => {
    console.log("forgot-password-form", data);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        style={[
          globalStyle.baseContainer,
          {
            // paddingTop: 12,
          },
        ]}
      >
        <View
          style={{
            width: "100%",
            gap: 24,
            flex: 1,
            flexDirection: "column",
          }}
        >
          <View style={styles.header}>
            <TextInter style={styles.titlePage}>Forgot Password</TextInter>

            <TextInter style={styles.subtitlePage}>
              Losing your password? dont worry i got you
            </TextInter>
          </View>

          <View style={{ width: "100%", gap: 24 }}>
            <Controller
              name="email"
              control={control}
              rules={{ required: "Email must be filled" }}
              render={({ field }) => (
                <InputPrimary
                  label="Email address"
                  value={field.value}
                  onValueChange={field.onChange}
                  error={errors.email?.message}
                />
              )}
            />
          </View>
        </View>

        <ButtonPrimary
          title="Send me email"
          onPress={handleSubmit(onSubmit)}
          buttonStyle={{ width: "100%", marginBottom: 24 }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    gap: 8,
    alignItems: "flex-start",
    flexDirection: "column",
  },
  titlePage: { fontWeight: 700, fontSize: 32 },
  subtitlePage: { fontSize: 14, color: colors.secondaryText },
});
