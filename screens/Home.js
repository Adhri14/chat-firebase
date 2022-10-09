import React from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";

export default function Home({ navigation }) {
  return (
    <View style={styles.page}>
      <Text style={styles.text}>Home</Text>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Chat")}
      >
        <Image
          source={require("../assets/floating-message.png")}
          style={styles.icon}
          resizeMode="cover"
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  text: {
    fontSize: 16,
    color: "#262626",
    fontWeight: "600",
  },
  button: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  icon: {
    width: "100%",
    height: "100%",
  },
});
