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
  addDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import styles from "../style/PeminjamanStyle";
import { db } from "../config/firebase";
import { getDateString, logActivity } from "../utils/helpers";

export default function Peminjaman() {
  const { width } = useWindowDimensions();
  const compact = width < 640;

  const [activeTab, setActiveTab] = useState("form");
  const [tools, setTools] = useState([]);
  const [activeLoans, setActiveLoans] = useState([]);
  const [borrowedToolIds, setBorrowedToolIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  // Form Fields
  const [selectedTool, setSelectedTool] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [borrowerName, setBorrowerName] = useState("");
  const [phoneDivisi, setPhoneDivisi] = useState("");
  const [purpose, setPurpose] = useState("");
  const [loanDate, setLoanDate] = useState(getDateString(0));
  const [expectedReturnDate, setExpectedReturnDate] = useState(getDateString(3));

  useEffect(() => {
    const unsubTools = onSnapshot(
      collection(db, "alat"),
      (snapshot) => {
        setTools(
          snapshot.docs.map((d) => {
            const data = d.data();
            return {
              id: d.id,
              code: data.kode || data.code || d.id,
              name: data.nama || data.name || "Tanpa Nama",
              stock: Number(data.stok ?? data.stock ?? 1),
            };
          }),
        );
        setLoading(false);
      },
      () => {
        setError("Gagal memuat daftar alat.");
        setLoading(false);
      },
    );

    const unsubLoans = onSnapshot(
      collection(db, "peminjaman"),
      (snapshot) => {
        const borrowedIds = new Set();
        const loansList = [];

        snapshot.docs.forEach((d) => {
          const data = d.data();
          const s = String(data.status || "").trim().toLowerCase();
          if (["dipinjam", "disetujui", "borrowed", "aktif"].includes(s)) {
            if (data.alatId) borrowedIds.add(data.alatId);
            if (data.kodeAlat) borrowedIds.add(data.kodeAlat);
            loansList.push({ id: d.id, ...data });
          }
        });

        setBorrowedToolIds(borrowedIds);
        setActiveLoans(loansList);
      },
      () => {},
    );

    return () => {
      unsubTools();
      unsubLoans();
    };
  }, []);

  const availableTools = tools.filter(
    (tool) => !borrowedToolIds.has(tool.id) && !borrowedToolIds.has(tool.code),
  );

  const handleSubmit = async () => {
    const trimmedBorrower = borrowerName.trim();
    if (!selectedTool) {
      setError("Silakan pilih alat yang akan dipinjam.");
      return;
    }
    if (!trimmedBorrower) {
      setError("Nama peminjam wajib diisi.");
      return;
    }
    if (!loanDate.trim() || !expectedReturnDate.trim()) {
      setError("Tanggal pinjam dan rencana tanggal pengembalian wajib diisi.");
      return;
    }

    setError("");
    setNotice("");
    setSubmitting(true);

    try {
      await addDoc(collection(db, "peminjaman"), {
        alatId: selectedTool.id,
        kodeAlat: selectedTool.code,
        namaAlat: selectedTool.name,
        namaPeminjam: trimmedBorrower,
        peminjam: trimmedBorrower,
        telepon: phoneDivisi.trim(),
        divisi: phoneDivisi.trim(),
        keperluan: purpose.trim(),
        tanggalPinjam: loanDate.trim(),
        rencanaKembali: expectedReturnDate.trim(),
        status: "dipinjam",
        jumlah: 1,
        dibuatPada: serverTimestamp(),
      });

      await logActivity(
        db,
        `${trimmedBorrower} meminjam ${selectedTool.name} (${selectedTool.code})`,
        "pinjam",
      );

      setNotice(
        `Peminjaman "${selectedTool.name}" untuk "${trimmedBorrower}" berhasil dicatat!`,
      );
      setSelectedTool(null);
      setBorrowerName("");
      setPhoneDivisi("");
      setPurpose("");
      setLoanDate(getDateString(0));
      setExpectedReturnDate(getDateString(3));
    } catch {
      setError("Gagal mencatat peminjaman. Silakan coba lagi.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReturnLoan = async (loan) => {
    try {
      await updateDoc(doc(db, "peminjaman", loan.id), {
        status: "kembali",
        tanggalKembali: getDateString(0),
        diperbaruiPada: serverTimestamp(),
      });

      await logActivity(
        db,
        `${loan.namaPeminjam || "Peminjam"} mengembalikan ${loan.namaAlat || "Alat"}`,
        "kembali",
      );

      setNotice(`Alat "${loan.namaAlat}" berhasil dikembalikan.`);
    } catch {
      setError("Gagal memproses pengembalian.");
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
            <Text style={styles.badgeText}>TRANSAKSI PEMINJAMAN</Text>
          </View>
          <Text style={styles.pageTitle}>Peminjaman Alat</Text>
          <Text style={styles.pageSubtitle}>
            Catat peminjaman baru dan pantau daftar peminjam inventaris alat
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

          {/* Tab Switcher */}
          <View style={styles.tabsRow}>
            <Pressable
              onPress={() => setActiveTab("form")}
              style={[
                styles.tabButton,
                activeTab === "form" && styles.tabButtonActive,
              ]}
              accessibilityRole="button"
              accessibilityLabel="Form Pinjam Baru"
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "form" && styles.tabTextActive,
                ]}
              >
                + Form Pinjam Baru
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setActiveTab("list")}
              style={[
                styles.tabButton,
                activeTab === "list" && styles.tabButtonActive,
              ]}
              accessibilityRole="button"
              accessibilityLabel="Daftar Pinjaman"
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "list" && styles.tabTextActive,
                ]}
              >
                Daftar Pinjaman ({activeLoans.length})
              </Text>
            </Pressable>
          </View>

          {/* Tab 1: Form Pinjam Baru */}
          {activeTab === "form" ? (
            <View style={styles.formCard}>
              <Text style={styles.formTitle}>Formulir Peminjaman</Text>

              {/* Tool Picker Dropdown */}
              <Text style={styles.inputLabel}>
                Pilih Alat (Hanya yang Tersedia) *
              </Text>
              <Pressable
                onPress={() => {
                  if (availableTools.length > 0) {
                    setDropdownOpen(!dropdownOpen);
                  }
                }}
                style={[
                  styles.dropdownBtn,
                  availableTools.length === 0 && styles.dropdownBtnDisabled,
                ]}
                accessibilityRole="button"
                accessibilityLabel="Pilih alat yang tersedia"
              >
                <Text
                  style={[
                    styles.dropdownText,
                    !selectedTool && styles.dropdownPlaceholder,
                  ]}
                >
                  {availableTools.length === 0
                    ? "Tidak ada alat tersedia saat ini"
                    : selectedTool
                      ? `${selectedTool.code} - ${selectedTool.name}`
                      : "Pilih alat yang tersedia..."}
                </Text>
                <Text style={styles.dropdownArrow}>
                  {dropdownOpen ? "▲" : "▼"}
                </Text>
              </Pressable>

              {dropdownOpen && availableTools.length > 0 ? (
                <View style={styles.dropdownMenu}>
                  <ScrollView nestedScrollEnabled style={{ maxHeight: 180 }}>
                    {availableTools.map((tool) => (
                      <Pressable
                        key={tool.id}
                        onPress={() => {
                          setSelectedTool(tool);
                          setDropdownOpen(false);
                        }}
                        style={styles.dropdownItem}
                        accessibilityRole="button"
                      >
                        <Text style={styles.dropdownItemText}>{tool.name}</Text>
                        <Text style={styles.dropdownItemSub}>
                          Kode: {tool.code}
                        </Text>
                      </Pressable>
                    ))}
                  </ScrollView>
                </View>
              ) : null}

              {/* Nama Peminjam */}
              <Text style={styles.inputLabel}>Nama Peminjam *</Text>
              <TextInput
                value={borrowerName}
                onChangeText={setBorrowerName}
                placeholder="Contoh: Budi Santoso"
                placeholderTextColor="#94A3B8"
                style={styles.input}
              />

              {/* No. HP / WhatsApp / Divisi */}
              <Text style={styles.inputLabel}>No. HP / WhatsApp / Divisi</Text>
              <TextInput
                value={phoneDivisi}
                onChangeText={setPhoneDivisi}
                placeholder="Contoh: 081234567890 atau Divisi IT"
                placeholderTextColor="#94A3B8"
                style={styles.input}
              />

              {/* Keperluan Peminjaman */}
              <Text style={styles.inputLabel}>Keperluan Peminjaman</Text>
              <TextInput
                value={purpose}
                onChangeText={setPurpose}
                placeholder="Contoh: Presentasi Rapat Kerja Bulanan"
                placeholderTextColor="#94A3B8"
                style={styles.input}
              />

              {/* Tanggal Pinjam */}
              <Text style={styles.inputLabel}>
                Tanggal Pinjam (YYYY-MM-DD) *
              </Text>
              <TextInput
                value={loanDate}
                onChangeText={setLoanDate}
                placeholder="2026-11-11"
                placeholderTextColor="#94A3B8"
                style={styles.input}
              />
              <Text style={styles.helperText}>
                Format: Tahun-Bulan-Tanggal (Contoh: 2026-11-11)
              </Text>

              {/* Rencana Tanggal Pengembalian */}
              <Text style={styles.inputLabel}>
                Rencana Tanggal Pengembalian (YYYY-MM-DD) *
              </Text>
              <TextInput
                value={expectedReturnDate}
                onChangeText={setExpectedReturnDate}
                placeholder="2026-11-14"
                placeholderTextColor="#94A3B8"
                style={styles.input}
              />
              <Text style={styles.helperText}>
                Perkiraan alat dikembalikan ke gudang/inventaris
              </Text>

              {/* Submit Button */}
              <Pressable
                onPress={handleSubmit}
                disabled={submitting}
                style={[
                  styles.submitButton,
                  submitting && styles.submitButtonDisabled,
                ]}
                accessibilityRole="button"
                accessibilityLabel="Konfirmasi dan Catat Peminjaman"
              >
                {submitting ? (
                  <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                  <Text style={styles.submitButtonText}>
                    ✓ Konfirmasi & Catat Peminjaman
                  </Text>
                )}
              </Pressable>
            </View>
          ) : (
            /* Tab 2: Daftar Pinjaman */
            <View style={styles.loanListContainer}>
              {loading ? (
                <View style={styles.emptyBox}>
                  <ActivityIndicator color="#2563EB" />
                  <Text style={[styles.emptyBoxText, { marginTop: 8 }]}>
                    Memuat daftar pinjaman...
                  </Text>
                </View>
              ) : activeLoans.length === 0 ? (
                <View style={styles.emptyBox}>
                  <Text style={styles.emptyBoxText}>
                    Belum ada peminjaman aktif saat ini.
                  </Text>
                </View>
              ) : (
                activeLoans.map((loan) => (
                  <View key={loan.id} style={styles.loanCard}>
                    <View style={styles.loanCardHeader}>
                      <Text style={styles.borrowerName}>
                        {loan.namaPeminjam || loan.peminjam}
                      </Text>
                      <View style={styles.statusBadge}>
                        <Text style={styles.statusText}>Dipinjam</Text>
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

                    {loan.keperluan ? (
                      <Text style={styles.loanDetailRow}>
                        Keperluan: {loan.keperluan}
                      </Text>
                    ) : null}

                    <Text style={styles.loanDetailRow}>
                      Pinjam: {loan.tanggalPinjam} | Rencana Kembali:{" "}
                      {loan.rencanaKembali}
                    </Text>

                    <Pressable
                      onPress={() => handleReturnLoan(loan)}
                      style={styles.actionReturnBtn}
                      accessibilityRole="button"
                      accessibilityLabel="Kembalikan Alat Ini"
                    >
                      <Text style={styles.actionReturnText}>
                        Kembalikan Alat
                      </Text>
                    </Pressable>
                  </View>
                ))
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
