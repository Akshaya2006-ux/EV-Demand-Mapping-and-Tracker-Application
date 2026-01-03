import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="EVMap" options={{ title: "Map" }} />
      <Tabs.Screen name="EVTracker" options={{ title: "Tracker" }} />
      <Tabs.Screen name="Reports" options={{ title: "Reports" }} />
    </Tabs>
  );
}
