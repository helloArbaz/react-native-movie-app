import { StyleSheet, Platform } from 'react-native';
export default StyleSheet.create({
    droidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 25 : 0,
        backgroundColor: 'black'
    },
    posterWrapper: {
        display: 'flex',
        justifyContent: "center",
        alignItems: 'center',
    },
    movieWrapper: {
        width: "100%",
        position: "absolute",
        padding: 12,
        paddingRight: 25,
        paddingLeft: 25,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.732)'
    },
    movieWrapperParent: {
        width: "70%", display: "flex", flexDirection: "column",
    },
    movieTitle: {
        color: 'white', fontSize: 20, fontWeight: "bold", textAlign: "left",
    },
    ratingWrapper: {
        display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "flex-end", width: "30%",
    },
    votinText: {
        color: "white",
        fontSize: 12,
        fontWeight: "bold"
    },
    moviGenreWrapper: {
        display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 10
    },
    genreList: {
        paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, color: "white", borderWidth: 0.5, borderColor: 'white', borderRadius: 5, fontSize: 12, fontWeight: "300"
    },
    movieInfoWrapper:{
        display: "flex", justifyContent: "space-between", flexDirection: "row", padding: 20, borderTopWidth: 0.5, borderTopColor: "white", borderBottomWidth: 0.5, borderBottomColor: "white" 
    },
    movieInfoChild:{
        display: "flex", gap: 10, width: "33.33%", flexDirection: "column", justifyContent: "center", alignItems: "center", alignContent: "center" 
    },
    movieInfoText:{
        color: "white", fontSize: 12
    },
    wrapperForListing:{
        display: "flex", flexDirection: "column", gap: 10 
    },
    languageContainter:{
        display: "flex", flexDirection: "row", gap: 10, flexWrap: "wrap",alignItems:"center"
    },
    pageHeader:{
        color: "white", fontSize: 18, fontWeight: "600"
    },
    paddingRaidusUi:{
        paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, color: "white", borderWidth: 0.5, borderColor: 'white', borderRadius: 5, fontSize: 12, fontWeight: "300"
    },
    movieOverViewText:{
        color: "white", fontSize: 15, fontWeight: "100" 
    },
    productionWrapper:{
        display: "flex", flexDirection: "row", gap: 10, flexWrap: "wrap"
    }

});

