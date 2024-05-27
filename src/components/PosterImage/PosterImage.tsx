import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Dimensions, Image, Text, View } from 'react-native';


interface PropsPosterImage { }
interface StatePosterImage {
    width: any;
    height: any
}


class PosterImage extends PureComponent<PropsPosterImage, StatePosterImage> {
    constructor(props: PropsPosterImage) {
        super(props);
        this.state = {
            width: 0,
            height: 0
        }
        this.loadImage()
    }

    loadImage = () => {
        Image.getSize("https://image.tmdb.org/t/p/w500/hU1Q9YVzdYhokr8a9gLywnSUMlN.jpg", (srcWidth, srcHeight) => {
            const maxHeight = Dimensions.get('window').height; 
            const maxWidth = Dimensions.get('window').width;
            const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
            this.setState({ width: srcWidth * ratio, height: srcHeight * ratio });
        }, error => {
            console.log('error:', error);
        });
    }

    render() {
        const { height, width } = this.state
        return (
            <View>
                {/* <Text>{JSON.stringify(this.state)}</Text> */}
                <Image 
                 style={{
                    width:width-40,
                    height,
                    overflow: "hidden",
                    borderRadius:5
                }}
                resizeMode='cover'
                source={{ uri: "https://image.tmdb.org/t/p/w500/hU1Q9YVzdYhokr8a9gLywnSUMlN.jpg" }} />
            </View>
        );
    }
}


export default PosterImage;