import { StyleSheet } from "react-native";
import { colors } from "./theme";

const DrawerStyle = StyleSheet.create({
  app: {
    backgroundColor: colors.bg,
    flex: 1,
  },
  loadingContainer: {
    alignItems: "center",
    backgroundColor: colors.bg,
    flex: 1,
    justifyContent: "center",
  },
  appHeader: {
    alignItems: "center",
    backgroundColor: colors.darkHeader,
    flexDirection: "row",
    height: 52,
    paddingHorizontal: 16,
    zIndex: 10,
  },
  menuButton: {
    alignItems: "center",
    height: 38,
    justifyContent: "center",
    width: 38,
  },
  menuButtonText: {
    color: colors.white,
    fontSize: 22,
    lineHeight: 26,
  },
  appHeaderText: {
    flex: 1,
    marginLeft: 10,
  },
  appTitle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  logoutError: {
    backgroundColor: colors.dangerBg,
    color: colors.danger,
    fontSize: 13,
    padding: 10,
    textAlign: "center",
  },
  drawerOverlay: {
    backgroundColor: "rgba(15, 23, 42, 0.5)",
    flex: 1,
    flexDirection: "row",
  },
  drawerBackdrop: {
    flex: 1,
  },
  drawerPanel: {
    backgroundColor: colors.white,
    borderRightColor: colors.border,
    borderRightWidth: 1,
    maxWidth: "85%",
    width: 280,
  },
  drawerContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
  drawerHeader: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    marginBottom: 12,
    paddingBottom: 16,
    paddingTop: 8,
  },
  drawerTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "700",
  },
  drawerSubtitle: {
    color: colors.muted,
    fontSize: 12,
    marginTop: 4,
  },
  drawerItem: {
    alignItems: "center",
    borderRadius: 8,
    flexDirection: "row",
    marginBottom: 4,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  drawerItemActive: {
    backgroundColor: colors.blueBg,
  },
  drawerItemIcon: {
    fontSize: 16,
    marginRight: 12,
  },
  drawerItemText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "500",
  },
  drawerItemTextActive: {
    color: colors.primary,
    fontWeight: "700",
  },
  logoutContainer: {
    borderTopColor: colors.border,
    borderTopWidth: 1,
    marginTop: "auto",
    paddingTop: 12,
  },
  logoutButton: {
    alignItems: "center",
    borderRadius: 8,
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  logoutText: {
    color: colors.danger,
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 10,
  },
});

export default DrawerStyle;
