import React, { useEffect, useState } from 'react';
import AppNavigator from './navigation/AppNavigator';
import { auth } from './utils/firebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: User | null) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  return <AppNavigator user={user} />;
}
