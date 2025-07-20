// screens/HomeScreen.tsx
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet, Button } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { fetchIssues } from "../utils/api";

type RootStackParamList = {
  Home: undefined;
  Report: undefined;
  Success: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

type Issue = {
  id: number;
  category: string;
  description: string;
  latitude: number;
  longitude: number;
  photoUrl: string;
};

export default function HomeScreen({ navigation }: Props) {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [showReports, setShowReports] = useState(false);

  useEffect(() => {
    const load = async () => {
      const data = await fetchIssues();
      setIssues(data);
    };
    load();
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Report an Issue" onPress={() => navigation.navigate("Report")} />

      <View style={{ marginVertical: 15 }}>
        <Button
          title={showReports ? "Hide Reports" : "View Reported Issues"}
          onPress={() => setShowReports(!showReports)}
        />
      </View>

      {showReports && (
        <FlatList
          data={issues}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.title}>{item.category}</Text>
              <Text>{item.description}</Text>
              {item.photoUrl && (
                <Image source={{ uri: item.photoUrl }} style={styles.image} />
              )}
              <Text style={styles.coords}>
                Lat: {item.latitude} | Lng: {item.longitude}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  card: { marginBottom: 20, padding: 10, borderWidth: 1, borderRadius: 8 },
  title: { fontWeight: "bold", fontSize: 16 },
  image: { height: 120, width: "100%", marginTop: 10 },
  coords: { marginTop: 8, color: "gray", fontSize: 12 },
});
