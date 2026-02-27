import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { ref, set } from "firebase/database";
import { db } from "../../firebaseConfig";

const STOPS = [
  "Main Gate",
  "Library",
  "CSE Block",
  "ECE Block",
  "Hostel",
  "Admin Block",
];

export default function StudentDashboard() {
  const studentId = "7904507058";
  const studentName = "Ahalya";

  const [currentLoc, setCurrentLoc] = useState<string | null>(null);
  const [destination, setDestination] = useState<string | null>(null);

  const submitRequest = async () => {
    if (!currentLoc || !destination) {
      Alert.alert("Select both locations");
      return;
    }

    try {
      await set(ref(db, `rideRequests/${studentId}`), {
        name: studentName,
        currentLocation: currentLoc,
        destination: destination,
        time: Date.now(),
      });

      Alert.alert("Ride Requested ✅");
      setCurrentLoc(null);
      setDestination(null);
    } catch (err) {
      Alert.alert("Error submitting request");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>EV Smart Transit</Text>

      <View style={styles.splitContainer}>
        {/* LEFT SIDE - CURRENT LOCATION */}
        <View style={styles.side}>
          <Text style={styles.sideTitle}>Your Current Location</Text>

          {STOPS.map((stop) => (
            <TouchableOpacity
              key={stop}
              style={[
                styles.optionCard,
                currentLoc === stop && styles.selectedCard,
              ]}
              onPress={() => setCurrentLoc(stop)}
            >
              <Text
                style={[
                  styles.optionText,
                  currentLoc === stop && styles.selectedText,
                ]}
              >
                {stop}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* RIGHT SIDE - DESTINATION */}
        <View style={styles.side}>
          <Text style={styles.sideTitle}>Select Destination</Text>

          {STOPS.map((stop) => (
            <TouchableOpacity
              key={stop}
              style={[
                styles.optionCard,
                destination === stop && styles.selectedCardRight,
              ]}
              onPress={() => setDestination(stop)}
            >
              <Text
                style={[
                  styles.optionText,
                  destination === stop && styles.selectedText,
                ]}
              >
                {stop}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.submitBtn} onPress={submitRequest}>
        <Text style={styles.submitText}>Confirm Ride</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#0f172a",
  },
  splitContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 12,
  },
  side: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 14,
    elevation: 4,
  },
  sideTitle: {
    fontWeight: "600",
    fontSize: 15,
    marginBottom: 12,
    textAlign: "center",
    color: "#334155",
  },
  optionCard: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    alignItems: "center",
  },
  selectedCard: {
    backgroundColor: "#2563eb",
    borderColor: "#2563eb",
  },
  selectedCardRight: {
    backgroundColor: "#16a34a",
    borderColor: "#16a34a",
  },
  optionText: {
    color: "#1e293b",
    fontWeight: "500",
  },
  selectedText: {
    color: "#ffffff",
    fontWeight: "700",
  },
  submitBtn: {
    backgroundColor: "#0f172a",
    padding: 16,
    borderRadius: 16,
    marginVertical: 16,
  },
  submitText: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
