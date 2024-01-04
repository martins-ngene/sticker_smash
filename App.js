import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

import ImageViewer from "./components/ImageViewer";
import Button from "./components/Button";
import CircleButton from "./components/CircleButton";
import IconButton from "./components/IconButton";
import EmojiPicker from "./components/EmojiPicker";
import EmojiList from "./components/EmojiList";
import EmojiSticker from "./components/EmojiSticker";

// Assets Import
const DefaultBackgroundImage = require("./assets/images/background-image.png");

export default function App() {
  // Declare a local state to manage selected image uri
  const [selectedImage, setSelectedImage] = useState(null);

  // Manage App Options Buttons Visibiity
  const [showAppOptions, setShowAppOptions] = useState(false);

  // Manage EmojiPicker Visibility
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Save picked emoji
  const [pickedEmoji, setPickedEmoji] = useState(null);

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
      setShowAppOptions(true);
      // console.log(selectedImage);
    } else {
      alert("You did not select any image.");
    }
  };

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onSaveImageAsync = async () => {
    // we will implement this later
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer
          DefaultBackgroundImage={DefaultBackgroundImage}
          selectedImage={selectedImage}
        />
        {pickedEmoji !== null ? (
          <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
        ) : null}
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon='refresh' label='Reset' onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton
              icon='save-alt'
              label='Save'
              onPress={onSaveImageAsync}
            />
          </View>
        </View>
      ) : (
        <>
          <View style={styles.footerContainer}>
            <Button
              theme='primary'
              label='Choose a photo'
              onPress={pickImageAsync}
            />
            <Button
              label='Use this photo'
              onPress={() => setShowAppOptions(true)}
            />
          </View>
        </>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
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
  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});
