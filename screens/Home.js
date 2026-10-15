import { useEffect, useState } from "react";
import { Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import styles from "../style/Style";
import { db } from "../config/firebase";

export default function Home({ userName, onOpenAlat, onLogout }) {
  const [availableUnits, setAvailableUnits] = useState(null);
  const [activeLoans, setActiveLoans] = useState(null);
  const [summaryError, setSummaryError] = useState(false);

  useEffect(() => {
    const unsubscribeTools = onSnapshot(
      collection(db, "alat"),
      (snapshot) => {
        const units = snapshot.docs.reduce((total, document) => {
          const data = document.data();
          return total + Math.max(0, Number(data.stok ?? data.stock ?? 0));
        }, 0);
        setAvailableUnits(units);
      },
      () => setSummaryError(true),
    );
    const unsubscribeLoans = onSnapshot(
      collection(db, "peminjaman"),
      (snapshot) => {
        const count = snapshot.docs.filter((document) =>
          ["dipinjam", "disetujui", "approved", "borrowed"].includes(
            String(document.data().status || "").toLowerCase(),
          ),
        ).length;
        setActiveLoans(count);
      },
      () => setSummaryError(true),
    );

    return () => {
      unsubscribeTools();
      unsubscribeLoans();
    };
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.homeContainer}>
        <View style={styles.homeHeader}>
          <View>
            <Text style={styles.eyebrow}>DASHBOARD</Text>
            <Text style={styles.homeTitle}>Halo, {userName || "Pengguna"}</Text>
          </View>
          <Pressable onPress={onLogout} style={styles.textButton}>
            <Text style={styles.textButtonText}>Keluar</Text>
          </Pressable>
        </View>

        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeLabel}>PEMINJAMAN HARI INI</Text>
          <Text style={styles.welcomeTitle}>
            Temukan alat yang kamu butuhkan.
          </Text>
          <Text style={styles.welcomeText}>
            Lihat ketersediaan alat dan ajukan peminjaman dalam beberapa
            langkah.
          </Text>
          <Pressable style={styles.lightButton} onPress={onOpenAlat}>
            <Text style={styles.lightButtonText}>Lihat daftar alat</Text>
          </Pressable>
        </View>

        <Text style={styles.sectionTitle}>Ringkasan</Text>
        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>
              {availableUnits === null ? "--" : availableUnits}
            </Text>
            <Text style={styles.summaryLabel}>Unit tersedia</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>
              {activeLoans === null ? "--" : activeLoans}
            </Text>
            <Text style={styles.summaryLabel}>Sedang dipinjam</Text>
          </View>
        </View>
        {summaryError ? (
          <Text style={styles.summaryError}>
            Ringkasan gagal dimuat. Periksa koneksi dan aturan Firestore.
          </Text>
        ) : null}

        <Text style={styles.sectionTitle}>Cara menggunakan</Text>
        <View style={styles.stepRow}>
          <Text style={styles.stepNumber}>01</Text>
          <Text style={styles.stepText}>Pilih alat yang tersedia.</Text>
        </View>
        <View style={styles.stepRow}>
          <Text style={styles.stepNumber}>02</Text>
          <Text style={styles.stepText}>Isi detail peminjaman.</Text>
        </View>
        <View style={styles.stepRow}>
          <Text style={styles.stepNumber}>03</Text>
          <Text style={styles.stepText}>Tunggu persetujuan petugas.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
