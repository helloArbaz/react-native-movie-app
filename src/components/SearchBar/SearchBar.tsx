import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, TextInput, View } from 'react-native';

import { Feather, Entypo } from "@expo/vector-icons";
import SearchBarStyle from './SearchBarStyle';


interface PropsSearchBar {
    setSearchBarVisibility: any
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


    setSearchValue = (event: any) => {
        const { eventCount, target, text } = event.nativeEvent;
        this.setState({ _searchValue: text });
    }

    searchBarCrossClick = () => {
        const { _searchValue} = this.state
        const {setSearchBarVisibility} = this.props
        if( _searchValue){
            this.setState({ _searchValue: '' });
            return
        }
        setSearchBarVisibility()

    }



    render() {
        const { setSearchBarVisibility } = this.props
        const { _searchValue } = this.state;
        return (
            <View style={SearchBarStyle.container}>
                <View
                    style={
                        true
                            ? SearchBarStyle.searchBar__clicked
                            : SearchBarStyle.searchBar__unclicked
                    }
                >
                    {/* search Icon */}
                    <Feather
                        name="search"
                        size={20}
                        color="black"
                        style={{ marginLeft: 1 }}
                    />
                    {/* Input field */}
                    <TextInput
                        style={SearchBarStyle.input}
                        placeholder="Search"
                        value={_searchValue}
                        onChangeText={newText => this.setState({ _searchValue: newText })}
                    // onChangeText={(event:any)=>this.setSearchValue(event)}
                    // onFocus={() => {
                    //     setClicked(true);
                    // }}
                    />
                    {/* cross Icon, depending on whether the search bar is clicked or not */}
                    {true && (
                        <Entypo name="cross" size={20} color="black" style={{ padding: 1 }} onPress={() => {
                            this.searchBarCrossClick()
                            // setSearchPhrase("")

                        }} />
                    )}
                </View>
            </View>
        );
    }
}

export default SearchBar;