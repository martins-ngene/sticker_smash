import { Image, StyleSheet } from "react-native";

export default function ImageViewer({ DefaultBackgroundImage }) {
  return <Image source={DefaultBackgroundImage} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
