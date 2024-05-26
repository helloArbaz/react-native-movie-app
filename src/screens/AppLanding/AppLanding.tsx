import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList, SafeAreaView, SafeAreaViewBase, ScrollView, Text, Touchable, TouchableOpacity, View } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { AppDispatch, RootState } from '../../store';
import { API } from '../../services';
import { connect } from 'react-redux';
import { getMoviesList } from '../../services/getMovieList';
import Header from '../../components/Header/Header';
import AppLandingStyle from "./AppLandingStyle"
import MovieCard from '../../components/MovieCard/MovieCard';
import Loading from '../../components/Loading/Loading';

interface PropsAppLanding {
    navigation?: NavigationProp<any>;
    getMoviesList?: any
}
interface StateAppLanding { }

class AppLanding extends Component<PropsAppLanding, StateAppLanding> {

    constructor(props: PropsAppLanding) {
        super(props);
        this.state = {}
    }

    navigate = async () => {
        console.log("sdfdsf")
        let response = await this.props.getMoviesList()
        console.log(response, '-----')
        this.props.navigation?.navigate("movie-details")
    }


    render() {
        return (
            <SafeAreaView style={AppLandingStyle.droidSafeArea}>
                {/* {true && <Loading/>} */}
                <View style={AppLandingStyle.droidSafeArea}>
                    <Header />
                    <FlatList
                        numColumns={2}
                        key={Math.random()}
                        keyExtractor={(item) => JSON.stringify(item)}
                        data={[["1"], ["2"], ["1"], ["2"], ["1"], ["2"], ["1"], ["2"]]}
                        renderItem={(item: any) => (item.index === 2 || item.index === 2 + 1) ? <Text style={{ color: "red" }}>Hacking</Text> : <MovieCard />}
                        ListHeaderComponent={() => <View><Text style={{ color: "white" }}>Header</Text></View>}
                        stickyHeaderIndices={[0, 2]}

                    />


                </View>
            </SafeAreaView>
        );
    }
}



const mapStateToProps = (state: RootState) => ({
    data: state.counter.data,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    getMoviesList: (reqData?: any) => dispatch(getMoviesList(reqData))
});

export default connect(mapStateToProps, mapDispatchToProps)(AppLanding);



// export default AppLanding;