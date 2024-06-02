import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Image, Dimensions, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import MovieCardStyle from "./MovieCardStyle"

import { Entypo } from "@expo/vector-icons";
import { movieGenre, movieListData } from '../../types';
import { MOVIE_URL_DOMAIN } from '../../configs/api.config';
import { genreFilterById, genreNameOnly } from '../../helpers/getGenreFilter';
import { Image as ExpoImage } from "expo-image"



interface PropsMovieCard {
    movieData: movieListData
    navigateMobileDetails: any,
    showImage: boolean,

}

interface StateMovieCard {
    width: any;
    height: any;

}

class MovieCard extends PureComponent<PropsMovieCard, StateMovieCard> {
    constructor(props: PropsMovieCard) {
        super(props);
        this.state = {
            height: '',
            width: '',
        }
    }

    componentDidMount(): void {
        this.loadImageProps()
    }

    loadImageProps = () => {
        const { movieData } = this.props
        Image.getSize(String(`${MOVIE_URL_DOMAIN}${movieData.poster_path}`), (srcWidth, srcHeight) => {
            const maxHeight = Dimensions.get('window').height;
            const maxWidth = Dimensions.get('window').width;

            const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
            this.setState({ width: srcWidth * ratio, height: srcHeight * ratio * 0.5 });
        }, error => { });
    }

    getGenreList = () => {
        const { movieData } = this.props
        if (movieData.genre_ids) { }
        let _result = [];
        for (let index = 0; index < movieData?.genre_ids.length; index++) {
            let element: movieGenre = movieData?.genre_ids[index]
            genreFilterById(String(element))
            _result.push(genreNameOnly(String(element)))
        }
        return _result.join("  |  ")
    }

    navigateMobileDetails = (data?: any) => this.props.navigateMobileDetails(data)

    render() {
        const { height, width } = this.state;
        const { movieData } = this.props
        if (!movieData) { return null }

        return (
            <TouchableOpacity activeOpacity={0.5} onPress={() => this.navigateMobileDetails(movieData)}>
                <View style={MovieCardStyle.wrapper}>
                    {
                        this.props.showImage ? (
                            <Image
                                resizeMode="cover"
                                source={{ uri: `${MOVIE_URL_DOMAIN}${movieData.poster_path}` }}
                                blurRadius={this.props.showImage ? 0 : 6}
                                style={{
                                    width: null,
                                    height: (height),
                                    overflow: "hidden",
                                    borderRadius: 4
                                }}
                            />
                        ) : (
                            <View style={{ display: "flex", justifyContent: 'center', alignItems: 'center', height: 295 }}>
                                <ActivityIndicator size={20} color={"#F0283C"} />
                            </View>
                        )
                    }


                    <View style={MovieCardStyle.rating}>
                        <View style={{ display: 'flex', flexDirection: "row" }}>
                            <Entypo
                                name="star"
                                size={12}
                                style={MovieCardStyle.ratingStart}
                            />
                            <Text style={MovieCardStyle.ratingText}>{Math.ceil(parseInt(String(movieData.vote_average)))}</Text>
                        </View>
                    </View>

                    <View style={[MovieCardStyle.genreContainer]}>
                        <Text style={[MovieCardStyle.genreText, { color: "white", fontWeight: "500", fontSize: 12 }]}>
                            {this.getGenreList()}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}


export default MovieCard;