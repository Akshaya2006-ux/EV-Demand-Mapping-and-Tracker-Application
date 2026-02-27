import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { ref, onValue } from "firebase/database";
import { db } from "../../firebaseConfig";

interface RideRequest {
  currentLocation: string;
  destination: string;
}

export default function DriverDashboard() {
  const [topPickup, setTopPickup] = useState<string | null>(null);
  const [requestCount, setRequestCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const rideRef = ref(db, "rideRequests");

    const unsubscribe = onValue(rideRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const pickupCounter: Record<string, number> = {};

        Object.values(data).forEach((ride: any) => {
          const pickup = ride.currentLocation;
          pickupCounter[pickup] = (pickupCounter[pickup] || 0) + 1;
        });

        let maxStop = null;
        let maxCount = 0;

        for (const stop in pickupCounter) {
          if (pickupCounter[stop] > maxCount) {
            maxStop = stop;
            maxCount = pickupCounter[stop];
          }
        }

        setTopPickup(maxStop);
        setRequestCount(maxCount);
      } else {
        setTopPickup(null);
        setRequestCount(0);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>EV Driver Control Panel</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#2563eb" />
      ) : topPickup ? (
        <View style={styles.card}>
          <Text style={styles.label}>Highest Demand Stop</Text>
          <Text style={styles.location}>{topPickup}</Text>
          <Text style={styles.count}>
            {requestCount} students waiting
          </Text>
        </View>
      ) : (
        <Text style={styles.noData}>No active ride requests</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f8fafc",
    padding: 24,
    justifyContent: "center",
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#0f172a",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 30,
    borderRadius: 20,
    alignItems: "center",
    elevation: 6,
  },
  label: {
    fontSize: 16,
    color: "#64748b",
    marginBottom: 10,
  },
  location: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2563eb",
    marginBottom: 8,
  },
  count: {
    fontSize: 18,
    color: "#16a34a",
    fontWeight: "600",
  },
  noData: {
    textAlign: "center",
    fontSize: 16,
    color: "#64748b",
  },
});