// screens/ReportScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { submitIssueReport } from '../utils/api'; // <-- Make sure this path is correct

type RootStackParamList = {
  Home: undefined;
  Report: undefined;
  Success: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Report'>;

export default function ReportScreen({ navigation }: Props) {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Pothole');
  const [image, setImage] = useState<string | null>(null);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  // 👇 Request location permission and get location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location access is required to report issues.');
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // updated from deprecated string
      quality: 0.7,
      allowsEditing: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!description || !location) {
      Alert.alert('Please fill all fields and enable location.');
      return;
    }

    const success = await submitIssueReport({
      description,
      category,
      image,
      location,
    });

    if (success) {
    Alert.alert('Submitted!', 'Issue has been reported.');
    Alert.alert('Submitted!', 'Issue has been reported.');
    console.log({ description, category, image });
      Alert.alert('Submitted!', 'Issue has been reported.');
    console.log({ description, category, image });
      navigation.navigate('Success');
    } else {
      Alert.alert('Failed', 'There was a problem submitting your issue.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        multiline
        value={description}
        onChangeText={setDescription}
        placeholder="Describe the issue..."
      />

      <Text style={styles.label}>Category (e.g. Pothole, Streetlight)</Text>
      <TextInput
        style={styles.input}
        value={category}
        onChangeText={setCategory}
        placeholder="e.g. Water Leakage"
      />

      <Button title="Pick an Image" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.preview} />}

      <View style={{ marginTop: 20 }}>
        <Button title="Submit Report" onPress={handleSubmit} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontSize: 16, marginVertical: 10 },
  input: { borderWidth: 1, padding: 10, borderRadius: 5 },
  preview: { width: '100%', height: 200, marginTop: 10 },
});
