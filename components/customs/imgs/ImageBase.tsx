import { Image, ImageProps, ImageStyle } from "expo-image";
import { StyleProp } from "react-native";

interface Props extends ImageProps {
  style: StyleProp<ImageStyle>;
}

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export const ImageBase = ({ style, ...rest }: Props) => {
  return <Image style={style} placeholder={{ blurhash }} {...rest} />;
};
