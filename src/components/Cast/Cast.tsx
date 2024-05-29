import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FlatList, Image, Text, View } from 'react-native';
import { API_URL, MOVIE_URL_DOMAIN } from '../../configs/api.config';
import { cast } from '../../types';
import CastStyle from './CastStyle';


interface PropsCast {
    castList?: any
    displayLength?: number,
}

interface StateCast {
    sortdisplayCast: cast[]
}

class Cast extends PureComponent<PropsCast, StateCast> {
    constructor(props: PropsCast) {
        super(props);
        this.state = {
            sortdisplayCast: []
        }

    }

    componentDidMount(): void {
        let { castList, displayLength } = this.props
        let _counter = [];
        for (let index = 0; index < castList?.cast?.length; index++) {
            const element = castList?.cast[index];
            if (_counter.length == displayLength) break;
            if (element?.profile_path) _counter.push(element)
        }
        this.setState({ sortdisplayCast: _counter })
    }

    renderItem = (item: any) => {
        return <Image style={CastStyle.image} source={{ uri: `${MOVIE_URL_DOMAIN}/${item.item.profile_path}` }} />
    }


    render() {
        const { castList, displayLength } = this.props
        const { sortdisplayCast } = this.state;

        return (
            <FlatList
                data={sortdisplayCast}
                renderItem={this.renderItem}
                numColumns={3}
                contentContainerStyle={{ gap: 20 }}
                columnWrapperStyle={{ gap: 20 }}
            />
        );
    }
}

export default Cast;