import { ButtonGoogleAuth } from "@/components/customs/buttons/ButtonGoogleAuth";
import { ButtonPrimary } from "@/components/customs/buttons/ButtonSolid";
import { ContainerSafeAreaView } from "@/components/customs/containers/ContainerSafeAreaView";
import { InputPassword } from "@/components/customs/inputs/InputPassword";
import { InputPrimary } from "@/components/customs/inputs/InputPrimary";
import { TextInter } from "@/components/customs/texts/TextInter";
import { dummyUser, useAuthStore } from "@/hooks/stores/useAuthStore";
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
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Login {
  email: string;
  password: string;
}

export default function LoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { login, setLoading, setError } = useAuthStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>();

  const onSubmit = async (data: Login) => {
    await login(dummyUser, "dummy token", "dummy refresh token");

    router.replace("/(main)/search");
  };

  return (
    <ContainerSafeAreaView>
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
                paddingTop: insets.top + 24,
                paddingBottom: insets.bottom + 24,
                width: "100%",
                gap: 52,
                alignItems: "center",
                justifyContent: "center",
              },
            ]}
          >
            <View style={styles.header}>
              <TextInter style={styles.titlePage}>Sign In</TextInter>

              <TextInter style={styles.subtitlePage}>
                Hi! Welcome back, lets manage your kos
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
                    placeholder="example@gmail.com"
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
                    placeholder="********"
                  />
                )}
              />

              <Link
                href={"/forgot-password"}
                style={{
                  marginTop: -8,
                  marginBottom: 12,
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
              <TextInter style={{ fontWeight: 600 }}>
                {"Don't have any account?"}
              </TextInter>

              <Link
                href={"/(main)/search"}
                style={[
                  globalStyle.primaryLink,
                  {
                    textDecorationLine: "underline",
                  },
                ]}
              >
                Register
              </Link>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </ContainerSafeAreaView>
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
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.secondaryText,
  },
});
