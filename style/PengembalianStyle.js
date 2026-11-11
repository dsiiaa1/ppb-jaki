import { StyleSheet } from "react-native";
import { colors, commonStyles } from "./theme";

const styles = StyleSheet.create({
  ...commonStyles,

  // 3 Stat Summary Cards
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
  },
  statsRowCompact: {
    flexDirection: "column",
  },
  statCard: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    minHeight: 76,
    padding: 16,
  },
  statValue: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 4,
  },
  statValueGreen: {
    color: colors.greenText,
  },
  statValueDanger: {
    color: colors.danger,
  },
  statLabel: {
    color: colors.muted,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  // Tab Switcher
  tabsRow: {
    backgroundColor: "#F1F5F9",
    borderRadius: 8,
    flexDirection: "row",
    marginTop: 16,
    padding: 4,
  },
  tabButton: {
    alignItems: "center",
    borderRadius: 6,
    flex: 1,
    justifyContent: "center",
    paddingVertical: 10,
  },
  tabButtonActive: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderWidth: 1,
  },
  tabText: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "600",
  },
  tabTextActive: {
    color: colors.greenText,
    fontWeight: "700",
  },

  // Search Input
  searchContainer: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    marginTop: 16,
    paddingHorizontal: 12,
  },
  searchIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  searchInput: {
    color: colors.text,
    flex: 1,
    fontSize: 13,
    paddingVertical: 10,
  },

  // Empty state box
  emptyBox: {
    alignItems: "center",
    backgroundColor: colors.bg,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: "center",
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 44,
  },
  emptyIcon: {
    fontSize: 26,
    marginBottom: 10,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 6,
  },
  emptySubtitle: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19,
    maxWidth: 420,
    textAlign: "center",
  },

  // Loan item card
  loanCard: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 12,
    padding: 16,
  },
  loanCardHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  borrowerName: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "700",
  },
  statusBadge: {
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  statusBadgeNormal: {
    backgroundColor: colors.greenBg,
    borderColor: colors.greenBorder,
  },
  statusBadgeOverdue: {
    backgroundColor: colors.dangerBg,
    borderColor: colors.dangerBorder,
  },
  statusTextNormal: {
    color: colors.greenText,
    fontSize: 11,
    fontWeight: "700",
  },
  statusTextOverdue: {
    color: colors.danger,
    fontSize: 11,
    fontWeight: "700",
  },
  loanDetailRow: {
    color: colors.muted,
    fontSize: 13,
    marginTop: 4,
  },
  loanDetailBold: {
    color: colors.text,
    fontWeight: "600",
  },
  actionReturnBtn: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: colors.greenBg,
    borderColor: colors.greenBorder,
    borderRadius: 6,
    borderWidth: 1,
    marginTop: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  actionReturnText: {
    color: colors.greenText,
    fontSize: 13,
    fontWeight: "700",
  },
});

export default styles;
