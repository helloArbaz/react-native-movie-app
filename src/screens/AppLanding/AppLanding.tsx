import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dimensions, FlatList, SafeAreaView, SafeAreaViewBase, ScrollView, SectionList, StatusBar, StyleSheet, Text, Touchable, TouchableOpacity, View, } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { AppDispatch, RootState } from '../../store';
import { connect } from 'react-redux';
import { getMoviesList } from '../../services/getMovieList';
import Header from '../../components/Header/Header';
import AppLandingStyle from "./AppLandingStyle"
import MovieCard from '../../components/MovieCard/MovieCard';
import Loading from '../../components/Loading/Loading';;
import { loadMore } from '../../services/loadMore';
import { MAX_YEAR } from '../../configs/api.config';
import { FontAwesome } from "@expo/vector-icons";
import withInternetStatus from '../../components/HOC/withInternetStatus/withInternetStatus';
import { debounce } from 'lodash';
import {FlashList} from "@shopify/flash-list"





interface PropsAppLanding {
    navigation?: NavigationProp<any>;
    getMoviesList?: any,
    loadMore?: any,
    data?: any,
    rawData?: any
    loader?: boolean
    yearFilterMapper?: any
    dataClone?: any
    yearFilter?: any
    selectedFilter?: any
}
interface StateAppLanding {
    viewableItems?: any
}

// const DataSet = new DataSetClass()

class AppLanding extends Component<PropsAppLanding, StateAppLanding> {
    ITEM_HEIGHT = 300
    onEndBlockApiCallWhileScroll: boolean;
    onEndReachedThreshold?: number
    viewabilityConfig?: any


    constructor(props: PropsAppLanding) {
        super(props);
        this.state = {
            viewableItems: new Set([0, 1, 2, 3])
        }
        this.onEndBlockApiCallWhileScroll = true;
        this.viewabilityConfig = {
            // waitForInteraction: true,
            itemVisiblePercentThreshold: 20,
        };
    }

    componentDidMount(): void {
        this.getImages()
        this.onEndBlockApiCallWhileScroll = true;
    }

    navigateMobileDetails = async (data?: any) => {
        this.props.navigation?.navigate("movie-details", { data })
    }

    getImages = async () => {
        await this.props.getMoviesList()
        this.onEndReachedThreshold = 0.7
    }

    loadMore = async () => {
        let yearFilter = this.props.yearFilter;
        if ((yearFilter + 1) <= MAX_YEAR) {
            await this.props.loadMore({ _key: this.props.yearFilter + 1 })
        }
    }


    _flatListrenderItem = (item: any) => {
        const isViewable = this.state.viewableItems.has(item.index);
        return (<View style={{ flex: 1 }}>
            <MovieCard showImage={isViewable} navigateMobileDetails={this.navigateMobileDetails} key={`${item.item.id}-${item.index}`} movieData={item.item} />
        </View>)
    }
    _flatListkeyExtractor = (item?: any, index?: any) => `movie-card-${JSON.stringify(item.id)}`
    _flatListgetItemLayout = (_?: any, index?: any) => { return { length: this.ITEM_HEIGHT, offset: this.ITEM_HEIGHT * index!, index } }


    onEndReached = (event: any) => {
        const { selectedFilter } = this.props
        if (!this.onEndBlockApiCallWhileScroll && selectedFilter.id == -1) {
            this.loadMore()
            this.onEndBlockApiCallWhileScroll = true;
        }
    }

    handleViewableItemsChanged = (data: any) => {
        const viewableIndices = new Set(data.map((item: any) => item.index));
        this.setState({ viewableItems: viewableIndices });
    }



    _selectionsListrenderItem = (item: any) => {
        const { data } = this.props
        return <View style={{ flex: 1 }}>
            {
                item.index === 0 && <View style={{ flex: 1 }}>
                    {/* <FlashList
                        numColumns={2}
                        renderItem={this._flatListrenderItem}
                        data={item.section.data}
                        removeClippedSubviews
                        onEndReachedThreshold={0.5}
                        onEndReached={() => this.onEndReached}
                        // keyExtractor={(item) => JSON.stringify(item)}
                        getItemType={(item: any) => {
                            return item.type;
                        }}
                        // onLayout={() =>this._flatListgetItemLayout}
                        estimatedItemSize={300}
                        onMomentumScrollBegin={() => { this.onEndBlockApiCallWhileScroll = false; }}
                        viewabilityConfig={this.viewabilityConfig}
                        onViewableItemsChanged={({ viewableItems }) => this.handleViewableItemsChanged(viewableItems)}
                    /> */}
                    <FlatList
                        numColumns={2}
                        renderItem={this._flatListrenderItem}
                        data={item.section.data}
                        keyExtractor={this._flatListkeyExtractor}
                        removeClippedSubviews
                        updateCellsBatchingPeriod={100}
                        windowSize={11}
                        getItemLayout={this._flatListgetItemLayout}
                        extraData={item.section.data}

                        viewabilityConfig={this.viewabilityConfig}
                        onViewableItemsChanged={({ viewableItems }) => this.handleViewableItemsChanged(viewableItems)}
                        maxToRenderPerBatch={10}
                        initialNumToRender={8}
                        onMomentumScrollBegin={() => { this.onEndBlockApiCallWhileScroll = false; }}
                        onEndReachedThreshold={this.onEndReachedThreshold}
                        onEndReached={this.onEndReached}
                    />
                </View>

            }
        </View>
    }

    _selectionsListkeyExtractor = (item?: any, index?: any) => `movie-card-${JSON.stringify(item.id)}`
    _selectionsListgetItemLayout = (_?: any, index?: any) => { return { length: this.ITEM_HEIGHT, offset: this.ITEM_HEIGHT * index!, index } }
    selectionsListRenderSectionHeader = (item?: any) => {
        return (
            <View style={AppLandingStyle.selectionListHeader}>
                <Text style={[{ fontSize: 15, color: "white", fontWeight: "700", padding: 10, }
                ]}>{item.section.title}</Text>
            </View>
        )
    }



    render() {
        const { data, loader } = this.props


        return (
            <SafeAreaView style={AppLandingStyle.droidSafeArea} >

                {loader && <Loading />}

                <View style={AppLandingStyle.droidSafeArea}>
                    <Header />
                    {
                        data && data.length == 0 && (
                            <View style={{ flex: 1, justifyContent: "center", alignContent: "center", alignItems: "center", gap: 10 }}>
                                <FontAwesome name="chain-broken" size={40} color="#FFFFFF" style={{ padding: 1, marginRight: 15 }} />
                                <Text style={{ color: 'white', fontSize: 20 }}>Match Not Record</Text>
                            </View>
                        )
                    }

                    {
                        data && data.length > 0 && <SectionList
                            sections={data}
                            keyExtractor={this._selectionsListkeyExtractor}
                            renderItem={this._selectionsListrenderItem}
                            renderSectionHeader={this.selectionsListRenderSectionHeader}
                            stickySectionHeadersEnabled
                            style={{ flexGrow: 1 }}
                            initialNumToRender={8}
                        />
                    }
                </View>
            </SafeAreaView>
        );
    }
}



const mapStateToProps = (state: RootState) => ({
    data: state?.movieApp?.data,
    yearFilter: state.movieApp.yearFilter,
    selectedFilter: state.movieApp.selectedFilter,
    loader: state.movieApp.loader

});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    getMoviesList: (reqData?: any) => dispatch(getMoviesList(reqData)),
    loadMore: (reqData?: any) => dispatch(loadMore(reqData))
});

export default connect(mapStateToProps, mapDispatchToProps)(withInternetStatus(AppLanding));
