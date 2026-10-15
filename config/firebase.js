import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { getApp, getApps, initializeApp } from "firebase/app";
import {
  getAuth,
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCH2iauI6GeUSNT7YYDnkVLhY-R3wAp6Kc",
  authDomain: "peminjaman-ec736.firebaseapp.com",
  projectId: "peminjaman-ec736",
  storageBucket: "peminjaman-ec736.firebasestorage.app",
  messagingSenderId: "501782582302",
  appId: "1:501782582302:web:3ea8506a7ca24cb3008a0f",
  measurementId: "G-TNEGBJKCXH",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth =
  Platform.OS === "web"
    ? getAuth(app)
    : (() => {
        try {
          return initializeAuth(app, {
            persistence: getReactNativePersistence(AsyncStorage),
          });
        } catch {
          return getAuth(app);
        }
      })();

export const db = getFirestore(app);
