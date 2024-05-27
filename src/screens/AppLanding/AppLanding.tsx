import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList, SafeAreaView, SafeAreaViewBase, ScrollView, SectionList, StatusBar, StyleSheet, Text, Touchable, TouchableOpacity, View, } from 'react-native';
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
import { _dd, convertDataToSelectionListView, res, sortData } from '../../data/newData';
import { movieGenre, movieListData } from '../../types';

interface PropsAppLanding {
    navigation?: NavigationProp<any>;
    getMoviesList?: any,
    data?: any,
    rawData?: any
    loader?: boolean
}
interface StateAppLanding { }


class AppLanding extends Component<PropsAppLanding, StateAppLanding> {

    constructor(props: PropsAppLanding) {
        super(props);
        this.state = {}
    }

    componentDidMount(): void { this.getImages() }

    navigate = async (data?: any) => {
        let response = await this.props.getMoviesList()
        this.props.navigation?.navigate("movie-details", { data })
    }

    getImages = async () => {
        let response = await this.props.getMoviesList()
    }

    render() {
        const { data, loader } = this.props
        return (
            <SafeAreaView style={AppLandingStyle.droidSafeArea}>
                {loader && <Loading />}
                <View style={AppLandingStyle.droidSafeArea}>
                    <Header />
                    {/* <Text style={{color:"white"}}>{JSON.stringify(this.props.data)}</Text> */}
                    <SectionList
                        sections={[...this.props.data]}
                        keyExtractor={(item, index) => item + index}
                        renderItem={({ item, index }) => (
                            <View>
                                {
                                    index === 0 && <View>
                                        <FlatList
                                            numColumns={2}
                                            renderItem={(item: any) => <MovieCard movieData={item.item} />}
                                            data={this.props.data[index].data}
                                            keyExtractor={(item) => JSON.stringify(item)}
                                            removeClippedSubviews
                                        />
                                    </View>
                                }
                            </View>

                        )}
                        renderSectionHeader={({ section: { title } }) => (
                            <View style={{ width: 60, backgroundColor: 'rgba(17, 17, 17, 0.766)', borderBottomRightRadius: 5, borderTopRightRadius: 5 }}>
                                <Text style={[{ fontSize: 15, color: "white", fontWeight: "700", padding: 10, }
                                ]}>{title}</Text>
                            </View>
                        )}
                        stickySectionHeadersEnabled
                    />
                </View>
            </SafeAreaView>
        );
    }
}



const mapStateToProps = (state: RootState) => ({
    data: state.movieApp.data,
    filter: state.movieApp.selectedFilter,
    loader: state.movieApp.loader,
    rawData: state.movieApp.rawData
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    getMoviesList: (reqData?: any) => dispatch(getMoviesList(reqData))
});

export default connect(mapStateToProps, mapDispatchToProps)(AppLanding);



// export default AppLanding;