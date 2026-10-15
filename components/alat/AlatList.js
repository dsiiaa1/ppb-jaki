import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import styles from "../../style/AlatStyle";

export default function AlatList({
  tools,
  filteredTools,
  loading,
  error,
  showError,
  search,
  onSearchChange,
  onDismissNotice,
  notice,
  onAdd,
  onEdit,
  onDelete,
  compact,
}) {
  return (
    <>
      <View style={[styles.listHeader, compact && styles.listHeaderCompact]}>
        <View>
          <Text style={styles.sectionTitle}>Semua alat</Text>
          <Text style={styles.sectionSubtitle}>
            {loading ? "Memuat data..." : `${tools.length} item terdaftar`}
          </Text>
        </View>
        <TextInput
          value={search}
          onChangeText={onSearchChange}
          placeholder="Cari alat atau kategori"
          placeholderTextColor="#7C8782"
          style={[styles.searchInput, compact && styles.searchInputCompact]}
          accessibilityLabel="Cari alat atau kategori"
        />
      </View>

      {notice ? (
        <Pressable onPress={onDismissNotice} style={styles.notice}>
          <Text style={styles.noticeText}>{notice}</Text>
          <Text style={styles.noticeDismiss}>Tutup</Text>
        </Pressable>
      ) : null}
      {showError ? <Text style={styles.errorText}>{error}</Text> : null}

      {loading ? (
        <View style={styles.stateBox}>
          <ActivityIndicator color={styles.activityColor.color} />
          <Text style={styles.stateText}>Mengambil data alat...</Text>
        </View>
      ) : error && tools.length === 0 ? (
        <View style={styles.stateBox}>
          <Text style={styles.stateText}>Daftar belum dapat dimuat.</Text>
        </View>
      ) : filteredTools.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyMark}>{search ? "?" : "+"}</Text>
          <Text style={styles.emptyTitle}>
            {search ? "Alat tidak ditemukan" : "Belum ada alat"}
          </Text>
          <Text style={styles.emptyText}>
            {search
              ? "Coba kata kunci lain."
              : "Tambahkan alat pertama untuk mulai mengelola inventaris."}
          </Text>
          {!search ? (
            <Pressable onPress={onAdd} style={styles.emptyButton}>
              <Text style={styles.emptyButtonText}>Tambah alat</Text>
            </Pressable>
          ) : null}
        </View>
      ) : (
        <View style={styles.toolList}>
          {filteredTools.map((tool, index) => (
            <View
              key={tool.id}
              style={[
                styles.toolRow,
                compact && styles.toolRowCompact,
                index === filteredTools.length - 1 && styles.toolRowLast,
              ]}
            >
              <View style={styles.toolIdentity}>
                <View style={styles.toolMark}>
                  <Text style={styles.toolMarkText}>
                    {tool.name.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <View style={styles.toolCopy}>
                  <Text style={styles.toolName} numberOfLines={2}>
                    {tool.name}
                  </Text>
                  <Text style={styles.toolCategory}>{tool.category}</Text>
                </View>
              </View>
              <View
                style={[
                  styles.toolMetaRow,
                  compact && styles.toolMetaRowCompact,
                ]}
              >
                <View
                  style={[
                    styles.codeColumn,
                    compact && styles.codeColumnCompact,
                  ]}
                >
                  <Text style={styles.codeLabel}>KODE (ID)</Text>
                  <Text style={styles.codeText} numberOfLines={1}>
                    {tool.code}
                  </Text>
                </View>
                <View style={styles.stockColumn}>
                  <Text style={styles.stockValue}>{tool.stock}</Text>
                  <Text style={styles.stockLabel}>unit</Text>
                </View>
                <View style={styles.actions}>
                  <Pressable
                    onPress={() => onEdit(tool)}
                    style={styles.editButton}
                    accessibilityRole="button"
                    accessibilityLabel={`Edit ${tool.name}`}
                  >
                    <Text style={styles.editButtonText}>Edit</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => onDelete(tool)}
                    style={styles.deleteButton}
                    accessibilityRole="button"
                    accessibilityLabel={`Hapus ${tool.name}`}
                  >
                    <Text style={styles.deleteButtonText}>Hapus</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          ))}
        </View>
      )}
    </>
  );
}
