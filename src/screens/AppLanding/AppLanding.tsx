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

interface PropsAppLanding {
    navigation?: NavigationProp<any>;
    getMoviesList?: any
}
interface StateAppLanding { }




const DATA = [
    {
        title: "2012",
        isStickey: true,
        data: ["Pizza", "Burger", "Risotto"],
    },
    {
        title: "2013",
        isStickey: true,
        data: ["French Fries", "Onion Rings", "Fried Shrimps"],
    },
    {
        title: "2014",
        isStickey: true,
        data: ["Water", "Coke", "Beer"],
    },
    {
        title: "2015",
        isStickey: true,
        data: ["Cheese Cake", "Ice Cream"],
    },
    {
        title: "2016",
        isStickey: true,
        data: ["Cheese Cake", "Ice Cream"],
    },
    {
        title: "2017",
        isStickey: true,
        data: ["Cheese Cake", "Ice Cream"],
    },
    {
        title: "2018",
        isStickey: true,
        data: ["Cheese Cake", "Ice Cream"],
    },
    {
        title: "2019",
        isStickey: true,
        data: ["Cheese Cake", "Ice Cream"],
    },
    {
        title: "2020",
        isStickey: true,
        data: ["Cheese Cake", "Ice Cream"],
    },
];



const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        marginHorizontal: 16,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
    },
    header: {
        fontSize: 32,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
    },
});


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

        let _skicky = DATA.filter((v, i) => v.isStickey)
        let t = sortData(_dd)
        let final: any = convertDataToSelectionListView(t)


        return (
            <SafeAreaView style={AppLandingStyle.droidSafeArea}>
                {/* {true && <Loading/>} */}
                <View style={AppLandingStyle.droidSafeArea}>
                    <Header />
                    <SectionList
                        sections={final}
                        keyExtractor={(item, index) => item + index}
                        renderItem={({ item, index }) => (
                            <View>
                                {
                                    index === 0 && <FlatList
                                        numColumns={2}
                                        renderItem={() => <MovieCard />}
                                        data={final[index].data}
                                        keyExtractor={(item) => JSON.stringify(item)}
                                        removeClippedSubviews
                                    />
                                }
                            </View>

                        )}
                        renderSectionHeader={({ section: { title } }) => (
                            <View style={{ width: 60, backgroundColor: 'rgba(17, 17, 17, 0.766)', borderBottomRightRadius: 5, borderTopRightRadius: 5 }}>
                                <Text style={[{ fontSize: 15, color: "white", fontWeight: "700", padding: 10,}
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
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    getMoviesList: (reqData?: any) => dispatch(getMoviesList(reqData))
});

export default connect(mapStateToProps, mapDispatchToProps)(AppLanding);



// export default AppLanding;