import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import Login from "./screens/login";
import Alat from "./screens/Alat";
import { auth } from "./config/firebase";

export default function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(
    () =>
      onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setAuthLoading(false);
      }),
    [],
  );

  const renderScreen = () => {
    if (authLoading) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator />
        </View>
      );
    }

    if (!user) {
      return (
        <Login
          onLogin={(email, password) =>
            signInWithEmailAndPassword(auth, email, password)
          }
        />
      );
    }

    return <Alat user={user} onLogout={() => signOut(auth)} />;
  };

  return (
    <>
      <StatusBar style="light" />
      {renderScreen()}
    </>
  );
}
