import { View, Text, StyleSheet } from "react-native";

export default function EVTracker() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>EV Tracker Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
  },
});
