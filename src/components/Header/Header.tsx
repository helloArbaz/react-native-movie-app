import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, ScrollView, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';

import HeaderStyle from "./HeaderStyle"
import { GET_FILTER_MAPPER } from '../../helpers/getGenreFilter';
import { movieGenre } from '../../types';

interface PropsHeader { }
interface StateHeader { }
class Header extends Component<PropsHeader, StateHeader> {

    constructor(props: PropsHeader) {
        super(props)
        this.state = {}
    }

    getGenreFilter = (): any[] => {
        let _result: any = []
        Object.keys(GET_FILTER_MAPPER).map((val: any, i: number) => {
            _result.push(GET_FILTER_MAPPER[val].name)
        })
        return _result
    }


    render() {
        return (
            <View style={HeaderStyle.headerWrapper}>
                <View style={HeaderStyle.logoWrapper}>
                    <Image style={{ height: 35, width: 124 }} source={require('../Header/logo.png')} />
                    <Text>Search</Text>
                </View>
                <View style={HeaderStyle.filterWrapper}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {
                            [...this.getGenreFilter()].map((val: any, index: number) => {
                                return <TouchableOpacity style={HeaderStyle.genreFilter}>
                                    <Text style={{ color: "white" }}>{val}</Text>
                                </TouchableOpacity>
                            })
                        }
                    </ScrollView>
                </View>
            </View>
        );
    }
}

export default Header;