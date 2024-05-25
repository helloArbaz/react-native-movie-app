import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


interface PropsMovieDetails { }
interface StateMovieDetails { }

class MovieDetails extends Component<PropsMovieDetails, StateMovieDetails> {

    constructor(props: PropsMovieDetails) {
        super(props);
        this.state = {}
    }

    render() {
        return (
                <View>
                    <Text>MovieDetails</Text>
                </View>
        );
    }
}


export default MovieDetails;