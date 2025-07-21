// screens/HomeScreen.tsx
import React, { useEffect, useState, useRef } from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { fetchIssues } from "../utils/api";
import Colors from "../constants/Colors";

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
  const slideAnim = useRef(new Animated.Value(0)).current;
  const buttonTranslateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const load = async () => {
      const data = await fetchIssues();
      setIssues(data);
    };
    load();
  }, []);

  const toggleReports = () => {
    const toValue = showReports ? 0 : 1;
    setShowReports(!showReports);
    
    // Animate the button sliding up
    Animated.parallel([
      Animated.spring(buttonTranslateY, {
        toValue: showReports ? 0 : -85, // Updated to match new spacing
        useNativeDriver: true,
        friction: 8,
        tension: 40,
      }),
      Animated.spring(slideAnim, {
        toValue,
        useNativeDriver: true,
        friction: 8,
        tension: 40,
      })
    ]).start();
  };

  return (
    <View style={styles.container}>
      <View style={[
        styles.buttonContainer,
        { flex: showReports ? 0 : 1 }
      ]}>
        <View style={styles.buttonsStack}>
          <TouchableOpacity 
            style={[styles.button, styles.reportButton]} 
            onPress={() => navigation.navigate("Report")}
          >
            <Text style={styles.buttonText}>Report an Issue</Text>
          </TouchableOpacity>

          <Animated.View style={[
            styles.animatedButtonContainer,
            { transform: [{ translateY: buttonTranslateY }] }
          ]}>
            <TouchableOpacity
              style={[styles.button, showReports ? styles.hideButton : styles.viewButton]}
              onPress={toggleReports}
            >
              <Text style={styles.buttonText}>
                {showReports ? "Hide Reports" : "View Reported Issues"}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>

      <Animated.View style={[
        styles.reportsContainer,
        {
          opacity: slideAnim,
          transform: [{
            translateY: slideAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [50, 0]
            })
          }]
        }
      ]}>
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
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    padding: 20,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsStack: {
    height: 130, // Increased to accommodate both buttons + margin
    position: 'relative',
  },
  animatedButtonContainer: {
    position: 'absolute',
    top: 85, // Increased to add margin (button height + margin)
    left: 0,
    right: 0,
  },
  reportsContainer: {
    flex: 1,
    marginTop: 20,
  },
  card: { 
    marginBottom: 20, 
    padding: 10, 
    borderWidth: 1, 
    borderRadius: 8 
  },
  title: { 
    fontWeight: "bold", 
    fontSize: 16 
  },
  image: { 
    height: 120, 
    width: "100%", 
    marginTop: 10 
  },
  coords: { 
    marginTop: 8, 
    color: "gray", 
    fontSize: 12 
  },
  button: {
    height: 65,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: 250,
    borderWidth: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  reportButton: {
    backgroundColor: Colors.light.tint,
    borderColor: '#1a75b5', // darker shade of the tint color

  },
  viewButton: {
    backgroundColor: '#4CAF50',
    borderColor: '#357a38', // darker shade of green
  },
  hideButton: {
    backgroundColor: '#f44336',
    borderColor: '#ba000d', // darker shade of red
  },
});
