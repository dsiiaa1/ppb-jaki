import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import {
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import styles from "../style/PengembalianStyle";
import { db } from "../config/firebase";
import { getDateString, logActivity } from "../utils/helpers";

export default function Pengembalian() {
  const { width } = useWindowDimensions();
  const compact = width < 640;

  const [activeTab, setActiveTab] = useState("borrowed");
  const [search, setSearch] = useState("");
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  const today = getDateString(0);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "peminjaman"),
      (snapshot) => {
        setLoans(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoading(false);
      },
      () => {
        setError("Gagal memuat data peminjaman.");
        setLoading(false);
      },
    );
    return unsub;
  }, []);

  const activeLoans = loans.filter((loan) => {
    const s = String(loan.status || "").trim().toLowerCase();
    return ["dipinjam", "disetujui", "borrowed", "aktif"].includes(s);
  });

  const returnedLoans = loans.filter((loan) => {
    const s = String(loan.status || "").trim().toLowerCase();
    return ["kembali", "dikembalikan", "returned", "selesai"].includes(s);
  });

  const overdueLoans = activeLoans.filter(
    (loan) => loan.rencanaKembali && loan.rencanaKembali < today,
  );

  const filterList = (list) => {
    const q = search.trim().toLowerCase();
    if (!q) return list;
    return list.filter((item) => {
      const borrower = String(item.namaPeminjam || item.peminjam || "").toLowerCase();
      const tool = String(item.namaAlat || "").toLowerCase();
      const code = String(item.kodeAlat || "").toLowerCase();
      return borrower.includes(q) || tool.includes(q) || code.includes(q);
    });
  };

  const filteredActive = filterList(activeLoans);
  const filteredReturned = filterList(returnedLoans);

  const handleReturn = async (loan) => {
    setProcessingId(loan.id);
    setError("");
    setNotice("");

    try {
      await updateDoc(doc(db, "peminjaman", loan.id), {
        status: "kembali",
        tanggalKembali: today,
        diperbaruiPada: serverTimestamp(),
      });

      await logActivity(
        db,
        `${loan.namaPeminjam || "Peminjam"} mengembalikan ${loan.namaAlat || "Alat"}`,
        "kembali",
      );

      setNotice(
        `Alat "${loan.namaAlat}" berhasil dikembalikan oleh "${loan.namaPeminjam || "Peminjam"}".`,
      );
    } catch {
      setError("Gagal memproses pengembalian.");
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <View style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.container, compact && styles.containerMobile]}>
          {/* Header */}
          <View style={styles.badgePill}>
            <Text style={styles.badgeText}>MANAJEMEN PENGEMBALIAN</Text>
          </View>
          <Text style={styles.pageTitle}>Pengembalian Alat</Text>
          <Text style={styles.pageSubtitle}>
            Proses pengembalian alat dan cek kondisi kelayakan inventaris
          </Text>

          {notice ? (
            <View style={styles.notice}>
              <Text style={styles.noticeText}>{notice}</Text>
            </View>
          ) : null}

          {error ? (
            <View style={styles.error}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          {/* 3 Stat Cards */}
          <View style={[styles.statsRow, compact && styles.statsRowCompact]}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{activeLoans.length}</Text>
              <Text style={styles.statLabel}>PERLU DIKEMBALIKAN</Text>
            </View>

            <View style={styles.statCard}>
              <Text
                style={[
                  styles.statValue,
                  overdueLoans.length > 0 && styles.statValueDanger,
                ]}
              >
                {overdueLoans.length}
              </Text>
              <Text style={styles.statLabel}>LEWAT BATAS WAKTU</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={[styles.statValue, styles.statValueGreen]}>
                {returnedLoans.length}
              </Text>
              <Text style={styles.statLabel}>SUDAH KEMBALI</Text>
            </View>
          </View>

          {/* Tab Switcher */}
          <View style={styles.tabsRow}>
            <Pressable
              onPress={() => setActiveTab("borrowed")}
              style={[
                styles.tabButton,
                activeTab === "borrowed" && styles.tabButtonActive,
              ]}
              accessibilityRole="button"
              accessibilityLabel="Sedang Dipinjam"
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "borrowed" && styles.tabTextActive,
                ]}
              >
                Sedang Dipinjam ({activeLoans.length})
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setActiveTab("history")}
              style={[
                styles.tabButton,
                activeTab === "history" && styles.tabButtonActive,
              ]}
              accessibilityRole="button"
              accessibilityLabel="Riwayat Selesai"
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "history" && styles.tabTextActive,
                ]}
              >
                Riwayat Selesai ({returnedLoans.length})
              </Text>
            </Pressable>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Cari nama peminjam, kode, atau nama alat..."
              placeholderTextColor="#94A3B8"
              style={styles.searchInput}
            />
          </View>

          {/* Content */}
          {loading ? (
            <View style={styles.emptyBox}>
              <ActivityIndicator color="#059669" />
              <Text style={[styles.emptySubtitle, { marginTop: 8 }]}>
                Memuat data...
              </Text>
            </View>
          ) : activeTab === "borrowed" ? (
            filteredActive.length === 0 ? (
              <View style={styles.emptyBox}>
                <Text style={styles.emptyIcon}>📦</Text>
                <Text style={styles.emptyTitle}>
                  Tidak Ada Alat Yang Sedang Dipinjam
                </Text>
                <Text style={styles.emptySubtitle}>
                  Semua alat saat ini berada di gudang inventaris dan siap
                  digunakan.
                </Text>
              </View>
            ) : (
              filteredActive.map((loan) => {
                const isOverdue =
                  loan.rencanaKembali && loan.rencanaKembali < today;

                return (
                  <View key={loan.id} style={styles.loanCard}>
                    <View style={styles.loanCardHeader}>
                      <Text style={styles.borrowerName}>
                        {loan.namaPeminjam || loan.peminjam}
                      </Text>
                      <View
                        style={[
                          styles.statusBadge,
                          isOverdue
                            ? styles.statusBadgeOverdue
                            : styles.statusBadgeNormal,
                        ]}
                      >
                        <Text
                          style={
                            isOverdue
                              ? styles.statusTextOverdue
                              : styles.statusTextNormal
                          }
                        >
                          {isOverdue ? "Lewat Batas" : "Tepat Waktu"}
                        </Text>
                      </View>
                    </View>

                    <Text style={styles.loanDetailRow}>
                      Alat:{" "}
                      <Text style={styles.loanDetailBold}>
                        {loan.namaAlat} ({loan.kodeAlat})
                      </Text>
                    </Text>

                    {loan.telepon ? (
                      <Text style={styles.loanDetailRow}>
                        Kontak / Divisi: {loan.telepon}
                      </Text>
                    ) : null}

                    <Text style={styles.loanDetailRow}>
                      Pinjam: {loan.tanggalPinjam} | Batas Kembali:{" "}
                      {loan.rencanaKembali}
                    </Text>

                    <Pressable
                      onPress={() => handleReturn(loan)}
                      disabled={processingId === loan.id}
                      style={styles.actionReturnBtn}
                      accessibilityRole="button"
                      accessibilityLabel="Proses Pengembalian"
                    >
                      {processingId === loan.id ? (
                        <ActivityIndicator color="#059669" size="small" />
                      ) : (
                        <Text style={styles.actionReturnText}>
                          Proses Pengembalian
                        </Text>
                      )}
                    </Pressable>
                  </View>
                );
              })
            )
          ) : filteredReturned.length === 0 ? (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyIcon}>📁</Text>
              <Text style={styles.emptyTitle}>Belum Ada Riwayat Selesai</Text>
              <Text style={styles.emptySubtitle}>
                Riwayat alat yang sudah dikembalikan akan tampil di sini.
              </Text>
            </View>
          ) : (
            filteredReturned.map((loan) => (
              <View key={loan.id} style={styles.loanCard}>
                <View style={styles.loanCardHeader}>
                  <Text style={styles.borrowerName}>
                    {loan.namaPeminjam || loan.peminjam}
                  </Text>
                  <View
                    style={[styles.statusBadge, styles.statusBadgeNormal]}
                  >
                    <Text style={styles.statusTextNormal}>Sudah Kembali</Text>
                  </View>
                </View>

                <Text style={styles.loanDetailRow}>
                  Alat:{" "}
                  <Text style={styles.loanDetailBold}>
                    {loan.namaAlat} ({loan.kodeAlat})
                  </Text>
                </Text>

                <Text style={styles.loanDetailRow}>
                  Pinjam: {loan.tanggalPinjam} | Dikembalikan:{" "}
                  {loan.tanggalKembali || "-"}
                </Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}
