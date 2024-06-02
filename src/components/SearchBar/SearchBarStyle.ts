import { StyleSheet, Platform } from 'react-native';


export default StyleSheet.create({
    container: {
      margin: 15,
      justifyContent: "flex-start",
      alignItems: "center",
      flexDirection: "row",
      width: "90%",
      marginBottom:0
  
    },
   parentContainer:{
    display: "flex", justifyContent: 'space-between', gap: 10, flexDirection: "row", alignItems: 'center' 
   },
   txtWrapper:{
    width: "75%", borderWidth: 1, borderColor: 'white', paddingLeft: 10, paddingRight: 10, borderRadius: 10 
   },
   cancel:{
    color: "#F0283C", fontWeight: "bold", fontSize: 15 
   }
  });