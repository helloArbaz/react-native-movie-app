import React, { Component } from 'react';
import PropTypes from 'prop-types';


interface PropsSearchBar { }
interface StateSearchBar { }

class SearchBar extends Component<PropsSearchBar, StateSearchBar> {
    constructor(props: PropsSearchBar) {
        super(props);
        this.state = {}
    }


    render() {
        return (
            <div>

            </div>
        );
    }
}

export default SearchBar;