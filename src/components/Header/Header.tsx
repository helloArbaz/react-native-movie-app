import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, Keyboard, ScrollView, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';

import HeaderStyle from "./HeaderStyle"
import { GET_FILTER_MAPPER } from '../../helpers/getGenreFilter';
import { movieGenre } from '../../types';
import SearchBar from '../SearchBar/SearchBar';
import { Feather, Entypo } from "@expo/vector-icons";



interface PropsHeader { }

interface StateHeader {
    _showSearchBar: boolean;
    _searchValue: string
}


class Header extends Component<PropsHeader, StateHeader> {

    constructor(props: PropsHeader) {
        super(props)
        this.state = {
            _showSearchBar: false,
            _searchValue: ''
        }
    }

    setSearchBarVisibility = () => {
        this.setState({ _showSearchBar: !this.state._showSearchBar })
    }

    setSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ _searchValue: event.target.value })
    }

    getGenreFilter = (): any[] => {
        let _result: any = []
        Object.keys(GET_FILTER_MAPPER).map((val: any, i: number) => {
            _result.push(GET_FILTER_MAPPER[val].name)
        })
        return _result
    }


    render() {
        const { _showSearchBar } = this.state;
        return (
            <View style={HeaderStyle.headerWrapper}>
                <View style={HeaderStyle.logoWrapper}>
                    {
                        !_showSearchBar && <Image style={{ height: 35, width: 124 }} source={require('../Header/logo.png')} />
                    }
                    {
                        !_showSearchBar &&
                        <TouchableOpacity activeOpacity={1}>
                            <Feather
                                onPress={() => this.setSearchBarVisibility()}
                                name="search"
                                size={25}
                                color="#F0283C"
                                style={{ marginRight: 10 }}
                            />
                        </TouchableOpacity>
                    }

                    {_showSearchBar && <SearchBar setSearchBarVisibility={this.setSearchBarVisibility} />}

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