import { StyleSheet } from "react-native";

const colors = {
  background: "#F4F4F4",
  border: "#CCCCCC",
  green: "#176B5B",
  muted: "#666666",
  text: "#222222",
  white: "#FFFFFF",
};

const DrawerStyle = StyleSheet.create({
  app: { backgroundColor: colors.background, flex: 1 },
  loadingContainer: {
    alignItems: "center",
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: "center",
  },
  appHeader: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    flexDirection: "row",
    gap: 8,
    minHeight: 54,
    paddingHorizontal: 12,
  },
  appHeaderText: { flex: 1, minWidth: 0 },
  appTitle: { color: colors.text, fontSize: 16, fontWeight: "600" },
  appSubtitle: { color: colors.muted, fontSize: 12, marginTop: 2 },
  menuButton: {
    alignItems: "center",
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  menuButtonText: { color: colors.text, fontSize: 24, lineHeight: 29 },
  logoutError: {
    backgroundColor: "#FCEAE8",
    color: "#A12B20",
    padding: 10,
    textAlign: "center",
  },
  drawerOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    flex: 1,
    flexDirection: "row",
  },
  drawerBackdrop: { flex: 1 },
  drawerPanel: {
    backgroundColor: colors.white,
    borderRightColor: colors.border,
    borderRightWidth: 1,
    width: 260,
  },
  drawerContent: { flex: 1, paddingHorizontal: 12, paddingVertical: 10 },
  drawerHeader: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    marginBottom: 8,
    paddingBottom: 12,
    paddingTop: 6,
  },
  drawerTitle: { color: colors.text, fontSize: 17, fontWeight: "600" },
  drawerSubtitle: { color: colors.muted, fontSize: 12, marginTop: 4 },
  drawerItem: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    marginBottom: 0,
    paddingHorizontal: 10,
    paddingVertical: 13,
  },
  drawerItemActive: { backgroundColor: "#EEEEEE" },
  drawerItemText: { color: colors.text, fontSize: 14 },
  drawerItemTextActive: { color: colors.green, fontWeight: "600" },
  logoutContainer: {
    borderTopColor: colors.border,
    borderTopWidth: 1,
    marginTop: "auto",
    paddingTop: 8,
  },
  logoutText: { color: "#A12B20", fontSize: 14 },
});

export default DrawerStyle;
