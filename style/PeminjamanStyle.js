import { StyleSheet } from "react-native";

const colors = {
  background: "#F4F4F4",
  border: "#CCCCCC",
  green: "#176B5B",
  muted: "#666666",
  text: "#222222",
  white: "#FFFFFF",
  red: "#A12B20",
};

const styles = StyleSheet.create({
  screen: { backgroundColor: colors.background, flex: 1 },
  content: {
    alignSelf: "center",
    maxWidth: 1040,
    padding: 16,
    paddingBottom: 28,
    width: "100%",
  },
  pageHeader: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    marginBottom: 14,
    paddingBottom: 12,
  },
  title: { color: colors.text, fontSize: 22, fontWeight: "600" },
  subtitle: { color: colors.muted, fontSize: 13, marginTop: 5 },
  list: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderWidth: 1,
    paddingHorizontal: 14,
  },
  loanRow: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    paddingVertical: 14,
  },
  loanRowLast: { borderBottomWidth: 0 },
  rowHeading: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  borrower: { color: colors.text, flex: 1, fontSize: 15, fontWeight: "600" },
  status: { color: colors.green, fontSize: 12, fontWeight: "600" },
  detail: { color: colors.muted, fontSize: 13, marginTop: 5 },
  messageBox: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderWidth: 1,
    minHeight: 110,
    justifyContent: "center",
    padding: 18,
  },
  messageText: { color: colors.muted, fontSize: 13, marginTop: 8, textAlign: "center" },
  error: { color: colors.red, fontSize: 13, marginBottom: 12 },
});

export default styles;
