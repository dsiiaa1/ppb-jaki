import { Pressable, Text, View } from "react-native";
import styles from "../../style/AlatStyle";

export default function AlatHeader({
  onLogout,
  onAdd,
  onAddBorrower,
  compact,
}) {
  return (
    <>
      <View style={styles.header}>
        <View style={styles.brand}>
          <View style={styles.brandMark}>
            <Text style={styles.brandMarkText}>SP</Text>
          </View>
          <View>
            <Text style={styles.brandName}>Sistem Peminjaman</Text>
            <Text style={styles.brandCaption}>PANEL SUPER ADMIN</Text>
          </View>
        </View>
        <Pressable
          onPress={onLogout}
          style={styles.logoutButton}
          accessibilityRole="button"
        >
          <Text style={styles.logoutText}>Keluar</Text>
        </Pressable>
      </View>

      <View style={[styles.intro, compact && styles.introCompact]}>
        <View style={styles.introCopy}>
          <Text style={styles.eyebrow}>INVENTARIS</Text>
          <Text style={styles.title}>Daftar alat</Text>
          <Text style={styles.subtitle}>
            Kelola data dan ketersediaan alat dari satu tempat.
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
            <Text style={styles.addButtonIcon}>+</Text>
            <Text style={styles.addButtonText}>Tambah alat</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}
