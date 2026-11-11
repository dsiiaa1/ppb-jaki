import { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import styles from "../style/Style";
import { db } from "../config/firebase";

export default function Home({ onNavigate }) {
  const { width } = useWindowDimensions();
  const compact = width < 640;

  const [totalAlat, setTotalAlat] = useState(0);
  const [dipinjam, setDipinjam] = useState(0);
  const [pengembalian, setPengembalian] = useState(0);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // 1. Subscribe to alat
    const unsubscribeAlat = onSnapshot(
      collection(db, "alat"),
      (snapshot) => {
        setTotalAlat(snapshot.size);
      },
      () => {},
    );

    // 2. Subscribe to peminjaman
    const unsubscribePeminjaman = onSnapshot(
      collection(db, "peminjaman"),
      (snapshot) => {
        let activeLoansCount = 0;
        let returnedLoansCount = 0;

        snapshot.forEach((doc) => {
          const data = doc.data();
          const status = String(data.status || "").trim().toLowerCase();
          if (["dipinjam", "disetujui", "borrowed", "aktif"].includes(status)) {
            activeLoansCount += 1;
          } else if (
            ["kembali", "dikembalikan", "returned", "selesai"].includes(status)
          ) {
            returnedLoansCount += 1;
          }
        });

        setDipinjam(activeLoansCount);
        setPengembalian(returnedLoansCount);
      },
      () => {},
    );

    // 3. Subscribe to aktivitas
    const qAktivitas = query(
      collection(db, "aktivitas"),
      orderBy("waktu", "desc"),
      limit(5),
    );
    const unsubscribeAktivitas = onSnapshot(
      qAktivitas,
      (snapshot) => {
        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setActivities(list);
      },
      () => {
        // Fallback gracefully
      },
    );

    return () => {
      unsubscribeAlat();
      unsubscribePeminjaman();
      unsubscribeAktivitas();
    };
  }, []);

  const tersedia = Math.max(0, totalAlat - dipinjam);

  const handleNavigate = (key) => {
    if (typeof onNavigate === "function") {
      onNavigate(key);
    }
  };

  return (
    <View style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.homeContainer}>
          {/* Hero Banner (Image 1) */}
          <View style={styles.heroBanner}>
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeText}>✨ RINGKASAN SISTEM</Text>
            </View>
            <Text style={styles.heroTitle}>Selamat Datang 👋</Text>
            <Text style={styles.heroSubtitle}>
              Sistem Informasi & Manajemen Peminjaman Alat
            </Text>
            <View style={styles.heroStatusRow}>
              <Text style={styles.heroStatusDot}>●</Text>
              <Text style={styles.heroStatusText}>
                Status Operasional:{" "}
                <Text style={styles.heroStatusHighlight}>Normal & Siap</Text>
              </Text>
            </View>
          </View>

          {/* Quick Actions Navigation Row */}
          <View
            style={[
              styles.quickActionsRow,
              compact && styles.quickActionsRowCompact,
            ]}
          >
            <Pressable
              onPress={() => handleNavigate("peminjaman")}
              style={[styles.quickActionBtn, styles.quickActionPinjam]}
              accessibilityRole="button"
              accessibilityLabel="Pinjam Alat"
            >
              <Text style={{ fontSize: 14 }}>📥</Text>
              <Text style={styles.quickActionPinjamText}>Pinjam Alat</Text>
            </Pressable>

            <Pressable
              onPress={() => handleNavigate("pengembalian")}
              style={[styles.quickActionBtn, styles.quickActionKembalikan]}
              accessibilityRole="button"
              accessibilityLabel="Kembalikan"
            >
              <Text style={{ fontSize: 14 }}>📤</Text>
              <Text style={styles.quickActionKembalikanText}>Kembalikan</Text>
            </Pressable>

            <Pressable
              onPress={() => handleNavigate("alat")}
              style={[styles.quickActionBtn, styles.quickActionDataAlat]}
              accessibilityRole="button"
              accessibilityLabel="Data Alat"
            >
              <Text style={{ fontSize: 14 }}>📦</Text>
              <Text style={styles.quickActionDataAlatText}>Data Alat</Text>
            </Pressable>
          </View>

          {/* 4 Metric Cards Grid */}
          <View style={styles.statsGrid}>
            {/* Total Alat */}
            <View style={[styles.statCard, styles.statCardBlue]}>
              <View style={styles.statHeaderRow}>
                <Text style={styles.statIcon}>📦</Text>
                <Text style={[styles.statLabel, styles.statLabelBlue]}>
                  TOTAL ALAT
                </Text>
              </View>
              <Text style={[styles.statValue, styles.statValueBlue]}>
                {totalAlat}
              </Text>
              <Text style={styles.statSubtitle}>Unit terdaftar</Text>
            </View>

            {/* Dipinjam */}
            <View style={[styles.statCard, styles.statCardAmber]}>
              <View style={styles.statHeaderRow}>
                <Text style={styles.statIcon}>⏳</Text>
                <Text style={[styles.statLabel, styles.statLabelAmber]}>
                  DIPINJAM
                </Text>
              </View>
              <Text style={[styles.statValue, styles.statValueAmber]}>
                {dipinjam}
              </Text>
              <Text style={styles.statSubtitle}>Dalam pemakaian</Text>
            </View>

            {/* Tersedia */}
            <View style={[styles.statCard, styles.statCardGreen]}>
              <View style={styles.statHeaderRow}>
                <Text style={styles.statIcon}>✅</Text>
                <Text style={[styles.statLabel, styles.statLabelGreen]}>
                  TERSEDIA
                </Text>
              </View>
              <Text style={[styles.statValue, styles.statValueGreen]}>
                {tersedia}
              </Text>
              <Text style={styles.statSubtitle}>Siap di pinjam</Text>
            </View>

            {/* Pengembalian */}
            <View style={[styles.statCard, styles.statCardPurple]}>
              <View style={styles.statHeaderRow}>
                <Text style={styles.statIcon}>🗃️</Text>
                <Text style={[styles.statLabel, styles.statLabelPurple]}>
                  PENGEMBALIAN
                </Text>
              </View>
              <Text style={[styles.statValue, styles.statValuePurple]}>
                {pengembalian}
              </Text>
              <Text style={styles.statSubtitle}>Telah dikembalikan</Text>
            </View>
          </View>

          {/* Aktivitas Terbaru Card */}
          <View style={styles.activityCard}>
            <View style={styles.activityHeader}>
              <Text style={styles.activityTitle}>Aktivitas Terbaru</Text>
              <View style={styles.realtimeBadge}>
                <Text style={styles.realtimeDot}>●</Text>
                <Text style={styles.realtimeText}>Realtime</Text>
              </View>
            </View>

            {activities.length === 0 ? (
              <View style={styles.emptyActivityBox}>
                <View style={styles.emptyActivityIconWrap}>
                  <Text style={styles.emptyActivityIcon}>📋</Text>
                </View>
                <Text style={styles.emptyActivityTitle}>
                  Belum Ada Aktivitas
                </Text>
                <Text style={styles.emptyActivityDesc}>
                  Riwayat transaksi peminjaman dan pengembalian alat akan
                  tercatat di sini secara otomatis.
                </Text>
              </View>
            ) : (
              <View style={styles.activityList}>
                {activities.map((item) => (
                  <View key={item.id} style={styles.activityItem}>
                    <Text style={styles.activityItemText}>
                      {item.pesan || "Aktivitas peminjaman"}
                    </Text>
                    <Text style={styles.activityItemTime}>
                      {item.waktu?.toDate
                        ? item.waktu.toDate().toLocaleTimeString("id-ID", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "Baru saja"}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
