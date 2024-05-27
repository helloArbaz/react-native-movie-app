import React, { Component, useDebugValue } from 'react';
import PropTypes from 'prop-types';
import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PosterImage from '../../components/PosterImage/PosterImage';


interface PropsMovieDetails { }
interface StateMovieDetails { }

class MovieDetails extends Component<PropsMovieDetails, StateMovieDetails> {

    data = {
        "adult": false,
        "backdrop_path": "/fY3lD0jM5AoHJMunjGWqJ0hRteI.jpg",
        "genre_ids": [878, 27, 28],
        "id": 940721,
        "original_language": "ja",
        "original_title": "ゴジラ-1.0",
        "overview": "Postwar Japan is at its lowest point when a new crisis emerges in the form of a giant monster, baptized in the horrific power of the atomic bomb.",
        "popularity": 1273.455,
        "poster_path": "/hkxxMIGaiCTmrEArK7J56JTKUlB.jpg",
        "release_date": "2023-11-03",
        "title": "Godzilla Minus One",
        "video": false,
        "vote_average": 7.67,
        "vote_count": 1155
    }

    constructor(props: PropsMovieDetails) {
        super(props);
        this.state = {}
    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <PosterImage />
                </ScrollView>
            </View>
        );
    }
}


export default MovieDetails;