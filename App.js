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
import Pengembalian from "./screens/Pengembalian";
import { auth } from "./config/firebase";
import drawerStyles from "./style/DrawerStyle";

const adminPages = [
  { key: "home", label: "Dashboard", icon: "📊", component: Home },
  { key: "alat", label: "Data Alat", icon: "📦", component: Alat },
  { key: "peminjaman", label: "Peminjaman", icon: "📥", component: Peminjaman },
  { key: "pengembalian", label: "Pengembalian", icon: "📤", component: Pengembalian },
];

export default function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [activeScreen, setActiveScreen] = useState("home");
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  const activePage =
    adminPages.find((p) => p.key === activeScreen) || adminPages[0];
  const CurrentScreen = activePage.component;

  useEffect(() => {
    return onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setDrawerVisible(false);
      setLogoutError("");
      setAuthLoading(false);
    });
  }, []);

  const handleLogout = async () => {
    setLogoutError("");
    try {
      await signOut(auth);
    } catch {
      setLogoutError("Gagal keluar. Periksa koneksi lalu coba lagi.");
    }
  };

  if (authLoading) {
    return (
      <View style={drawerStyles.loadingContainer}>
        <ActivityIndicator color="#2563EB" size="large" />
      </View>
    );
  }

  if (!user) {
    return (
      <>
        <StatusBar style="dark" />
        <Login
          onLogin={(email, password) =>
            signInWithEmailAndPassword(auth, email, password)
          }
        />
      </>
    );
  }

  return (
    <SafeAreaView style={drawerStyles.app}>
      <StatusBar style="light" />

      {/* Navbar Top Bar */}
      <View style={drawerStyles.appHeader}>
        <Pressable
          onPress={() => setDrawerVisible(true)}
          style={drawerStyles.menuButton}
          accessibilityRole="button"
          accessibilityLabel="Buka menu navigasi"
        >
          <Text style={drawerStyles.menuButtonText}>☰</Text>
        </Pressable>

        <View style={drawerStyles.appHeaderText}>
          <Text style={drawerStyles.appTitle}>{activePage.label}</Text>
        </View>
      </View>

      {logoutError ? (
        <Text style={drawerStyles.logoutError}>{logoutError}</Text>
      ) : null}

      {/* Active Screen */}
      <CurrentScreen
        userName={user.displayName || user.email}
        onNavigate={setActiveScreen}
      />

      {/* Navigation Drawer Modal */}
      <Modal
        visible={drawerVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setDrawerVisible(false)}
      >
        <View style={drawerStyles.drawerOverlay}>
          <View style={drawerStyles.drawerPanel}>
            <SafeAreaView style={drawerStyles.drawerContent}>
              <View style={drawerStyles.drawerHeader}>
                <Text style={drawerStyles.drawerTitle}>Menu Navigasi</Text>
                <Text style={drawerStyles.drawerSubtitle} numberOfLines={1}>
                  {user.displayName || user.email}
                </Text>
              </View>

              {adminPages.map((page) => {
                const isActive = activeScreen === page.key;
                return (
                  <Pressable
                    key={page.key}
                    onPress={() => {
                      setActiveScreen(page.key);
                      setDrawerVisible(false);
                    }}
                    style={[
                      drawerStyles.drawerItem,
                      isActive && drawerStyles.drawerItemActive,
                    ]}
                    accessibilityRole="button"
                  >
                    <Text style={drawerStyles.drawerItemIcon}>{page.icon}</Text>
                    <Text
                      style={[
                        drawerStyles.drawerItemText,
                        isActive && drawerStyles.drawerItemTextActive,
                      ]}
                    >
                      {page.label}
                    </Text>
                  </Pressable>
                );
              })}

              <View style={drawerStyles.logoutContainer}>
                <Pressable
                  onPress={() => {
                    setDrawerVisible(false);
                    handleLogout();
                  }}
                  style={drawerStyles.logoutButton}
                  accessibilityRole="button"
                  accessibilityLabel="Keluar dari akun"
                >
                  <Text style={{ fontSize: 16 }}>🚪</Text>
                  <Text style={drawerStyles.logoutText}>Keluar</Text>
                </Pressable>
              </View>
            </SafeAreaView>
          </View>

          <Pressable
            style={drawerStyles.drawerBackdrop}
            onPress={() => setDrawerVisible(false)}
            accessibilityRole="button"
            accessibilityLabel="Tutup menu navigasi"
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
}
