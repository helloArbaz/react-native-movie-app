import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, TextInput, View } from 'react-native';

import { Feather, Entypo } from "@expo/vector-icons";
import SearchBarStyle from './SearchBarStyle';


interface PropsSearchBar {
    setSearchBarVisibility: any,
    searchFilter: any
}
interface StateSearchBar {
    _searchValue: string
}

class SearchBar extends PureComponent<PropsSearchBar, StateSearchBar> {
    constructor(props: PropsSearchBar) {
        super(props);
        this.state = {
            _searchValue: ''
        }
    }


    setSearchValue = (newText: any) => {
        const { searchFilter } = this.props
        this.setState({ _searchValue: newText }, () => {
            searchFilter(this.state._searchValue)
        });
    }

    searchBarCrossClick = () => {
        const { _searchValue} = this.state
        const { searchFilter } = this.props

        const {setSearchBarVisibility} = this.props
        if( _searchValue){
            this.setState({ _searchValue: '' });
            return
        }
        setSearchBarVisibility()
        searchFilter(null)

    }



    render() {
        const { setSearchBarVisibility } = this.props
        const { _searchValue } = this.state;
        return (
            <View style={SearchBarStyle.container}>
                <View
                    style={[SearchBarStyle.searchBar__unclicked, SearchBarStyle.searchBar__clicked]}
                >
                    <Feather
                        name="search"
                        size={20}
                        color="#FFFFFF"
                        style={{ marginLeft: 15, marginRight: 10 }}
                    />
                    <TextInput
                        style={SearchBarStyle.input}
                        placeholderTextColor={"#8c8c8c"}
                        placeholder="Search"
                        value={_searchValue}
                        onChangeText={newText => this.setSearchValue(newText)}
                    />

                    <Entypo name="cross" size={25} color="#FFFFFF" style={{ padding: 1, marginRight: 15 }} onPress={() => {
                            this.searchBarCrossClick()
                            // setSearchPhrase("")

                    }} />
                </View>
            </View>
        );
    }
}

export default SearchBar;