import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect, useState } from "react";

export const getCurrentOrientation = async () => {
  const orientation = await ScreenOrientation.getOrientationAsync();
  return orientation;
};

export const useOrientation = () => {
  const [orientation, setOrientation] =
    useState<ScreenOrientation.Orientation>();
  const [isLandscape, setIsLandscape] = useState(false);
  const [isPortrait, setIsPortrait] = useState(true);

  useEffect(() => {
    getCurrentOrientation().then((orient) => {
      setOrientation(orient);
      updateOrientationType(orient);
    });

    const subscription = ScreenOrientation.addOrientationChangeListener(
      (event) => {
        const orient = event.orientationInfo.orientation;
        setOrientation(orient);
        updateOrientationType(orient);
      }
    );

    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription);
    };
  }, []);

  const updateOrientationType = (orient: ScreenOrientation.Orientation) => {
    const isLandscapeMode =
      orient === ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
      orient === ScreenOrientation.Orientation.LANDSCAPE_RIGHT;

    setIsLandscape(isLandscapeMode);
    setIsPortrait(!isLandscapeMode);
  };

  return { orientation, isLandscape, isPortrait };
};
