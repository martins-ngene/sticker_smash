import { Image, StyleSheet } from "react-native";

export default function ImageViewer({ DefaultBackgroundImage, selectedImage }) {
  const imageSoucre = selectedImage
    ? { uri: selectedImage }
    : DefaultBackgroundImage;
  return <Image source={imageSoucre} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
