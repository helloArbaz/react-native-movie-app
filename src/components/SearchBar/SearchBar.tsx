import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Feather, Entypo } from "@expo/vector-icons";
import SearchBarStyle from './SearchBarStyle';
import debounce from 'lodash/debounce';
import { AppDispatch, RootState } from '../../store';
import { connect } from 'react-redux';
import { resetDataSet, searchFilter, setSearchQuery, showLoader } from '../../slice/movieAppSlice';


interface PropsSearchBar {
    setSearchBarVisibility: any,
    showLoader: () => {}
    searchFilter: (reqData?: any) => {}
    setSearchQuery: (reqData?: any) => {}
    resetDataSet: () => {}
    searchQuery?: string
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
        this.handleSearch = debounce(this.handleSearch.bind(this), 1000);
    }

    inputChange = (query: string) => {
        this.setState({ _searchValue: query }, () => {
            this.props.setSearchQuery(query)
            if (this.state._searchValue) {
                this.handleSearch(query);
            }
        });
    };

    handleSearch(query: string) {
        Keyboard.dismiss()
        this.props.showLoader()
        this.props.searchFilter(query)
    }

    searchBarCrossClick = () => {
        const { _searchValue } = this.state
        const { setSearchBarVisibility, setSearchQuery, searchQuery } = this.props
        if (!searchQuery) { 
            this.handleSearch("")
            setSearchBarVisibility(null)
         }
        setSearchQuery("")
        this.handleSearch("")
    }



    render() {
        const { setSearchBarVisibility } = this.props
        const { _searchValue } = this.state;
        return (
            <View style={SearchBarStyle.container}>
                <View style={{ width: "80%" }}>
                    <TextInput
                        style={SearchBarStyle.searchParent}
                        placeholderTextColor={"#8c8c8c"}
                        placeholder="Search"
                        value={this.props.searchQuery}
                        onChangeText={newText => this.inputChange(newText)}
                        autoFocus />
                </View>
                <TouchableOpacity onPress={() => this.searchBarCrossClick()}>
                    <Text style={SearchBarStyle.cancel}>Cancel</Text>
                </TouchableOpacity>

            </View>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    data: state?.movieApp?.data,
    yearFilter: state.movieApp.yearFilter,
    selectedFilter: state.movieApp.selectedFilter,
    searchQuery: state.movieApp.searchQuery,

});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    showLoader: () => dispatch(showLoader()),
    searchFilter: (reqData?: any) => dispatch(searchFilter(reqData)),
    resetDataSet: (reqData?: any) => dispatch(resetDataSet()),
    setSearchQuery: (reqData?: any) => dispatch(setSearchQuery(reqData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
