import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Feather, Entypo } from "@expo/vector-icons";
import SearchBarStyle from './SearchBarStyle';
import debounce from 'lodash/debounce';
import { AppDispatch, RootState } from '../../store';
import { connect } from 'react-redux';
import { resetDataSet, searchFilter, showLoader } from '../../slice/movieAppSlice';


interface PropsSearchBar {
    setSearchBarVisibility: any,
    showLoader: () => {}
    searchFilter: (reqData?: any) => {}
    resetDataSet: () => {}
    // setSearchQuery: () => {}
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
            if (this.state._searchValue)
                this.handleSearch(query);
        });
    };

    handleSearch(query: string) {
        Keyboard.dismiss()
        this.props.showLoader()
        this.props.searchFilter(query)
    }

    searchBarCrossClick = () => {
        const { _searchValue } = this.state
        const { setSearchBarVisibility } = this.props
        if (_searchValue) {
            this.setState({ _searchValue: '' }, () => {
                if (this.state._searchValue == "") this.props.resetDataSet()
            });
            return
        } else {
            this.props.resetDataSet()
            setSearchBarVisibility(null)
        }

    }



    render() {
        const { setSearchBarVisibility } = this.props
        const { _searchValue } = this.state;
        return (
            <View style={SearchBarStyle.container}>
                <View
                    style={SearchBarStyle.parentContainer}
                >
                    <View style={SearchBarStyle.txtWrapper}>
                        <TextInput
                            style={{ width: "100%", height: 35,color:"white",fontWeight:"400" }}
                            placeholderTextColor={"#8c8c8c"}
                            placeholder="Search"
                            value={_searchValue}
                            onChangeText={newText => this.inputChange(newText)}
                            autoFocus />
                    </View>

                    <TouchableOpacity style={{ width: "20%" }} onPress={() => { this.searchBarCrossClick() }}>
                        <Text style={SearchBarStyle.cancel}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

// export default SearchBar;



const mapStateToProps = (state: RootState) => ({
    data: state?.movieApp?.data,
    yearFilter: state.movieApp.yearFilter,
    selectedFilter: state.movieApp.selectedFilter

});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    showLoader: () => dispatch(showLoader()),
    searchFilter: (reqData?: any) => dispatch(searchFilter(reqData)),
    resetDataSet: (reqData?: any) => dispatch(resetDataSet()),
    // loadMore: (reqData?: any) => dispatch(loadMore(reqData))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
