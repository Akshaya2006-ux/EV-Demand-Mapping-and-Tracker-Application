import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Home Screen!</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
