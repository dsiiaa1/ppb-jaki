import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import Login from "./screens/login";
import Home from "./screens/Home";
import Alat from "./screens/Alat";
import Peminjaman from "./screens/Peminjaman";
import { auth } from "./config/firebase";
import drawerStyles from "./style/DrawerStyle";

const adminPages = [
  { key: "home", label: "Dashboard" },
  { key: "alat", label: "Inventaris" },
  { key: "aktif", label: "Peminjam Aktif" },
  { key: "riwayat", label: "Riwayat Pengembalian" },
];

export default function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [activeScreen, setActiveScreen] = useState("home");
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [logoutError, setLogoutError] = useState("");
  const activePage =
    adminPages.find((page) => page.key === activeScreen) || adminPages[0];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setDrawerVisible(false);
      setLogoutError("");
      setAuthLoading(false);
    });

    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    setLogoutError("");
    try {
      await signOut(auth);
    } catch {
      setLogoutError("Gagal keluar. Periksa koneksi lalu coba lagi.");
    }
  };

  let content;
  if (authLoading) {
    content = (
      <View style={drawerStyles.loadingContainer}>
        <ActivityIndicator color="#087E75" />
      </View>
    );
  } else if (!user) {
    content = (
      <Login
        onLogin={(email, password) =>
          signInWithEmailAndPassword(auth, email, password)
        }
      />
    );
  } else {
    content = (
      <SafeAreaView style={drawerStyles.app}>
        <View style={drawerStyles.appHeader}>
          <Pressable
            onPress={() => setDrawerVisible(true)}
            style={drawerStyles.menuButton}
            accessibilityRole="button"
            accessibilityLabel="Buka navigasi"
          >
            <Text style={drawerStyles.menuButtonText}>☰</Text>
          </Pressable>
          <View style={drawerStyles.appHeaderText}>
            <Text style={drawerStyles.appTitle}>
              {activePage.label}
            </Text>
            <Text style={drawerStyles.appSubtitle} numberOfLines={1}>
              {user.displayName || user.email}
            </Text>
          </View>
        </View>

        {logoutError ? (
          <Text style={drawerStyles.logoutError}>{logoutError}</Text>
        ) : null}
        {activeScreen === "home" ? (
          <Home userName={user.displayName || user.email} />
        ) : activeScreen === "alat" ? (
          <Alat />
        ) : activeScreen === "aktif" ? (
          <Peminjaman />
        ) : null}

        <Modal
          visible={drawerVisible}
          transparent
          animationType="none"
          onRequestClose={() => setDrawerVisible(false)}
        >
          <View style={drawerStyles.drawerOverlay}>
            <View style={drawerStyles.drawerPanel}>
              <SafeAreaView style={drawerStyles.drawerContent}>
                <View style={drawerStyles.drawerHeader}>
                  <Text style={drawerStyles.drawerTitle}>Menu Admin</Text>
                  <Text style={drawerStyles.drawerSubtitle}>
                    {user.displayName || user.email}
                  </Text>
                </View>
                {adminPages.map((page) => (
                  <Pressable
                    key={page.key}
                    onPress={() => {
                      setActiveScreen(page.key);
                      setDrawerVisible(false);
                    }}
                    style={[
                      drawerStyles.drawerItem,
                      activeScreen === page.key &&
                        drawerStyles.drawerItemActive,
                    ]}
                    accessibilityRole="button"
                  >
                    <Text
                      style={[
                        drawerStyles.drawerItemText,
                        activeScreen === page.key &&
                          drawerStyles.drawerItemTextActive,
                      ]}
                    >
                      {page.label}
                    </Text>
                  </Pressable>
                ))}
                <View style={drawerStyles.logoutContainer}>
                  <Pressable
                    onPress={() => {
                      setDrawerVisible(false);
                      handleLogout();
                    }}
                    style={drawerStyles.drawerItem}
                    accessibilityRole="button"
                  >
                    <Text style={drawerStyles.logoutText}>Keluar</Text>
                  </Pressable>
                </View>
              </SafeAreaView>
            </View>
            <Pressable
              style={drawerStyles.drawerBackdrop}
              onPress={() => setDrawerVisible(false)}
              accessibilityRole="button"
              accessibilityLabel="Tutup menu"
            />
          </View>
        </Modal>
      </SafeAreaView>
    );
  }

  return (
    <>
      <StatusBar style="dark" />
      {content}
    </>
  );
}
