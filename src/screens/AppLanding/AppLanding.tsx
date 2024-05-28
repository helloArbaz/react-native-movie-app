import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dimensions, FlatList, SafeAreaView, SafeAreaViewBase, ScrollView, SectionList, StatusBar, StyleSheet, Text, Touchable, TouchableOpacity, View, } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { AppDispatch, RootState } from '../../store';
import { API } from '../../services';
import { connect } from 'react-redux';
import { getMoviesList } from '../../services/getMovieList';
import Header from '../../components/Header/Header';
import AppLandingStyle from "./AppLandingStyle"
import MovieCard from '../../components/MovieCard/MovieCard';
import Loading from '../../components/Loading/Loading';;
import { loadMore } from '../../services/loadMore';
import { FlashList } from '@shopify/flash-list';


interface PropsAppLanding {
    navigation?: NavigationProp<any>;
    getMoviesList?: any,
    loadMore?: any,
    data?: any,
    rawData?: any
    loader?: boolean
}
interface StateAppLanding { }


class AppLanding extends Component<PropsAppLanding, StateAppLanding> {
    ITEM_HEIGHT = 300

    constructor(props: PropsAppLanding) {
        super(props);
        this.state = {
            loader:false
        }
    }

    componentDidMount(): void { this.getImages() }

    navigateMobileDetails = async (data?: any) => {
        let response = await this.props.getMoviesList()
        this.props.navigation?.navigate("movie-details", { data })
    }

    getImages = async () => {
        await this.props.getMoviesList()
    }

    loadMore = async () => {
        await this.props.loadMore()
    }


    // 

    _flatListrenderItem = (item: any) => {
        return <MovieCard navigateMobileDetails={this.navigateMobileDetails} key={`${item.item.id}-${item.index}`} movieData={item.item} />
    }

    _flatListkeyExtractor = (item?: any, index?: any) => {
        return `movie-card-${JSON.stringify(item.id)}`
    }

    _flatListgetItemLayout = (_?: any, index?: any) => { return { length: this.ITEM_HEIGHT, offset: this.ITEM_HEIGHT * index!, index } }


    _selectionsListrenderItem = (item: any) => {
        return <View>
            {
                item.index === 0 && <View style={{ flex: 1 }}>
                    {/* <FlashList
                            numColumns={2}
                            renderItem={(item: any, index?: number) => <MovieCard key={`${item.item.id}-${index}`} movieData={item.item} />}
                            data={this.props.data[index].data}
                            removeClippedSubviews={true}
                            onEndReachedThreshold={2}
                            onEndReached={() => this.loadMore()}
                            keyExtractor={(item) => JSON.stringify(item)}
                            getItemType={(item:any) => {
                                return item.type;
                            }}
                        /> */}



                    <FlatList
                        numColumns={2}
                        renderItem={this._flatListrenderItem}
                        data={this.props.data[item.index].data}
                        keyExtractor={this._flatListkeyExtractor}
                        removeClippedSubviews={true}
                        onEndReachedThreshold={2}
                        // onEndReached={() => this.loadMore()}
                        maxToRenderPerBatch={8}
                        initialNumToRender={8}
                        windowSize={8}
                        getItemLayout={this._flatListgetItemLayout}

                    />
                </View>
            }
        </View>
    }

    _selectionsListkeyExtractor = (item?: any, index?: any) => {
        return `movie-card-${JSON.stringify(item.id)}`
    }

    _selectionsListgetItemLayout = (_?: any, index?: any) => { return { length: this.ITEM_HEIGHT, offset: this.ITEM_HEIGHT * index!, index } }

    selectionsListRenderSectionHeader = (item?: any) => {
        return (
            <View style={{ width: 60, backgroundColor: 'rgba(17, 17, 17, 0.766)', borderBottomRightRadius: 5, borderTopRightRadius: 5 }}>
                <Text style={[{ fontSize: 15, color: "white", fontWeight: "700", padding: 10, }
                ]}>{item.section.title}</Text>
            </View>
        )
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
                        sections={this.props.data}
                        keyExtractor={this._selectionsListkeyExtractor}
                        renderItem={this._selectionsListrenderItem}
                        renderSectionHeader={this.selectionsListRenderSectionHeader}
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
    getMoviesList: (reqData?: any) => dispatch(getMoviesList(reqData)),
    loadMore: (reqData?: any) => dispatch(loadMore(reqData))
});

export default connect(mapStateToProps, mapDispatchToProps)(AppLanding);



// export default AppLanding;