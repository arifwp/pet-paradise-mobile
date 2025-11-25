import { ButtonGoogleAuth } from "@/components/customs/buttons/ButtonGoogleAuth";
import { ButtonPrimary } from "@/components/customs/buttons/ButtonPrimary";
import { InputPassword } from "@/components/customs/inputs/InputPassword";
import { InputPhoneNumber } from "@/components/customs/inputs/InputPhoneNumber";
import { InputPrimary } from "@/components/customs/inputs/InputPrimary";
import { TextInter } from "@/components/customs/texts/TextInter";
import { colors } from "@/styles/colors";
import { globalStyle } from "@/styles/globalStyles";
import { useHeaderHeight } from "@react-navigation/elements";
import { Link } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Register {
  name: string;
  username: string;
  email: string;
  phone?: string;
  password: string;
}

export default function RegisterScreen() {
  const headerHeight = useHeaderHeight();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Register>();

  const onSubmit = (data: Register) => {
    console.log("data", data);

    // router.push("/login");
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
              {
                paddingVertical: 0,
                width: "100%",
              },
            ]}
          >
            <View style={styles.header}>
              <TextInter style={styles.titlePage}>Register</TextInter>

              <TextInter style={styles.subtitlePage}>
                Please register your account
              </TextInter>
            </View>

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
                  />
                )}
              />

              <Controller
                name="username"
                control={control}
                rules={{ required: "Username must be filled" }}
                render={({ field }) => (
                  <InputPrimary
                    label="Username"
                    value={field.value}
                    onValueChange={field.onChange}
                    error={errors.username?.message}
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
                  />
                )}
              />

              <Controller
                name="phone"
                control={control}
                rules={{
                  required: "Phone number wajib diisi",
                  validate: {
                    startsWith08: (v: any) =>
                      v?.startsWith("08") || "Format must be 08xxxxx",
                  },
                }}
                render={({ field }) => (
                  <InputPhoneNumber
                    label="Phone Number"
                    value={field.value ?? ""}
                    onValueChange={field.onChange}
                    error={errors.phone?.message}
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

              <ButtonPrimary
                title="Register"
                onPress={handleSubmit(onSubmit)}
              />

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
              <TextInter>{"Already have account?"}</TextInter>

              <Link href={"/login"} style={globalStyle.primaryLink}>
                Login
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
