import { StyleSheet } from "react-native";

const DrawerStyle = StyleSheet.create({
  drawerContainer: {
    flex: 1,
  },

  drawerHeader: {
    backgroundColor: "#087E75",
    paddingTop: 40,
    paddingBottom: 30,
    paddingHorizontal: 20,
    marginBottom: 10,
  },

  logo: {
    fontSize: 30,
  },

  appName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 10,
  },

  appDescription: {
    fontSize: 13,
    color: "#DFF1EC",
    marginTop: 4,
  },

  logoutContainer: {
    marginTop: "auto",
  },

  logoutText: {
    color: "#C34A3C",
  },

  headerStyle: {
    backgroundColor: "#087E75",
  },

  headerTitleStyle: {
    fontWeight: "bold",
  },

  drawerStyle: {
    width: 280,
  },
});

export default DrawerStyle;
