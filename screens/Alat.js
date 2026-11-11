import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  Platform,
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
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import styles from "../style/AlatStyle";
import { db } from "../config/firebase";
import { logActivity } from "../utils/helpers";

export default function Alat({ onNavigate }) {
  const { width } = useWindowDimensions();
  const compact = width < 640;

  const [tools, setTools] = useState([]);
  const [borrowedToolIds, setBorrowedToolIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  // Form state
  const [code, setCode] = useState("");
  const [name, setName] = useState("");

  // Edit modal state
  const [editingTool, setEditingTool] = useState(null);
  const [editCode, setEditCode] = useState("");
  const [editName, setEditName] = useState("");

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
        setError("Gagal memuat data alat.");
        setLoading(false);
      },
    );

    const unsubLoans = onSnapshot(
      collection(db, "peminjaman"),
      (snapshot) => {
        const activeIds = new Set();
        snapshot.docs.forEach((d) => {
          const data = d.data();
          const s = String(data.status || "").trim().toLowerCase();
          if (["dipinjam", "disetujui", "borrowed", "aktif"].includes(s)) {
            if (data.alatId) activeIds.add(data.alatId);
            if (data.kodeAlat) activeIds.add(data.kodeAlat);
          }
        });
        setBorrowedToolIds(activeIds);
      },
      () => {},
    );

    return () => {
      unsubTools();
      unsubLoans();
    };
  }, []);

  const handleSaveTool = async () => {
    const trimmedCode = code.trim().toUpperCase();
    const trimmedName = name.trim();

    if (!trimmedCode || !trimmedName) {
      setError("Kode alat dan nama alat wajib diisi.");
      return;
    }

    if (tools.some((t) => t.code.toUpperCase() === trimmedCode)) {
      setError("Kode alat sudah terdaftar. Gunakan kode yang unik.");
      return;
    }

    setError("");
    setNotice("");
    setSubmitting(true);

    try {
      await addDoc(collection(db, "alat"), {
        kode: trimmedCode,
        nama: trimmedName,
        kategori: "Umum",
        stok: 1,
        dibuatPada: serverTimestamp(),
      });

      await logActivity(
        db,
        `Alat baru ditambahkan: ${trimmedName} (${trimmedCode})`,
        "tambah",
      );

      setCode("");
      setName("");
      setNotice(`Alat "${trimmedName}" berhasil disimpan.`);
    } catch {
      setError("Gagal menyimpan alat baru.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleOpenEdit = (tool) => {
    setEditingTool(tool);
    setEditCode(tool.code);
    setEditName(tool.name);
  };

  const handleUpdateTool = async () => {
    if (!editingTool) return;
    const trimmedCode = editCode.trim().toUpperCase();
    const trimmedName = editName.trim();

    if (!trimmedCode || !trimmedName) {
      setError("Kode dan nama alat tidak boleh kosong.");
      return;
    }

    setSubmitting(true);
    try {
      await updateDoc(doc(db, "alat", editingTool.id), {
        kode: trimmedCode,
        nama: trimmedName,
        diperbaruiPada: serverTimestamp(),
      });
      setEditingTool(null);
      setNotice(`Data alat "${trimmedName}" berhasil diperbarui.`);
    } catch {
      setError("Gagal memperbarui alat.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteTool = async (tool) => {
    const confirmDelete = async () => {
      try {
        await deleteDoc(doc(db, "alat", tool.id));
        setNotice(`Alat "${tool.name}" berhasil dihapus.`);
      } catch {
        setError("Gagal menghapus alat.");
      }
    };

    if (Platform.OS === "web") {
      if (window.confirm(`Yakin ingin menghapus alat "${tool.name}"?`)) {
        await confirmDelete();
      }
    } else {
      Alert.alert(
        "Hapus Alat",
        `Yakin ingin menghapus alat "${tool.name}"?`,
        [
          { text: "Batal", style: "cancel" },
          { text: "Hapus", style: "destructive", onPress: confirmDelete },
        ],
      );
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
            <Text style={styles.badgeText}>MANAJEMEN INVENTARIS</Text>
          </View>
          <Text style={styles.pageTitle}>Data Alat</Text>
          <Text style={styles.pageSubtitle}>
            Kelola data dan pantau status ketersediaan inventaris alat
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

          {/* Section: Tambah Alat Baru */}
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Tambah Alat Baru</Text>

            <Text style={styles.inputLabel}>Kode Alat</Text>
            <TextInput
              value={code}
              onChangeText={setCode}
              placeholder="Contoh: ALT-001"
              placeholderTextColor="#94A3B8"
              style={styles.input}
              autoCapitalize="characters"
            />

            <Text style={styles.inputLabel}>Nama Alat / Perangkat</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Contoh: Proyektor Epson EB-X500"
              placeholderTextColor="#94A3B8"
              style={styles.input}
            />

            <Pressable
              onPress={handleSaveTool}
              disabled={submitting}
              style={[
                styles.submitButton,
                submitting && styles.submitButtonDisabled,
              ]}
              accessibilityRole="button"
              accessibilityLabel="Simpan Alat Baru"
            >
              {submitting ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <Text style={styles.submitButtonText}>+ Simpan Alat Baru</Text>
              )}
            </Pressable>
          </View>

          {/* Section: Daftar Inventaris */}
          <View style={styles.listSectionHeader}>
            <Text style={styles.sectionTitle}>Daftar Inventaris</Text>
            <View style={styles.unitBadge}>
              <Text style={styles.unitBadgeText}>{tools.length} Unit</Text>
            </View>
          </View>

          <View style={styles.tableContainer}>
            {/* Table Header */}
            <View style={styles.tableHeader}>
              <Text style={[styles.thText, styles.thKode]}>KODE</Text>
              <Text style={[styles.thText, styles.thNama]}>NAMA</Text>
              <Text style={[styles.thText, styles.thStatus]}>STATUS</Text>
              <Text style={[styles.thText, styles.thAksi]}>AKSI</Text>
            </View>

            {/* Table Body / Empty State */}
            {loading ? (
              <View style={styles.emptyBox}>
                <ActivityIndicator color="#2563EB" />
                <Text style={[styles.emptyBoxText, { marginTop: 8 }]}>
                  Memuat data inventaris...
                </Text>
              </View>
            ) : tools.length === 0 ? (
              <View style={styles.emptyBox}>
                <Text style={styles.emptyBoxText}>
                  Belum ada data alat. Silakan tambahkan alat di atas.
                </Text>
              </View>
            ) : (
              tools.map((tool) => {
                const isBorrowed =
                  borrowedToolIds.has(tool.id) || borrowedToolIds.has(tool.code);

                return (
                  <View key={tool.id} style={styles.tableRow}>
                    <Text style={styles.tdKode} numberOfLines={1}>
                      {tool.code}
                    </Text>
                    <Text style={styles.tdNama} numberOfLines={1}>
                      {tool.name}
                    </Text>
                    <View style={styles.tdStatus}>
                      <View
                        style={[
                          styles.statusBadge,
                          isBorrowed
                            ? styles.statusBadgeDipinjam
                            : styles.statusBadgeTersedia,
                        ]}
                      >
                        <Text
                          style={
                            isBorrowed
                              ? styles.statusTextDipinjam
                              : styles.statusTextTersedia
                          }
                        >
                          {isBorrowed ? "Dipinjam" : "Tersedia"}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tdAksi}>
                      <Pressable
                        onPress={() => handleOpenEdit(tool)}
                        style={styles.actionEditBtn}
                        accessibilityRole="button"
                        accessibilityLabel="Edit Alat"
                      >
                        <Text style={styles.actionEditText}>Edit</Text>
                      </Pressable>
                      <Pressable
                        onPress={() => handleDeleteTool(tool)}
                        style={styles.actionDeleteBtn}
                        accessibilityRole="button"
                        accessibilityLabel="Hapus Alat"
                      >
                        <Text style={styles.actionDeleteText}>Hapus</Text>
                      </Pressable>
                    </View>
                  </View>
                );
              })
            )}
          </View>

          {/* Bottom Button: Kembali ke Dashboard */}
          <Pressable
            onPress={() => onNavigate && onNavigate("home")}
            style={styles.backButton}
            accessibilityRole="button"
            accessibilityLabel="Kembali ke Dashboard"
          >
            <Text style={styles.backButtonText}>← Kembali ke Dashboard</Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Edit Tool Modal */}
      {editingTool ? (
        <Modal
          visible
          transparent
          animationType="fade"
          onRequestClose={() => setEditingTool(null)}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(15, 23, 42, 0.4)",
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
            }}
          >
            <View
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 12,
                padding: 20,
                width: "100%",
                maxWidth: 420,
                borderColor: "#E2E8F0",
                borderWidth: 1,
              }}
            >
              <Text
                style={{ fontSize: 16, fontWeight: "700", color: "#0F172A" }}
              >
                Edit Data Alat
              </Text>

              <Text style={styles.inputLabel}>Kode Alat</Text>
              <TextInput
                value={editCode}
                onChangeText={setEditCode}
                style={styles.input}
                autoCapitalize="characters"
              />

              <Text style={styles.inputLabel}>Nama Alat</Text>
              <TextInput
                value={editName}
                onChangeText={setEditName}
                style={styles.input}
              />

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginTop: 20,
                  gap: 10,
                }}
              >
                <Pressable
                  onPress={() => setEditingTool(null)}
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 16,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: "#E2E8F0",
                  }}
                >
                  <Text style={{ fontSize: 13, color: "#64748B" }}>Batal</Text>
                </Pressable>

                <Pressable
                  onPress={handleUpdateTool}
                  disabled={submitting}
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 16,
                    borderRadius: 8,
                    backgroundColor: "#2563EB",
                  }}
                >
                  <Text
                    style={{ fontSize: 13, color: "#FFFFFF", fontWeight: "600" }}
                  >
                    Simpan Perubahan
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      ) : null}
    </View>
  );
}
