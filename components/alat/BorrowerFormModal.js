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

export default function BorrowerFormModal({
  visible,
  onClose,
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
                <Text style={styles.modalEyebrow}>DATA PEMINJAM</Text>
                <Text style={styles.modalTitle}>Tambah peminjam</Text>
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

            <Text style={styles.inputLabel}>Nama lengkap</Text>
            <TextInput
              value={form.name}
              onChangeText={(value) => onChange("name", value)}
              placeholder="Nama peminjam"
              placeholderTextColor="#8A9690"
              style={styles.input}
              maxLength={100}
              autoCapitalize="words"
              autoFocus
            />

            <Text style={styles.inputLabel}>NIM/NIP</Text>
            <TextInput
              value={form.identity}
              onChangeText={(value) => onChange("identity", value)}
              placeholder="Nomor identitas"
              placeholderTextColor="#8A9690"
              style={styles.input}
              maxLength={30}
            />

            <Text style={styles.inputLabel}>Kelas atau unit</Text>
            <TextInput
              value={form.unit}
              onChangeText={(value) => onChange("unit", value)}
              placeholder="Contoh: XII IPA 1"
              placeholderTextColor="#8A9690"
              style={styles.input}
              maxLength={60}
              autoCapitalize="words"
            />

            <Text style={styles.inputLabel}>Nomor telepon (opsional)</Text>
            <TextInput
              value={form.phone}
              onChangeText={(value) => onChange("phone", value)}
              placeholder="08xxxxxxxxxx"
              placeholderTextColor="#8A9690"
              style={styles.input}
              keyboardType="phone-pad"
              maxLength={20}
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
                  {submitting ? "Menyimpan..." : "Simpan peminjam"}
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}
