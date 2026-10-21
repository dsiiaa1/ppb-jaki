import { Pressable, Text, View } from "react-native";
import styles from "../../style/AlatStyle";

export default function AlatHeader({
  onAdd,
  onAddBorrower,
  compact,
}) {
  return (
    <View style={[styles.intro, compact && styles.introCompact]}>
      <View style={styles.introCopy}>
        <Text style={styles.eyebrow}>INVENTARIS</Text>
        <Text style={styles.title}>Daftar alat</Text>
        <Text style={styles.subtitle}>
          Kelola data dan ketersediaan alat.
        </Text>
      </View>
      <View style={styles.headerActions}>
        <Pressable
          onPress={onAddBorrower}
          style={[
            styles.addBorrowerButton,
            compact && styles.headerActionCompact,
          ]}
          accessibilityRole="button"
        >
          <Text style={styles.addBorrowerButtonText}>+ Peminjam</Text>
        </Pressable>
        <Pressable
          onPress={onAdd}
          style={[styles.addButton, compact && styles.headerActionCompact]}
          accessibilityRole="button"
        >
          <Text style={styles.addButtonText}>Tambah alat</Text>
        </Pressable>
      </View>
    </View>
  );
}
