import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dimensions, Image, Text, View } from 'react-native';
import MovieCardStyle from "./MovieCardStyle"

import { Feather, Entypo } from "@expo/vector-icons";
import Loading from '../Loading/Loading';



interface PropsMovieCard { }
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
        // Image.getSize("https://image.tmdb.org/t/p/w500//nNxK3pC3DMpPpWKMvo2p3liREVT.jpg", (width, height) => { this.setState({ width: width * (height / width), height }) });
        Image.getSize("https://image.tmdb.org/t/p/w500/xT98tLqatZPQApyRmlPL12LtiWp.jpg", (srcWidth, srcHeight) => {
            const maxHeight = Dimensions.get('window').height; // or something else
            const maxWidth = Dimensions.get('window').width;

            const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
            this.setState({ width: srcWidth * ratio, height: srcHeight * ratio * 0.5 });
        }, error => {
            console.log('error:', error);
        });
    }

    render() {
        const win = Dimensions.get('window');
        const { height, width } = this.state;

        if (!height && !width) {
            return null
        }
        
        let movieNameColl = ['sdfsdasdas asdasd sadasd asdasd asdfsddf', 'sdf', '2432432423423', '2343243242342342343', '324324wdfsdfsdfdf', "sdweewwrerwef3rweasfdsdas", "dfdsf sdfsd fsdfsd", "dwerwersdasdfasdf dsfds"]
        let movieName = movieNameColl[Math.floor(Math.random() * (movieNameColl.length - 1 - 0 + 1)) + 0]


        return (
            <View>
                <View style={MovieCardStyle.wrapper}>
                    <Image
                        resizeMode="cover"
                        source={{ uri: 'https://image.tmdb.org/t/p/w500/xT98tLqatZPQApyRmlPL12LtiWp.jpg' }}
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
                            <Text style={MovieCardStyle.ratingText}>4</Text>
                        </View>
                    </View>

                    <View style={MovieCardStyle.genreContainer}>
                        <Text style={[MovieCardStyle.genreText,{color:"white",fontWeight:"500"}]}>Action | Drama | Science Froction | Science Froction</Text>
                    </View>
                </View>
                {/* <View style={[MovieCardStyle.movieInfo, { width: win.width / 2 - 10 }]}>  
                    <Text style={{ color: "white", fontWeight: "bold", fontSize: 12, textAlign: "left", flexShrink: 1 }}>{movieName}</Text>
                    <View style={{ marginTop:10, justifyContent: "space-between", flexDirection: "row" }}>
                        <Text style={{ color: "yellow", fontWeight: "300", fontSize: 10 }}>2014</Text>
                        <Text style={{ color: "yellow", fontWeight: "300", fontSize: 10 }}>English</Text>
                    </View>
                </View> */}

            </View>
        );
    }
}


export default MovieCard;