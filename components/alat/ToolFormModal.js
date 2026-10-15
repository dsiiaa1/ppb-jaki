import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import styles from "../../style/AlatStyle";

export default function ToolFormModal({
  visible,
  onClose,
  editingTool,
  form,
  onChange,
  error,
  submitting,
  onSave,
}) {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.modalOverlay}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.modalScroll}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.formPanel}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalEyebrow}>
                  {editingTool ? "PERBARUI DATA" : "INVENTARIS BARU"}
                </Text>
                <Text style={styles.modalTitle}>
                  {editingTool ? "Edit alat" : "Tambah alat"}
                </Text>
              </View>
              <Pressable
                onPress={onClose}
                style={styles.closeButton}
                accessibilityRole="button"
                accessibilityLabel="Tutup form"
              >
                <Text style={styles.closeButtonText}>×</Text>
              </Pressable>
            </View>
            <Text style={styles.inputLabel}>Kode alat</Text>
            <TextInput
              value={form.code}
              onChangeText={(value) => onChange("code", value)}
              placeholder="Contoh: ALT-001"
              placeholderTextColor="#8A9690"
              style={styles.input}
              autoCapitalize="characters"
              maxLength={30}
            />
            <Text style={styles.inputLabel}>Nama alat</Text>
            <TextInput
              value={form.name}
              onChangeText={(value) => onChange("name", value)}
              placeholder="Contoh: Kamera DSLR"
              placeholderTextColor="#8A9690"
              style={styles.input}
              maxLength={80}
              autoFocus
            />
            <Text style={styles.inputLabel}>Kategori</Text>
            <TextInput
              value={form.category}
              onChangeText={(value) => onChange("category", value)}
              placeholder="Contoh: Elektronik"
              placeholderTextColor="#8A9690"
              style={styles.input}
              maxLength={50}
            />
            <Text style={styles.inputLabel}>Jumlah stok</Text>
            <TextInput
              value={form.stock}
              onChangeText={(value) =>
                onChange("stock", value.replace(/[^0-9]/g, ""))
              }
              placeholder="0"
              placeholderTextColor="#8A9690"
              style={styles.input}
              keyboardType="number-pad"
              maxLength={7}
            />
            {error ? <Text style={styles.formError}>{error}</Text> : null}
            <View style={styles.formActions}>
              <Pressable
                onPress={onClose}
                style={styles.cancelButton}
                disabled={submitting}
              >
                <Text style={styles.cancelButtonText}>Batal</Text>
              </Pressable>
              <Pressable
                onPress={onSave}
                style={[styles.saveButton, submitting && styles.buttonDisabled]}
                disabled={submitting}
              >
                <Text style={styles.saveButtonText}>
                  {submitting
                    ? "Menyimpan..."
                    : editingTool
                      ? "Simpan perubahan"
                      : "Simpan alat"}
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}
