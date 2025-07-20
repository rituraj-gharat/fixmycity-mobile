// screens/LoginScreen.tsx
import React, { useEffect } from "react";
import { View, Button, StyleSheet, Text, Alert } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { useGoogleAuth } from "../utils/useGoogleAuth";
import { auth } from "../utils/firebaseConfig";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ navigation }: any) {
  const { request, response, promptAsync } = useGoogleAuth();

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      if (authentication?.accessToken) {
        const credential = GoogleAuthProvider.credential(null, authentication.accessToken);
        signInWithCredential(auth, credential)
          .then(() => {
            Alert.alert("Login Successful");
            navigation.replace("Home");
          })
          .catch((err) => {
            console.error("Firebase login error:", err);
            Alert.alert("Login failed", err.message);
          });
      }
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to FixMyCity</Text>
      <Button
        title="Sign in with Google"
        disabled={!request}
        onPress={() => promptAsync()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
});
