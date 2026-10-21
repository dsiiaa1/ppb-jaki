import { useEffect, useState } from "react";
import { Text, View, useWindowDimensions } from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import styles from "../style/Style";
import { db } from "../config/firebase";

export default function Home({ userName }) {
  const { width } = useWindowDimensions();
  const compact = width < 600;
  const [toolCount, setToolCount] = useState(null);
  const [availableStock, setAvailableStock] = useState(null);
  const [borrowedUnits, setBorrowedUnits] = useState(null);
  const [summaryError, setSummaryError] = useState(false);

  useEffect(() => {
    const unsubscribeTools = onSnapshot(
      collection(db, "alat"),
      (snapshot) => {
        const units = snapshot.docs.reduce((total, document) => {
          const data = document.data();
          const stock = Number(data.stok ?? data.stock ?? 0);
          return total + (Number.isFinite(stock) ? Math.max(0, stock) : 0);
        }, 0);
        setToolCount(snapshot.size);
        setAvailableStock(units);
      },
      () => setSummaryError(true),
    );
    const unsubscribeLoans = onSnapshot(
      collection(db, "peminjaman"),
      (snapshot) => {
        const units = snapshot.docs.reduce((total, document) => {
          const data = document.data();
          const status = String(data.status || "").trim().toLowerCase();
          if (
            !["dipinjam", "disetujui", "approved", "borrowed"].includes(status)
          ) {
            return total;
          }

          const quantity = Number(
            data.jumlah ?? data.quantity ?? data.qty ?? 1,
          );
          return total + (Number.isFinite(quantity) ? Math.max(0, quantity) : 1);
        }, 0);
        setBorrowedUnits(units);
      },
      () => setSummaryError(true),
    );

    return () => {
      unsubscribeTools();
      unsubscribeLoans();
    };
  }, []);

  const totalUnits =
    availableStock === null || borrowedUnits === null
      ? null
      : availableStock + borrowedUnits;

  return (
    <View style={styles.safeArea}>
      <View style={styles.homeContainer}>
        <Text style={styles.eyebrow}>DASHBOARD</Text>
        <Text style={styles.homeTitle}>Selamat datang, Super Admin</Text>
        <Text style={styles.homeSubtitle}>
          {userName || "Kelola inventaris dan peminjaman."}
        </Text>

        <Text style={styles.sectionTitle}>Ringkasan</Text>
        <View style={[styles.summaryRow, compact && styles.summaryRowCompact]}>
          <View style={[styles.summaryItem, compact && styles.summaryItemCompact]}>
            <Text style={styles.summaryValue}>
              {toolCount === null ? "--" : toolCount}
            </Text>
            <Text style={styles.summaryLabel}>Jenis alat</Text>
          </View>
          <View style={[styles.summaryItem, compact && styles.summaryItemCompact]}>
            <Text style={styles.summaryValue}>
              {totalUnits === null ? "--" : totalUnits}
            </Text>
            <Text style={styles.summaryLabel}>Total alat</Text>
          </View>
          <View style={[styles.summaryItem, compact && styles.summaryItemCompact]}>
            <Text style={styles.summaryValue}>
              {availableStock === null ? "--" : availableStock}
            </Text>
            <Text style={styles.summaryLabel}>Tersedia</Text>
          </View>
          <View style={[styles.summaryItem, compact && styles.summaryItemCompact]}>
            <Text style={styles.summaryValue}>
              {borrowedUnits === null ? "--" : borrowedUnits}
            </Text>
            <Text style={styles.summaryLabel}>Dipinjam</Text>
          </View>
        </View>
        {summaryError ? (
          <Text style={styles.summaryError}>
            Ringkasan gagal dimuat. Periksa koneksi dan akses Firestore.
          </Text>
        ) : null}

      </View>
    </View>
  );
}
