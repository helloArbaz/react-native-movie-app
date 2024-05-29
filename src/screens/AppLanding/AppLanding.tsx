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
    onEndBlockApiCallWhileScroll: boolean;

    constructor(props: PropsAppLanding) {
        super(props);
        this.state = {
            loader: false
        }
        this.onEndBlockApiCallWhileScroll = true;
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


    onEndReached = (event: any) => {
        if (!this.onEndBlockApiCallWhileScroll) {
            this.loadMore();
            this.onEndBlockApiCallWhileScroll = true;
        }
    }

    _selectionsListrenderItem = (item: any) => {
        return <View>
            {
                item.index === 0 && <View style={{ flex: 1 }}>
                    {/* <FlashList
                        numColumns={2}
                        renderItem={this._flatListrenderItem}
                        data={this.props.data[item.index].data}
                        removeClippedSubviews={true}
                        onEndReachedThreshold={0.5}
                        onEndReached={()=>this.onEndReached}
                        keyExtractor={(item) => JSON.stringify(item)}
                        getItemType={(item: any) => {
                            return item.type;
                        }}
                        onMomentumScrollBegin={() => { this.onEndBlockApiCallWhileScroll = false; }}
                    /> */}
                    <FlatList
                        numColumns={2}
                        renderItem={this._flatListrenderItem}
                        data={this.props.data[item.index].data}
                        keyExtractor={this._flatListkeyExtractor}
                        removeClippedSubviews={true}
                        onEndReachedThreshold={1}
                        onEndReached={this.onEndReached}
                        maxToRenderPerBatch={10}
                        initialNumToRender={8}
                        updateCellsBatchingPeriod={100}
                        windowSize={11}
                        getItemLayout={this._flatListgetItemLayout}
                        onMomentumScrollBegin={() => { this.onEndBlockApiCallWhileScroll = false; }}
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
            <View style={AppLandingStyle.selectionListHeader}>
                <Text style={[{ fontSize: 15, color: "white", fontWeight: "700", padding: 10, }
                ]}>{item.section.title}</Text>
            </View>
        )
    }


    render() {
        const { data, loader } = this.props
        if(!data) return <Loading/>
        return (
            <SafeAreaView style={AppLandingStyle.droidSafeArea}>
                {loader && <Loading />}
                <View style={AppLandingStyle.droidSafeArea}>
                    <Header />
                    <SectionList
                        sections={this.props.data}
                        keyExtractor={this._selectionsListkeyExtractor}
                        renderItem={this._selectionsListrenderItem}
                        renderSectionHeader={this.selectionsListRenderSectionHeader}
                        stickySectionHeadersEnabled
                        style={{ flexGrow: 1 }}
                        initialNumToRender={8}
                    />
                </View>
            </SafeAreaView>
        );
    }
}



const mapStateToProps = (state: RootState) => ({
    data: state?.movieApp?.data,
    filter: state?.movieApp?.selectedFilter,
    loader: state?.movieApp?.loader,
    rawData: state?.movieApp?.rawData
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    getMoviesList: (reqData?: any) => dispatch(getMoviesList(reqData)),
    loadMore: (reqData?: any) => dispatch(loadMore(reqData))
});

export default connect(mapStateToProps, mapDispatchToProps)(AppLanding);



// export default AppLanding;