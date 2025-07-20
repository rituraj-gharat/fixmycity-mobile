import * as Google from "expo-auth-session/providers/google";
export function useGoogleAuth() {
    const [request, response, promptAsync] = Google.useAuthRequest({
      clientId: '638650184269-v1ch0i8njr11tjqu669eqj0se8605nqf.apps.googleusercontent.com',
      webClientId: '638650184269-v1ch0i8njr11tjqu669eqj0se8605nqf.apps.googleusercontent.com',
    });
  
    return { request, response, promptAsync };
  }
