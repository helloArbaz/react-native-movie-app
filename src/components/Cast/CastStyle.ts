import { StyleSheet, Platform } from 'react-native';
export default StyleSheet.create({
    image:{
        height: 150, width: 100, borderRadius: 10, overflow: "hidden"
    },
    container:{
        display:"flex",
        flexDirection:"row",
        flexWrap:"wrap",
        justifyContent:"space-evenly",
        gap:10
    }
});

