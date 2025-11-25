import { ButtonGoogleAuth } from "@/components/customs/buttons/ButtonGoogleAuth";
import { ButtonPrimary } from "@/components/customs/buttons/ButtonPrimary";
import { InputPassword } from "@/components/customs/inputs/InputPassword";
import { InputPrimary } from "@/components/customs/inputs/InputPrimary";
import { TextInter } from "@/components/customs/texts/TextInter";
import { useAuthStore } from "@/hooks/stores/useAuthStore";
import { colors } from "@/styles/colors";
import { globalStyle } from "@/styles/globalStyles";
import { Link, useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Login {
  email: string;
  password: string;
}

export default function LoginScreen() {
  const router = useRouter();

  const { signIn } = useAuthStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>();

  const onSubmit = (data: Login) => {
    console.log("data", data);
    signIn("xxx");

    router.replace("/");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={styles.sv}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View
            style={[
              globalStyle.baseContainer,
              { paddingVertical: 0, width: "100%" },
            ]}
          >
            <View style={styles.header}>
              <TextInter style={styles.titlePage}>Login</TextInter>

              <TextInter style={styles.subtitlePage}>
                Please login to continue using app
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

              <Controller
                name="password"
                control={control}
                rules={{ required: "Password must be filled" }}
                render={({ field }) => (
                  <InputPassword
                    label="Password"
                    value={field.value}
                    onValueChange={field.onChange}
                    error={errors.password?.message}
                  />
                )}
              />

              <Link
                href={"/forgot-password"}
                style={{
                  marginTop: -12,
                  fontWeight: 600,
                  color: colors.primary,
                  alignSelf: "flex-end",
                }}
              >
                Forgot Password?
              </Link>

              <ButtonPrimary title="Log In" onPress={handleSubmit(onSubmit)} />

              <View
                style={{
                  marginVertical: 12,
                  gap: 12,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View style={styles.divider} />

                <TextInter style={{ color: colors.secondaryText }}>
                  OR
                </TextInter>

                <View style={styles.divider} />
              </View>

              <ButtonGoogleAuth />
            </View>

            <View
              style={[
                globalStyle.containerRow,
                { gap: 6, justifyContent: "center" },
              ]}
            >
              <TextInter>{"Don't have any account?"}</TextInter>

              <Link href={"/"} style={globalStyle.primaryLink}>
                Register
              </Link>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sv: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    width: "100%",
    gap: 8,
    alignItems: "flex-start",
    flexDirection: "column",
  },
  titlePage: { fontWeight: 700, fontSize: 32 },
  subtitlePage: { fontSize: 14, color: colors.secondaryText },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.secondaryText,
  },
});
