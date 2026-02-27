import React from "react";
import { View, Text } from "react-native";

export default function StudentMap() {
  return (
    <View style={{ flex: 1 }}>
      <Text style={{ textAlign: "center", marginTop: 20 }}>
        EV Bus Location (Web Version)
      </Text>

      <iframe
        style={{ width: "100%", height: "90%", border: "none" }}
        src="https://www.google.com/maps?q=13.0109,80.2353&output=embed"
      />
    </View>
  );
}
