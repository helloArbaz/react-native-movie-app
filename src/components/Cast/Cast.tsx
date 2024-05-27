import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, View } from 'react-native';
import { API_URL } from '../../configs/api.config';


interface PropsCast { }
interface StateCast { }

class Cast extends Component<PropsCast, StateCast> {

    cast = {
        "adult": false,
        "gender": 2,
        "id": 12835,
        "known_for_department": "Acting",
        "name": "Vin Diesel",
        "original_name": "Vin Diesel",
        "popularity": 77.792,
        "profile_path": "/nZdVry7lnUkE24PnXakok9okvL4.jpg",
        "cast_id": 0,
        "character": "Dominic Toretto",
        "credit_id": "56d8c1e0c3a3681e3601fdc6",
        "order": 0
    }

    constructor(props: PropsCast) {
        super(props);
        this.state = {}

    }
    render() {
        return (
            <View>
                <View style={{height:100,width:100,borderRadius:10,backgroundColor:'red'}}>
                    <Image source={{ uri: `${API_URL}/${this.cast.profile_path}` }} />
                </View>
            </View>
        );
    }
}

export default Cast;