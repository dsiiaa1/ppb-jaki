import { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
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
import AlatHeader from "../components/alat/AlatHeader";
import AlatList from "../components/alat/AlatList";
import DeleteToolModal from "../components/alat/DeleteToolModal";
import BorrowerFormModal from "../components/alat/BorrowerFormModal";
import ToolFormModal from "../components/alat/ToolFormModal";
import { db } from "../config/firebase";
import styles from "../style/AlatStyle";

const emptyForm = { code: "", name: "", category: "", stock: "" };
const emptyBorrowerForm = {
  name: "",
  identity: "",
  unit: "",
  phone: "",
};

export default function Alat({ user, onLogout }) {
  const { width } = useWindowDimensions();
  const compact = width < 600;
  const [tools, setTools] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [formVisible, setFormVisible] = useState(false);
  const [borrowerFormVisible, setBorrowerFormVisible] = useState(false);
  const [borrowerForm, setBorrowerForm] = useState(emptyBorrowerForm);
  const [editingTool, setEditingTool] = useState(null);
  const [deletingTool, setDeletingTool] = useState(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(
    () =>
      onSnapshot(
        collection(db, "alat"),
        (snapshot) => {
          setTools(
            snapshot.docs.map((document) => {
              const data = document.data();
              return {
                id: document.id,
                code: data.kode || document.id,
                name: data.nama || data.name || "Alat tanpa nama",
                category: data.kategori || data.category || "Umum",
                stock: Number(data.stok ?? data.stock ?? 0),
              };
            }),
          );
          setLoading(false);
          setError("");
        },
        () => {
          setError(
            "Daftar alat gagal dimuat. Periksa koneksi dan akses Firebase.",
          );
          setLoading(false);
        },
      ),
    [],
  );

  const filteredTools = tools.filter((tool) =>
    `${tool.code} ${tool.name} ${tool.category}`
      .toLowerCase()
      .includes(search.trim().toLowerCase()),
  );
  const totalStock = tools.reduce((total, tool) => total + tool.stock, 0);

  const openCreateForm = () => {
    setEditingTool(null);
    setForm({
      ...emptyForm,
      code: `ALT-${Date.now().toString(36).toUpperCase()}`,
    });
    setError("");
    setFormVisible(true);
  };

  const openBorrowerForm = () => {
    setBorrowerForm(emptyBorrowerForm);
    setError("");
    setBorrowerFormVisible(true);
  };

  const saveBorrower = async () => {
    const name = borrowerForm.name.trim();
    const identity = borrowerForm.identity.trim();
    const unit = borrowerForm.unit.trim();
    const phone = borrowerForm.phone.trim();

    if (!name || !identity || !unit) {
      setError("Nama, NIM/NIP, dan kelas atau unit wajib diisi.");
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      await addDoc(collection(db, "peminjam"), {
        nama: name,
        identitas: identity,
        unit,
        telepon: phone,
        dibuatPada: serverTimestamp(),
      });
      setNotice(`${name} berhasil ditambahkan sebagai peminjam.`);
      setBorrowerFormVisible(false);
    } catch {
      setError(
        "Data peminjam gagal disimpan. Periksa koneksi dan akses Firebase, lalu coba lagi.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const openEditForm = (tool) => {
    setEditingTool(tool);
    setForm({
      code: tool.code,
      name: tool.name,
      category: tool.category,
      stock: String(tool.stock),
    });
    setError("");
    setFormVisible(true);
  };

  const saveTool = async () => {
    const code = form.code.trim().toUpperCase();
    const name = form.name.trim();
    const category = form.category.trim();
    const stock = Number(form.stock);
    if (
      !code ||
      !name ||
      !category ||
      form.stock.trim() === "" ||
      !Number.isInteger(stock) ||
      stock < 0
    ) {
      setError(
        "Isi kode, nama, kategori, dan stok dengan benar. Stok harus bilangan bulat 0 atau lebih.",
      );
      return;
    }

    const duplicateCode = tools.some(
      (tool) => tool.id !== editingTool?.id && tool.code.toUpperCase() === code,
    );
    if (duplicateCode) {
      setError("Kode alat sudah digunakan. Masukkan kode yang berbeda.");
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      const values = {
        kode: code,
        nama: name,
        kategori: category,
        stok: stock,
        diperbaruiPada: serverTimestamp(),
      };
      if (editingTool) {
        await updateDoc(doc(db, "alat", editingTool.id), values);
        setNotice(`${name} berhasil diperbarui.`);
      } else {
        await addDoc(collection(db, "alat"), {
          ...values,
          dibuatPada: serverTimestamp(),
        });
        setNotice(`${name} berhasil ditambahkan.`);
      }
      setFormVisible(false);
    } catch {
      setError(
        "Perubahan gagal disimpan. Periksa koneksi dan akses Firebase, lalu coba lagi.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const removeTool = async () => {
    if (!deletingTool) return;
    setSubmitting(true);
    setError("");
    try {
      await deleteDoc(doc(db, "alat", deletingTool.id));
      setNotice(`${deletingTool.name} berhasil dihapus.`);
      setDeletingTool(null);
    } catch {
      setError(
        "Alat gagal dihapus. Periksa koneksi dan akses Firebase, lalu coba lagi.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const closeDeleteModal = () => {
    setDeletingTool(null);
    setError("");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.page}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <AlatHeader
            onLogout={onLogout}
            onAdd={openCreateForm}
            onAddBorrower={openBorrowerForm}
            compact={compact}
          />
          <View
            style={[
              styles.dashboardGrid,
              compact && styles.dashboardGridCompact,
            ]}
          >
            <View
              style={[
                styles.dashboardSidebar,
                compact && styles.dashboardSidebarCompact,
              ]}
            >
              <View
                style={[styles.summaryRow, compact && styles.summaryRowCompact]}
              >
                <View style={styles.summaryBlock}>
                  <Text style={styles.summaryLabel}>JENIS ALAT</Text>
                  <Text style={styles.summaryValue}>
                    {loading ? "-" : tools.length}
                  </Text>
                </View>
                <View
                  style={[
                    styles.summaryDivider,
                    compact && styles.summaryDividerCompact,
                  ]}
                />
                <View style={styles.summaryBlock}>
                  <Text style={styles.summaryLabel}>TOTAL UNIT</Text>
                  <Text style={styles.summaryValue}>
                    {loading ? "-" : totalStock}
                  </Text>
                </View>
                <View style={styles.summaryNote}>
                  <Text style={styles.summaryNoteText}>Data inventaris</Text>
                  <Text style={styles.summaryNoteSub}>tersinkron langsung</Text>
                </View>
              </View>
            </View>
            <View style={styles.dashboardMain}>
              <AlatList
                tools={tools}
                filteredTools={filteredTools}
                loading={loading}
                error={error}
                showError={Boolean(
                  error &&
                  !formVisible &&
                  !borrowerFormVisible &&
                  !deletingTool,
                )}
                search={search}
                onSearchChange={setSearch}
                notice={notice}
                onDismissNotice={() => setNotice("")}
                onAdd={openCreateForm}
                onEdit={openEditForm}
                onDelete={(tool) => {
                  setError("");
                  setDeletingTool(tool);
                }}
                compact={compact}
              />
            </View>
          </View>
          <Text style={styles.footerText}>
            Masuk sebagai {user.displayName || user.email || "Super Admin"}
          </Text>
        </View>
      </ScrollView>

      <ToolFormModal
        visible={formVisible}
        onClose={() => setFormVisible(false)}
        editingTool={editingTool}
        form={form}
        onChange={(field, value) =>
          setForm((current) => ({ ...current, [field]: value }))
        }
        error={formVisible ? error : ""}
        submitting={submitting}
        onSave={saveTool}
      />

      <BorrowerFormModal
        visible={borrowerFormVisible}
        onClose={() => setBorrowerFormVisible(false)}
        form={borrowerForm}
        onChange={(field, value) =>
          setBorrowerForm((current) => ({ ...current, [field]: value }))
        }
        error={borrowerFormVisible ? error : ""}
        submitting={submitting}
        onSave={saveBorrower}
      />

      <DeleteToolModal
        tool={deletingTool}
        error={deletingTool ? error : ""}
        submitting={submitting}
        onClose={closeDeleteModal}
        onConfirm={removeTool}
      />
    </SafeAreaView>
  );
}
