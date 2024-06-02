import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Dimensions, Image, Text, View } from 'react-native';
import { MOVIE_URL_DOMAIN } from '../../configs/api.config';


interface PropsPosterImage {
    url: string
}
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
        const { url } = this.props
        Image.getSize(`${MOVIE_URL_DOMAIN}${url}`, (srcWidth, srcHeight) => {
            const maxHeight = Dimensions.get('window').height; 
            const maxWidth = Dimensions.get('window').width;
            const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
            this.setState({ width: srcWidth * ratio, height: srcHeight * ratio });
        }, error => {});
    }

    render() {
        const { height, width } = this.state
        const { url } = this.props
        return (
            <View>
                <Image 
                 style={{
                    width:Dimensions.get("screen").width-10,
                    height:(height || 200),
                    overflow: "hidden",
                    borderTopLeftRadius:10,
                    borderTopRightRadius:10,
                    borderBottomLeftRadius:30,
                    borderBottomRightRadius:30,
                    borderWidth:0.4,
                    borderColor:'#999999'
                }}
                resizeMode='cover'
                    source={{ uri: `${MOVIE_URL_DOMAIN}${url}` }} />
            </View>
        );
    }
}


export default PosterImage;