import { ButtonGoogleAuth } from "@/components/buttons/ButtonGoogleAuth";
import { ButtonSolid } from "@/components/buttons/ButtonSolid";
import { ContainerSafeAreaView } from "@/components/containers/ContainerSafeAreaView";
import { InputPassword } from "@/components/inputs/InputPassword";
import { InputPrimary } from "@/components/inputs/InputPrimary";
import { TextInter } from "@/components/texts/TextInter";
import { colors } from "@/styles/colors";
import { globalStyle } from "@/styles/globalStyles";
import { Checkbox } from "expo-checkbox";
import { Link } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Toast } from "toastify-react-native";

interface Register {
  name: string;
  email: string;
  password: string;
  terms: boolean;
}

export default function RegisterScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Register>();

  const onSubmit = (data: Register) => {
    if (!data.terms) {
      Toast.error("Terms & Condition harus disetujui sebelum mendaftar");
      return;
    }

    console.log("data", data);

    // router.push("/login");
  };

  return (
    <ContainerSafeAreaView>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View
            style={[
              globalStyle.baseContainer,
              {
                width: "100%",
                gap: 52,
              },
            ]}
          >
            {/* HEADER */}
            <View style={[globalStyle.containerColumn, { gap: 12 }]}>
              <TextInter style={styles.titlePage}>Create Account</TextInter>

              <TextInter style={styles.subtitlePage}>
                Fill your information below or register with your social account
              </TextInter>
            </View>

            {/* BODY */}
            <View style={{ width: "100%", gap: 24 }}>
              <Controller
                name="name"
                control={control}
                rules={{ required: "Name must be filled" }}
                render={({ field }) => (
                  <InputPrimary
                    label="Name"
                    value={field.value}
                    onValueChange={field.onChange}
                    error={errors.name?.message}
                    placeholder="Ex. Jonh Doe"
                  />
                )}
              />

              <Controller
                name="email"
                control={control}
                rules={{ required: "Email must be filled" }}
                render={({ field }) => (
                  <InputPrimary
                    label="Email"
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

              <Controller
                name="terms"
                control={control}
                render={({ field }) => (
                  <Pressable
                    style={[
                      globalStyle.containerRow,
                      {
                        marginTop: -8,
                        marginBottom: 12,
                        gap: 12,
                      },
                    ]}
                    onPress={() => field.onChange(!field.value)}
                  >
                    <Checkbox
                      style={[globalStyle.inputCheckbox]}
                      value={field.value}
                      onValueChange={field.onChange}
                      color={field.value ? colors.primary : colors.neutral400}
                    />

                    <TextInter style={{ fontWeight: 600 }}>
                      Agree with{" "}
                      <Link
                        href={"/"}
                        style={[
                          globalStyle.primaryLink,
                          {
                            fontWeight: 600,
                            textDecorationLine: "underline",
                          },
                        ]}
                      >
                        Terms & Condition
                      </Link>
                    </TextInter>
                  </Pressable>
                )}
              />

              <ButtonSolid title="Register" onPress={handleSubmit(onSubmit)} />

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

            {/* FOOTER */}
            <View
              style={[
                globalStyle.containerRow,
                { gap: 6, justifyContent: "center" },
              ]}
            >
              <TextInter style={{ fontWeight: 600 }}>
                {"Already have account?"}
              </TextInter>

              <Link
                href={"/"}
                style={[
                  globalStyle.primaryLink,
                  {
                    textDecorationLine: "underline",
                  },
                ]}
              >
                Login
              </Link>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </ContainerSafeAreaView>
  );
}

const styles = StyleSheet.create({
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
