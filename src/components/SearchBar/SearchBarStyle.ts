import { StyleSheet, Platform } from 'react-native';


export default StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
    width: "100%",
    justifyContent: "space-between",
    borderRadius: 10,
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5

  },
  parentContainer: {
    display: "flex", justifyContent: 'space-between', gap: 10, flexDirection: "row", alignItems: 'center'
  },
  txtWrapper: {
    width: "100%", borderWidth: 1, borderColor: 'white', paddingLeft: 10, paddingRight: 10, borderRadius: 10
  },
  cancel: {
    color: "#F0283C", fontWeight: "bold", fontSize: 15
  },
  searchParent:{
    width:"90%", height: 35, color: "white", fontWeight: "400"
  }
});