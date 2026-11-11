import { StyleSheet } from "react-native";
import { colors, commonStyles } from "./theme";

const styles = StyleSheet.create({
  ...commonStyles,

  // Tab Switcher
  tabsRow: {
    backgroundColor: "#F1F5F9",
    borderRadius: 8,
    flexDirection: "row",
    marginTop: 20,
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
    color: colors.primary,
    fontWeight: "700",
  },

  // Form Section
  formCard: {
    marginTop: 20,
  },
  formTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 8,
  },
  helperText: {
    color: "#94A3B8",
    fontSize: 11,
    marginTop: 4,
  },

  // Custom Dropdown Picker
  dropdownBtn: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 44,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  dropdownBtnDisabled: {
    backgroundColor: colors.bg,
  },
  dropdownText: {
    color: colors.text,
    fontSize: 14,
  },
  dropdownPlaceholder: {
    color: "#94A3B8",
  },
  dropdownArrow: {
    color: colors.muted,
    fontSize: 11,
    marginLeft: 8,
  },
  dropdownMenu: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 4,
    maxHeight: 200,
    zIndex: 100,
  },
  dropdownItem: {
    borderBottomColor: "#F1F5F9",
    borderBottomWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  dropdownItemText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "600",
  },
  dropdownItemSub: {
    color: colors.muted,
    fontSize: 11,
    marginTop: 2,
  },

  // Active Loans List (Tab 2)
  loanListContainer: {
    marginTop: 20,
  },
  emptyBox: {
    alignItems: "center",
    backgroundColor: colors.bg,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 36,
  },
  emptyBoxText: {
    color: colors.muted,
    fontSize: 13,
    textAlign: "center",
  },
  loanCard: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 10,
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
    backgroundColor: colors.amberBg,
    borderColor: colors.amberBorder,
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  statusText: {
    color: colors.amberText,
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
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  actionReturnText: {
    color: colors.greenText,
    fontSize: 12,
    fontWeight: "700",
  },
});

export default styles;
