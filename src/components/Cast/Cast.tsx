import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FlatList, Image, Text, View } from 'react-native';
import { API_URL, MOVIE_URL_DOMAIN } from '../../configs/api.config';
import { cast } from '../../types';


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
        console.log(castList)
        let _counter = [];
        for (let index = 0; index < castList.cast.length; index++) {
            const element = castList.cast[index];
            if (_counter.length == displayLength) break;
            if (element.profile_path) _counter.push(element)
        }

        console.log(_counter)

        this.setState({ sortdisplayCast: _counter })

    }

    renderItem = (item: any) => {
        return <Image style={{ height: 150, width: 100, borderRadius: 10, overflow: "hidden" }} source={{ uri: `${MOVIE_URL_DOMAIN}/${item.item.profile_path}` }} />
    }


    render() {
        const { castList, displayLength } = this.props
        const { sortdisplayCast } = this.state;

        return (
            <View>
                <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 10, justifyContent: "space-evenly" }}>
                    {/* {
                        this.props.castList?.cast?.map((v: cast, index: number) => {
                            if (this.props?.displayLength! >= index) {
                                return  <Image style={{ height: 150, width: 100, borderRadius: 10, overflow: "hidden" }} source={{ uri: `${MOVIE_URL_DOMAIN}/${v.profile_path}` }} />
                            } else { return null }
                        })
                    } */}

                    <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 10, justifyContent: "space-evenly" }}>
                        <FlatList
                            data={sortdisplayCast}
                            renderItem={this.renderItem}
                            numColumns={3}
                            contentContainerStyle={{ gap: 20 }}
                            columnWrapperStyle={{ gap: 20 }}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

export default Cast;