import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { ref, set } from "firebase/database";
import { db } from "../firebaseConfig";

type Role = "student" | "driver";

export default function Register() {
  const [role, setRole] = useState<Role | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validatePassword = (pwd: string) => {
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    return regex.test(pwd);
  };

  const handleRegister = async () => {
    if (!role || !name || !email || !password || !confirmPassword) {
      alert("All fields are required");
      return;
    }

    if (!validatePassword(password)) {
      alert("Password must be 8 chars, 1 capital, 1 special character");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const userId = Date.now().toString();

    await set(ref(db, "users/" + userId), {
      name,
      email,
      role,
      password,
      createdAt: Date.now(),
    });

    alert("Registered successfully!");
    router.replace("/");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.brand}>EV Smart Transit</Text>

        <View style={styles.roleContainer}>
          {["student", "driver"].map((r) => (
            <TouchableOpacity
              key={r}
              style={[
                styles.roleCard,
                role === r && styles.selectedRole,
              ]}
              onPress={() => setRole(r as Role)}
            >
              <Text style={styles.roleText}>
                {r.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TextInput
          placeholder="Full Name"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        <TextInput
          placeholder="Confirm Password"
          secureTextEntry
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e2e8f0",
  },
  card: {
    width: width > 500 ? 420 : "92%",
    backgroundColor: "#ffffff",
    padding: 28,
    borderRadius: 24,
  },
  roleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  roleCard: {
    flex: 1,
    marginHorizontal: 4,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    alignItems: "center",
  },
  selectedRole: {
    backgroundColor: "#2563eb",
  },
  roleText: {
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
  },
  button: {
    backgroundColor: "#0f172a",
    padding: 16,
    borderRadius: 14,
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "600",
  },
});