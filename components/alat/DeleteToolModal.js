import { Modal, Pressable, Text, View } from "react-native";
import styles from "../../style/AlatStyle";

export default function DeleteToolModal({
  tool,
  error,
  submitting,
  onClose,
  onConfirm,
}) {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={Boolean(tool)}
      onRequestClose={onClose}
    >
      <View style={styles.confirmOverlay}>
        <View style={styles.confirmPanel}>
          <Text style={styles.modalEyebrow}>KONFIRMASI HAPUS</Text>
          <Text style={styles.confirmTitle}>Hapus alat ini?</Text>
          <Text style={styles.confirmText}>
            {tool ? `${tool.name} akan dihapus dari inventaris.` : ""}
          </Text>
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
              onPress={onConfirm}
              style={[
                styles.confirmDeleteButton,
                submitting && styles.buttonDisabled,
              ]}
              disabled={submitting}
            >
              <Text style={styles.confirmDeleteText}>
                {submitting ? "Menghapus..." : "Ya, hapus"}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
