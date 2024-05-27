import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dimensions, Image, Text, View } from 'react-native';
import MovieCardStyle from "./MovieCardStyle"

import { Feather, Entypo } from "@expo/vector-icons";
import Loading from '../Loading/Loading';
import { movieGenre, movieListData } from '../../types';
import { API_URL, MOVIE_URL_DOMAIN } from '../../configs/api.config';
import { genreFilterById, genreNameOnly } from '../../helpers/getGenreFilter';



interface PropsMovieCard {
    movieData: movieListData
}
interface StateMovieCard {
    width: any;
    height: any
}


class MovieCard extends Component<PropsMovieCard, StateMovieCard> {
    constructor(props: PropsMovieCard) {
        super(props);
        this.state = {
            height: '',
            width: ''
        }
    }

    componentDidMount(): void {
        this.loadImageProps()
    }

    loadImageProps = () => {
        const { movieData } = this.props
        Image.getSize(String(`${MOVIE_URL_DOMAIN}${movieData.poster_path}`), (srcWidth, srcHeight) => {
            const maxHeight = Dimensions.get('window').height; // or something else
            const maxWidth = Dimensions.get('window').width;

            const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
            this.setState({ width: srcWidth * ratio, height: srcHeight * ratio * 0.5 });
        }, error => {
            console.log('error:', error);
        });
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

    render() {
        const { height, width } = this.state;
        if (!height && !width) {
            return null
        }

        const { movieData } = this.props
        if (!movieData) { return null }
        return (
            <View>
                <View style={MovieCardStyle.wrapper}>
                    <Image
                        resizeMode="cover"
                        source={{ uri: `${MOVIE_URL_DOMAIN}${movieData.poster_path}` }}
                        style={{
                            width: null, height,
                            overflow: "hidden",
                            borderRadius: 4
                        }} />
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
                        <Text style={[MovieCardStyle.genreText, { color: "white", fontWeight: "500",fontSize:12 }]}>
                            {this.getGenreList()}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}


export default MovieCard;