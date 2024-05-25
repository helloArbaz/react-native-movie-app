import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView, SafeAreaViewBase, Text, Touchable, TouchableOpacity, View } from 'react-native';
import { NavigationProp } from '@react-navigation/native';



interface PropsAppLanding {
    navigation?: NavigationProp<any>
}
interface StateAppLanding { }

class AppLanding extends Component<PropsAppLanding, StateAppLanding> {

    constructor(props: PropsAppLanding) {
        super(props);
        this.state = {}
    }

    navigate = () => {
        this.props.navigation?.navigate("movie-details")
    }


    render() {
        return (
            <SafeAreaView>
                <View style={{ marginTop: 50 }}>
                    <TouchableOpacity onPress={() => this.navigate()}>
                        <Text>{JSON.stringify(this.props)}</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}


export default AppLanding;