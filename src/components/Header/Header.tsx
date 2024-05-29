import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Image, Keyboard, ScrollView, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';

import HeaderStyle from "./HeaderStyle"
import { GET_FILTER_MAPPER } from '../../helpers/getGenreFilter';
import { movieGenre } from '../../types';
import SearchBar from '../SearchBar/SearchBar';
import { Feather, Entypo } from "@expo/vector-icons";
import { connect } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { changeFilter, searchFilter } from '../../slice/movieAppSlice';



interface PropsHeader {
    selectedFilter?: movieGenre
    changeFilter: (data: movieGenre) => {}
    searchFilter: (query: string) => {}
}

interface StateHeader {
    _showSearchBar: boolean;
    _searchValue: string
}


class Header extends PureComponent<PropsHeader, StateHeader> {

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
        Object.keys(GET_FILTER_MAPPER).map((val: any, i: number) => { _result.push(GET_FILTER_MAPPER[val]) })
        return _result
    }

    changeFilter = (filterVale: movieGenre) => {
        this.props.changeFilter(filterVale)
    }


    render() {
        const { _showSearchBar } = this.state;
        const { selectedFilter } = this.props
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

                    {_showSearchBar && <SearchBar searchFilter={this.props.searchFilter} setSearchBarVisibility={this.setSearchBarVisibility} />}

                </View>
                <View style={HeaderStyle.filterWrapper}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {
                            [...this.getGenreFilter()].map((val: movieGenre, index: number) => {
                                return <TouchableOpacity
                                    key={index}
                                    onPress={() => this.changeFilter(val)}
                                    style={[HeaderStyle.genreFilter,
                                    { backgroundColor: selectedFilter?.id == val.id ? "#F0283C" : "#484848" }
                                    ]}>
                                    <Text
                                        style={{
                                            color: "white",
                                            fontSize: 14,
                                            fontWeight: selectedFilter?.id == val.id ? "600" : "400"

                                        }}>{val.name}</Text>
                                </TouchableOpacity>
                            })
                        }
                    </ScrollView>
                </View>
            </View>
        );
    }
}


const mapStateToProps = (state: RootState) => ({
    selectedFilter: state?.movieApp?.selectedFilter,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    changeFilter: (data: movieGenre) => dispatch(changeFilter(data)),
    searchFilter: (query: string) => dispatch(searchFilter(query))
});

// export default Header;


export default connect(mapStateToProps, mapDispatchToProps)(Header);