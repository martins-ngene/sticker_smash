import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

import ImageViewer from "./components/ImageViewer";
import Button from "./components/Button";

// Assets Import
const DefaultBackgroundImage = require("./assets/images/background-image.png");

export default function App() {
  // Declare a local state to manage selected image uri
  const [selectedImage, setSelectedImage] = useState(null);
  // Async function to select image from phone library
  const pickImageAsync = async () => {
    // Select Image
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    // Check if image is selected
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      console.log(selectedImage);
    } else {
      alert("You did not select any image.");
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer
          DefaultBackgroundImage={DefaultBackgroundImage}
          selectedImage={selectedImage}
        />
      </View>
      <View style={styles.footerContainer}>
        <Button
          theme='primary'
          label='Choose a photo'
          onPress={pickImageAsync}
        />
        <Button label='Use this photo' />
      </View>
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
});
