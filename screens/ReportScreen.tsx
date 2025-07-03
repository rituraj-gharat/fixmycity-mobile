// screens/ReportScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

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

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: true,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!description) {
      Alert.alert('Please describe the issue.');
      return;
    }
    Alert.alert('Submitted!', 'Issue has been reported.');
    console.log({ description, category, image });
    navigation.navigate('Success');
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
