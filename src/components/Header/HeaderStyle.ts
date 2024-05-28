import { StyleSheet, Platform } from 'react-native';
export default StyleSheet.create({
    headerWrapper: {},
    logoWrapper:{
        backgroundColor:'#242424',
        padding:10,
        display:'flex',
        justifyContent:"space-between",
        flexDirection:"row",
        alignItems:'center'
    },
    filterWrapper:{
        paddingTop:10,
        paddingBottom:15,
        paddingLeft:10,
        paddingRight:10,
        backgroundColor:'#242424',
        // borderRadius:10
    },
    genreFilter:{
        paddingTop:6,
        paddingBottom:6,
        paddingLeft:12,
        paddingRight:12,
        backgroundColor:'#F0283C',
        color:"white",
        fontSize:14,
        fontWeight:600,
        margin:8,
        cursor:"pointer",
        borderRadius:4
    }
});

