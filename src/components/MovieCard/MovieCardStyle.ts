import { StyleSheet, Platform, Dimensions } from 'react-native';
export default StyleSheet.create({
    wrapper: {
        width: Dimensions.get("screen").width/2-12,
        backgroundColor: 'black',
        margin: 6,
        borderRadius: 4,
        overflow: "hidden"
    },
    rating: {
        position: "absolute",
        top: 10,
        right: 10,
        backgroundColor: 'rgba(17, 17, 17, 0.766)',
        justifyContent: "center",
        display: "flex",
        alignItems: 'center',
        flexDirection: "column",
        paddingRight: 10,
        paddingLeft: 10,
        paddingBottom: 5,
        paddingTop: 5,
        borderRadius: 5,
    },
    ratingText: {
        color: "white",
        fontSize: 10,
        fontWeight: "bold"
    },
    genreContainer: {
        position: "absolute",
        bottom: 0,
        backgroundColor: 'rgba(17, 17, 17, 0.684)',
        justifyContent: "flex-start",
        display: "flex",
        width: "100%",
        textAlign: "left",
        flexDirection: "column",
        padding: 5,
        alignItems:"center"
    },
    genreText: {
        color: "white",
        fontSize: 10,
        fontWeight: "300",
        textAlign: "center"
    },
    movieNameContainer: {
        marginBottom: 10,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        width: '95%'
    },
    movieName: {
        fontSize: 12,
        color: "white",
        fontWeight: "800",
    },
    yearText: {
        fontSize: 10,
        color: "white",
        marginTop: 5
    },
    ratingStart: {
        color: '#fcbd28',
        marginRight: 2,
        fontSize: 10
    },
    movieInfo: {
        padding: 10
    }
});

