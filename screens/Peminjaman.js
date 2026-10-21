import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  View,
} from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";
import styles from "../style/PeminjamanStyle";

const activeStatuses = ["dipinjam", "disetujui", "approved", "borrowed"];

const readValue = (data, keys) => {
  for (const key of keys) {
    const value = data[key];
    if (value !== undefined && value !== null && value !== "") return value;
  }
  return "";
};

const displayValue = (value) => {
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }
  if (value && typeof value === "object") {
    return String(value.nama || value.name || value.displayName || value.id || "");
  }
  return "";
};

const formatDate = (value) => {
  if (!value) return "";
  const date = typeof value.toDate === "function" ? value.toDate() : new Date(value);
  if (Number.isNaN(date.getTime())) return displayValue(value);
  return date.toLocaleDateString("id-ID");
};

const getLoanDetails = (data) => ({
  borrower:
    displayValue(
      readValue(data, [
        "namaPeminjam",
        "peminjamNama",
        "borrowerName",
        "borrower",
        "peminjam",
        "nama",
        "name",
      ]),
    ) || "Nama peminjam tidak tersedia",
  identity: displayValue(
    readValue(data, ["identitas", "nim", "nip", "nomorIdentitas"]),
  ),
  tool:
    displayValue(
      readValue(data, [
        "namaAlat",
        "alatNama",
        "itemName",
        "alat",
        "namaBarang",
        "barang",
        "tool",
      ]),
    ) || "Nama alat tidak tersedia",
  quantity: displayValue(readValue(data, ["jumlah", "quantity", "qty"]) || 1),
  loanDate: formatDate(
    readValue(data, [
      "tanggalPinjam",
      "tanggalPeminjaman",
      "tglPinjam",
      "loanDate",
      "createdAt",
      "tanggal",
    ]),
  ),
});

export default function Peminjaman() {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(
    () =>
      onSnapshot(
        collection(db, "peminjaman"),
        (snapshot) => {
          setLoans(
            snapshot.docs
              .map((document) => ({
                id: document.id,
                data: document.data(),
              }))
              .filter(({ data }) =>
                activeStatuses.includes(
                  String(data.status || "").trim().toLowerCase(),
                ),
              ),
          );
          setLoading(false);
          setError("");
        },
        () => {
          setError(
            "Data peminjaman gagal dimuat. Periksa koneksi dan akses Firestore.",
          );
          setLoading(false);
        },
      ),
    [],
  );

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.pageHeader}>
        <Text style={styles.title}>Peminjam Aktif</Text>
        <Text style={styles.subtitle}>
          {loading ? "Memuat data..." : `${loans.length} data`}
        </Text>
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}
      {loading ? (
        <View style={styles.messageBox}>
          <ActivityIndicator color="#176B5B" />
          <Text style={styles.messageText}>Memuat data peminjaman...</Text>
        </View>
      ) : error ? null : loans.length === 0 ? (
        <View style={styles.messageBox}>
          <Text style={styles.messageText}>Belum ada peminjaman aktif.</Text>
        </View>
      ) : (
        <View style={styles.list}>
          {loans.map(({ id, data }, index) => {
            const details = getLoanDetails(data);
            return (
              <View
                key={id}
                style={[
                  styles.loanRow,
                  index === loans.length - 1 && styles.loanRowLast,
                ]}
              >
                <View style={styles.rowHeading}>
                  <Text style={styles.borrower} numberOfLines={2}>
                    {details.borrower}
                  </Text>
                  <Text style={styles.status}>Aktif</Text>
                </View>
                {details.identity ? (
                  <Text style={styles.detail}>Identitas: {details.identity}</Text>
                ) : null}
                <Text style={styles.detail}>Alat: {details.tool}</Text>
                <Text style={styles.detail}>Jumlah: {details.quantity}</Text>
                {details.loanDate ? (
                  <Text style={styles.detail}>
                    Tanggal pinjam: {details.loanDate}
                  </Text>
                ) : null}
              </View>
            );
          })}
        </View>
      )}
    </ScrollView>
  );
}
