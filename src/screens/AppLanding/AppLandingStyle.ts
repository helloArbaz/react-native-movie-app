import { StyleSheet, Platform } from 'react-native';
export default StyleSheet.create({
    droidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 25 : 0,
        backgroundColor: 'black'
    },
    selectionListHeader:{
        width: 60, backgroundColor: 'rgba(17, 17, 17, 0.766)', borderBottomRightRadius: 5, borderTopRightRadius: 5 
    }
});

