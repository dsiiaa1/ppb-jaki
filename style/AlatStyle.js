import { StyleSheet } from "react-native";
import { colors, commonStyles } from "./theme";

const styles = StyleSheet.create({
  ...commonStyles,

  // Tambah Alat Baru section
  formSection: {
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 20,
    padding: 18,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "700",
  },

  // Daftar Inventaris section
  listSectionHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    marginTop: 24,
  },
  unitBadge: {
    backgroundColor: "#F1F5F9",
    borderColor: colors.border,
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  unitBadgeText: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: "700",
  },

  // Table styles
  tableContainer: {
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    overflow: "hidden",
  },
  tableHeader: {
    alignItems: "center",
    backgroundColor: colors.darkHeader,
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  thText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  thKode: { flex: 1.2 },
  thNama: { flex: 2 },
  thStatus: { flex: 1.2, textAlign: "center" },
  thAksi: { flex: 1, textAlign: "right" },

  tableRow: {
    alignItems: "center",
    borderBottomColor: "#F1F5F9",
    borderBottomWidth: 1,
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  tdKode: {
    color: colors.text,
    flex: 1.2,
    fontFamily: "monospace",
    fontSize: 13,
    fontWeight: "600",
  },
  tdNama: {
    color: colors.text,
    flex: 2,
    fontSize: 13,
    fontWeight: "600",
  },
  tdStatus: {
    alignItems: "center",
    flex: 1.2,
    justifyContent: "center",
  },
  tdAksi: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  statusBadge: {
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  statusBadgeTersedia: {
    backgroundColor: colors.greenBg,
    borderColor: colors.greenBorder,
  },
  statusBadgeDipinjam: {
    backgroundColor: colors.amberBg,
    borderColor: colors.amberBorder,
  },
  statusTextTersedia: {
    color: colors.greenText,
    fontSize: 11,
    fontWeight: "700",
  },
  statusTextDipinjam: {
    color: colors.amberText,
    fontSize: 11,
    fontWeight: "700",
  },

  actionEditBtn: {
    borderColor: colors.border,
    borderRadius: 6,
    borderWidth: 1,
    marginRight: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  actionEditText: {
    color: colors.text,
    fontSize: 11,
    fontWeight: "600",
  },
  actionDeleteBtn: {
    backgroundColor: colors.dangerBg,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  actionDeleteText: {
    color: colors.danger,
    fontSize: 11,
    fontWeight: "600",
  },

  // Empty state box
  emptyBox: {
    alignItems: "center",
    backgroundColor: colors.bg,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  emptyBoxText: {
    color: colors.muted,
    fontSize: 13,
    textAlign: "center",
  },

  // Bottom return to dashboard button
  backButton: {
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: "center",
    marginTop: 20,
    paddingVertical: 12,
  },
  backButtonText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "600",
  },
});

export default styles;
