import { Image, ImageProps, ImageStyle } from "expo-image";
import { StyleProp } from "react-native";

interface Props extends ImageProps {
  style?: StyleProp<ImageStyle>;
  source: string;
}

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export const ImageBase = ({ style, source, ...rest }: Props) => {
  return (
    <Image
      source={source}
      style={style}
      transition={1000}
      placeholder={{ blurhash }}
      {...rest}
    />
  );
};
