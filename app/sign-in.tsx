import { InputPrimary } from "@/components/customs/inputs/InputPrimary";
import { TextInter } from "@/components/customs/texts/TextInter";
import { useAuthStore } from "@/hooks/stores/useAuthStore";
import { colors } from "@/styles/colors";
import { globalStyle } from "@/styles/globalStyles";
import { Controller, useForm } from "react-hook-form";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Login {
  email: string;
  password: string;
}

export default function SignIn() {
  const insets = useSafeAreaInsets();
  const { signIn } = useAuthStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        style={[
          globalStyle.baseContainer,
          {
            padding: 0,
            position: "relative",
          },
        ]}
      >
        <View style={styles.bgRounded} />

        <View
          style={[
            globalStyle.baseContainer,
            {
              marginTop: insets.top,
              backgroundColor: "transparent",
              alignItems: "center",
              gap: 0,
            },
          ]}
        >
          <TextInter
            style={{
              fontSize: 42,
              fontWeight: 700,
              color: colors.white,
              textAlign: "center",
            }}
          >
            HELLO
          </TextInter>
          <TextInter
            style={{
              fontSize: 24,
              fontWeight: 500,
              color: colors.white,
              textAlign: "center",
            }}
          >
            Welcome Back!
          </TextInter>

          <View
            style={[
              globalStyle.baseContainer,
              {
                width: "100%",
                marginTop: 42,
                flex: 0,
                gap: 8,
                padding: 32,
                borderRadius: 16,
                backgroundColor: colors.white,
              },
            ]}
          >
            <TextInter
              style={{ fontSize: 24, fontWeight: 700, textAlign: "center" }}
            >
              Login Account
            </TextInter>

            <TextInter
              style={{
                textAlign: "center",
                color: colors.secondaryText,
              }}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry
            </TextInter>

            <View style={{ marginTop: 24, flexDirection: "column", gap: 24 }}>
              <Controller
                name="email"
                control={control}
                rules={{ required: "Email must be filled" }}
                render={({ field }) => (
                  <InputPrimary
                    label="Email address"
                    placeholder="example@gmail.com"
                    value={field.value}
                    onValueChange={field.onChange}
                    error={errors.email?.message}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                rules={{ required: "Password must be filled" }}
                render={({ field }) => (
                  <InputPrimary
                    label="Password"
                    value={field.value}
                    placeholder="******"
                    onValueChange={field.onChange}
                    error={errors.password?.message}
                    secureTextEntry
                  />
                )}
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  bgRounded: {
    width: "100%",
    height: 300,
    borderBottomStartRadius: 100,
    borderBottomEndRadius: 100,
    backgroundColor: colors.primaryColor,
    position: "absolute",
    top: 0,
    right: 0,
  },
});
