import { StyleSheet } from "react-native";
import { colors } from "./theme";

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.bg,
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 32,
  },
  homeContainer: {
    alignSelf: "center",
    maxWidth: 1140,
    padding: 16,
    width: "100%",
  },

  // Hero Card Banner (Image 1)
  heroBanner: {
    backgroundColor: colors.darkHeader,
    borderRadius: 16,
    marginBottom: 14,
    padding: 24,
  },
  heroBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  heroBadgeText: {
    color: "#E2E8F0",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  heroTitle: {
    color: colors.white,
    fontSize: 24,
    fontWeight: "700",
    marginTop: 12,
  },
  heroSubtitle: {
    color: "#94A3B8",
    fontSize: 13,
    marginTop: 4,
  },
  heroStatusRow: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 20,
  },
  heroStatusDot: {
    color: colors.green,
    fontSize: 10,
    marginRight: 6,
  },
  heroStatusText: {
    color: "#94A3B8",
    fontSize: 12,
  },
  heroStatusHighlight: {
    color: colors.green,
    fontWeight: "700",
  },

  // Quick Action Navigation Buttons
  quickActionsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 14,
  },
  quickActionsRowCompact: {
    flexDirection: "column",
  },
  quickActionBtn: {
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    minHeight: 44,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  quickActionPinjam: {
    backgroundColor: colors.blueBg,
    borderColor: colors.blueBorder,
  },
  quickActionKembalikan: {
    backgroundColor: colors.greenBg,
    borderColor: colors.greenBorder,
  },
  quickActionDataAlat: {
    backgroundColor: colors.bg,
    borderColor: colors.border,
  },
  quickActionPinjamText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "600",
    marginLeft: 6,
  },
  quickActionKembalikanText: {
    color: colors.greenText,
    fontSize: 13,
    fontWeight: "600",
    marginLeft: 6,
  },
  quickActionDataAlatText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "600",
    marginLeft: 6,
  },

  // 4 Metric / Stat Cards
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 14,
  },
  statCard: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: 12,
    borderTopWidth: 2,
    borderWidth: 1,
    flexBasis: "48%",
    flexGrow: 1,
    minHeight: 110,
    minWidth: 240,
    padding: 16,
  },
  statCardBlue: {
    borderTopColor: colors.primary,
  },
  statCardAmber: {
    borderTopColor: colors.amber,
  },
  statCardGreen: {
    borderTopColor: colors.green,
  },
  statCardPurple: {
    borderTopColor: colors.purple,
  },
  statHeaderRow: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 10,
  },
  statIcon: {
    fontSize: 15,
    marginRight: 6,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  statLabelBlue: {
    color: colors.muted,
  },
  statLabelAmber: {
    color: colors.amberText,
  },
  statLabelGreen: {
    color: colors.greenText,
  },
  statLabelPurple: {
    color: colors.purpleText,
  },
  statValue: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 4,
  },
  statValueBlue: {
    color: colors.primary,
  },
  statValueAmber: {
    color: colors.amberText,
  },
  statValueGreen: {
    color: colors.greenText,
  },
  statValuePurple: {
    color: colors.purpleText,
  },
  statSubtitle: {
    color: colors.muted,
    fontSize: 12,
  },

  // Aktivitas Terbaru Card
  activityCard: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    padding: 20,
  },
  activityHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  activityTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "700",
  },
  realtimeBadge: {
    alignItems: "center",
    backgroundColor: colors.greenBg,
    borderColor: colors.greenBorder,
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  realtimeDot: {
    color: colors.greenText,
    fontSize: 9,
    marginRight: 5,
  },
  realtimeText: {
    color: colors.greenText,
    fontSize: 11,
    fontWeight: "700",
  },
  emptyActivityBox: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 36,
  },
  emptyActivityIconWrap: {
    alignItems: "center",
    backgroundColor: colors.bg,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    height: 48,
    justifyContent: "center",
    marginBottom: 12,
    width: 48,
  },
  emptyActivityIcon: {
    fontSize: 22,
  },
  emptyActivityTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 6,
  },
  emptyActivityDesc: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19,
    maxWidth: 420,
    textAlign: "center",
  },
  activityList: {
    marginTop: 4,
  },
  activityItem: {
    alignItems: "center",
    borderBottomColor: "#F1F5F9",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  activityItemText: {
    color: colors.text,
    flex: 1,
    fontSize: 13,
    marginRight: 10,
  },
  activityItemTime: {
    color: colors.muted,
    fontSize: 11,
  },

  // Login Screen Styles
  loginScroll: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  loginContainer: {
    alignSelf: "center",
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    maxWidth: 440,
    padding: 24,
    width: "100%",
  },
  brandMark: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 8,
    height: 48,
    justifyContent: "center",
    marginBottom: 16,
    width: 48,
  },
  brandMarkText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "700",
  },
  eyebrow: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  loginTitle: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "700",
    marginTop: 6,
  },
  loginSubtitle: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 6,
  },
  form: {
    marginTop: 20,
  },
  inputLabel: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 14,
  },
  input: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    color: colors.text,
    fontSize: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  passwordField: {
    alignItems: "center",
    flexDirection: "row",
  },
  passwordInput: {
    flex: 1,
  },
  passwordToggle: {
    marginLeft: 8,
    paddingVertical: 10,
  },
  passwordToggleText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "600",
  },
  primaryButton: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 8,
    marginTop: 20,
    paddingVertical: 12,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "600",
  },
  primaryButtonDisabled: {
    opacity: 0.6,
  },
  errorText: {
    color: colors.danger,
    fontSize: 13,
    marginTop: 10,
  },
  helperText: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 16,
  },
});

export default styles;
