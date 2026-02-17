import { colors } from "@/styles/colors";
import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect, useState } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import {
  Edges,
  SafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";

interface Props extends SafeAreaViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const ContainerSafeAreaView = ({ children, style, ...rest }: Props) => {
  const [orientation, setOrientation] =
    useState<ScreenOrientation.Orientation>();

  useEffect(() => {
    const getOrientation = async () => {
      const current = await ScreenOrientation.getOrientationAsync();
      setOrientation(current);
    };

    getOrientation();

    const sub = ScreenOrientation.addOrientationChangeListener((event) => {
      setOrientation(event.orientationInfo.orientation);
    });

    return () => {
      ScreenOrientation.removeOrientationChangeListener(sub);
    };
  }, []);

  const getEdges = (): Edges => {
    switch (orientation) {
      case ScreenOrientation.Orientation.LANDSCAPE_LEFT:
        return ["right"];
      case ScreenOrientation.Orientation.LANDSCAPE_RIGHT:
        return ["left"];
      case ScreenOrientation.Orientation.PORTRAIT_UP:
      case ScreenOrientation.Orientation.PORTRAIT_DOWN:
      default:
        return ["top"];
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, style]}
      edges={getEdges()}
      {...rest}
    >
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
