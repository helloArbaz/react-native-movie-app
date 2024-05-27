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
import { data_data, sort_release_date } from '../../data/data';

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

    navigate = async (data?: any) => {
        console.log("sdfdsf")
        let response = await this.props.getMoviesList()
        console.log(response, '-----')
        this.props.navigation?.navigate("movie-details", { data })
    }




    render() {
        return (
            <SafeAreaView style={AppLandingStyle.droidSafeArea}>
                {/* {true && <Loading/>} */}
                <View style={AppLandingStyle.droidSafeArea}>
                    <Header />
                    <FlatList
                        numColumns={2}
                        keyExtractor={(item) => JSON.stringify(item)}
                        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0,]}
                        windowSize={100}
                        removeClippedSubviews={true}
                        renderItem={(item: any) => (item.index === 2 || item.index === 2 + 1) ? <View style={{ height: 60, backgroundColor: 'red' }}><Text style={{ color: "green" }}>Date</Text></View> :
                            <TouchableOpacity onPress={() => this.navigate(item)}>
                                <View>
                                    <MovieCard />
                                </View>
                            </TouchableOpacity>
                        }
                        ListHeaderComponent={() => <Text>gfgdf</Text>}
                        initialNumToRender={8}
                        stickyHeaderIndices={[2]}
                        // onEndReached={()=> alert('hello')}
                        // onEndReachedThreshold={10}
                        onEndReachedThreshold={100}
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