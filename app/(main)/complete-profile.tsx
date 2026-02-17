import { CompleteProfileOtp } from "@/components/customs/pages/complete-profile/CompleteProfileOtp";
import { CompleteProfilePhone } from "@/components/customs/pages/complete-profile/CompleteProfilePhone";
import { TextInter } from "@/components/customs/texts/TextInter";
import { colors } from "@/styles/colors";
import { globalStyle } from "@/styles/globalStyles";
import { useState } from "react";
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export enum CompleteProfileActiveForm {
  PHONE,
  OTP,
}

export default function CompleteProfileScreen() {
  const insets = useSafeAreaInsets();

  const [activeForm, setActiveForm] = useState<CompleteProfileActiveForm>(
    CompleteProfileActiveForm.PHONE,
  );

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
              paddingBottom: insets.bottom,
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

          {activeForm === CompleteProfileActiveForm.PHONE ? (
            <CompleteProfilePhone setActiveForm={setActiveForm} />
          ) : (
            <CompleteProfileOtp />
          )}
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
