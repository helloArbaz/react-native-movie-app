import { StyleSheet, View } from "react-native";

const Base = () => {
    return (
        <View>
        <View style={styles.badgeRibbonCircle} />
        <View style={styles.badgeRibbonNeg140} />
        <View style={styles.badgeRibbon140} />
        {/* <Text>hello</Text> */}
      </View>
    );
};

let styles = StyleSheet.create({
    badgeRibbonCircle: {
        width: 100,
        height: 100,
        backgroundColor: "red",
        borderRadius: 50,
      },
      badgeRibbon140: {
        backgroundColor: "transparent",
        borderBottomWidth: 70,
        borderBottomColor: "red",
        borderLeftWidth: 40,
        borderLeftColor: "transparent",
        borderRightWidth: 40,
        borderRightColor: "transparent",
        position: "absolute",
        top: 70,
        right: -10,
        transform: [{ rotate: "140deg" }],
      },
      badgeRibbonNeg140: {
        backgroundColor: "transparent",
        borderBottomWidth: 70,
        borderBottomColor: "red",
        borderLeftWidth: 40,
        borderLeftColor: "transparent",
        borderRightWidth: 40,
        borderRightColor: "transparent",
        position: "absolute",
        top: 70,
        left: -10,
        transform: [{ rotate: "-140deg" }],
      },
});


export {
    Base
}