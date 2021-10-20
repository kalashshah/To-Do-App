import { StyleSheet } from "react-native";

export default  StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    width: "100%",
    padding: 10,
    alignItems: "center",
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#404040",
    borderRadius: 10,
    marginRight: 10,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    marginRight: 5,
    fontSize: 22,
  },
  time: {
    color: "grey",
  },
});
