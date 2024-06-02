import React, { Component, useDebugValue } from 'react';
import PropTypes from 'prop-types';
import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PosterImage from '../../components/PosterImage/PosterImage';
import { Feather, Entypo, } from "@expo/vector-icons";

import Cast from '../../components/Cast/Cast';
import { formatViewCountNumber } from '../../helpers/formatViewCountNumber';
import { cast, geMovieDetailsByIdRequest, getMoiveCastByIdRequest, movieDetailsKeys, movieGenre, movieListData, production_companies, spoken_languages } from '../../types';
import { AppDispatch, RootState } from '../../store';
// import { getMovieDetailsById } from '../../services/getMOvieDetailsById';
import { API } from '../../services';
import { getMoiveCastById } from '../../services/getMoiveCastById';
import { connect } from 'react-redux';
import { getMovieDetailsById } from '../../services/getMovieDetailsById';
import Loading from '../../components/Loading/Loading';
import { genreFilterById, genreNameOnly } from '../../helpers/getGenreFilter';
import { toHoursAndMinutes } from '../../helpers/minutesToHours';
import MovieDetailsStyle from "./MovieDetailsStyle";



interface PropsMovieDetails {
    route?: any,
    getMovieDetailsById: (reqData: getMoiveCastByIdRequest) => {}
    getMoiveCastById: (reqData: getMoiveCastByIdRequest) => {}
}

interface StateMovieDetails {
    movieDetail: movieDetailsKeys;
    cast?: cast[]
    loader: boolean;
}

class MovieDetails extends Component<PropsMovieDetails, StateMovieDetails> {

    constructor(props: PropsMovieDetails) {
        super(props);
        this.state = {
            movieDetail: undefined!,
            cast: undefined,
            loader: true
        }
    }

    componentDidMount(): void {
        const { route } = this.props;
        const { params } = route
        const { data } = params
        this.initCalls()
    }

    initCalls = async () => {
        try {
            const { route } = this.props
            let _id = route.params.data.id
            const { getMovieDetailsById, getMoiveCastById } = this.props
            let allResolved: any = await Promise.all([getMovieDetailsById({ id: _id }), getMoiveCastById({ id: _id })])
            this.setState({ movieDetail: allResolved[0]['payload'], cast: allResolved[1]["payload"], loader: false })
        } catch (error) { }
    }


    getGenreList = () => {
        const { movieListData }: any = this.setState
        if (movieListData.genre_ids) { }
        let _result = [];
        for (let index = 0; index < movieListData?.genre_ids.length; index++) {
            let element: movieGenre = movieListData?.genre_ids[index]
            genreFilterById(String(element))
            _result.push(genreNameOnly(String(element)))
        }
        return _result.join("  |  ")
    }

    render() {
        const { movieDetail, cast, loader } = this.state
        const { params } = this.props.route
        const { data: mvData } = params

        if (loader) return <Loading />

        return (
            <SafeAreaView style={MovieDetailsStyle.droidSafeArea}>
                <ScrollView>
                    <View>
                        <View style={MovieDetailsStyle.posterWrapper}>
                            <View>
                                <PosterImage url={mvData.poster_path} />
                            </View>
                        </View>
                        <View style={MovieDetailsStyle.movieWrapper}>
                            <View style={{
                                alignItems: 'center',
                                alignContent: "center",
                                display: "flex",
                                flexDirection: "row",
                            }}>
                                <View style={MovieDetailsStyle.movieWrapperParent}>
                                    <Text style={MovieDetailsStyle.movieTitle}>
                                        {movieDetail?.title}
                                    </Text>
                                </View>
                                <View style={MovieDetailsStyle.ratingWrapper}>
                                    <View style={{ display: 'flex', flexDirection: "row" }}>
                                        <Entypo
                                            name="star"
                                            size={12}
                                            style={{
                                                color: '#fcbd28',
                                                marginRight: 2,
                                                fontSize: 15
                                            }}
                                        />
                                        <Text style={MovieDetailsStyle.votinText}>
                                            {`${Math.ceil(parseInt(String(movieDetail?.vote_average)))}`}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={{ color: "white", fontSize: 10, marginTop: 5 }}>{`Views ( ${formatViewCountNumber(movieDetail?.vote_count)} )`}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={[MovieDetailsStyle.moviGenreWrapper,{marginTop:20}]}>
                                {
                                    movieDetail?.genres?.map((v: movieGenre, index: any) => {
                                        return <Text key={`genre-${index}`} style={MovieDetailsStyle.genreList}>{v?.name}</Text>
                                    })
                                }
                            </View>
                        </View>
                    </View>

                    <View style={{ padding: 15, gap: 40, }}>



                        <View style={MovieDetailsStyle.movieInfoWrapper}>
                            <View style={MovieDetailsStyle.movieInfoChild}>
                                <Entypo name="thumbs-up" size={25} color="#1791fc" />
                                <Text style={MovieDetailsStyle.movieInfoText}>{formatViewCountNumber(movieDetail?.vote_count)}</Text>
                            </View>
                            <View style={MovieDetailsStyle.movieInfoChild}>
                                <Entypo name="star" size={25} color="#fcbd28" />
                                <Text style={MovieDetailsStyle.movieInfoText}>{`${Math.ceil(parseInt(String(movieDetail?.vote_average)))} / 10`}</Text>
                            </View>
                            <View style={MovieDetailsStyle.movieInfoChild}>
                                <Entypo name="plus" size={25} color="green" />
                                <Text style={MovieDetailsStyle.movieInfoText}>{Math.ceil(parseInt(String(movieDetail?.popularity)))}</Text>
                            </View>
                        </View>



                        <View style={MovieDetailsStyle.wrapperForListing}>

                            <View style={MovieDetailsStyle.languageContainter}>
                                <Text style={MovieDetailsStyle.pageHeader}>{`Languages :`}</Text>
                                {
                                    movieDetail?.spoken_languages?.map((v: spoken_languages, index: number) => {
                                        return <Text key={`language-${index}`} style={MovieDetailsStyle.paddingRaidusUi}>{v?.english_name}</Text>
                                    })
                                }
                            </View>
                        </View>

                        <View style={MovieDetailsStyle.wrapperForListing}>
                            <Text style={MovieDetailsStyle.pageHeader}>{`Movie Story : [ ${toHoursAndMinutes(movieDetail?.runtime)} ]`}</Text>
                            <Text style={MovieDetailsStyle.movieOverViewText}>{movieDetail?.overview}</Text>
                        </View>


                        <View style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                            <Text style={MovieDetailsStyle.pageHeader}>{`Cast :`}</Text>
                            <Cast castList={cast} displayLength={10} />
                        </View>


                        <View style={MovieDetailsStyle.wrapperForListing}>
                            <Text style={MovieDetailsStyle.pageHeader}>{`Production Houses :`}</Text>
                            <View style={MovieDetailsStyle.productionWrapper}>
                                {
                                    movieDetail?.production_companies?.map((v: production_companies, index: number) => {
                                        return <Text key={`production-${index}`} style={MovieDetailsStyle.paddingRaidusUi}>{v?.name}</Text>
                                    })
                                }
                            </View>
                        </View>




                    </View>

                </ScrollView>
            </SafeAreaView>
        );
    }
}


// export default MovieDetails;


const mapStateToProps = (state: RootState) => ({
    data: state?.movieApp?.data,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    getMoiveCastById: (reqData: geMovieDetailsByIdRequest) => dispatch(API.getMoiveCastById(reqData)),
    getMovieDetailsById: (reqData: geMovieDetailsByIdRequest) => dispatch(API.getMovieDetailsById(reqData))
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails)





// const mapStateToProps = (state: RootState) => ({
//     data: state.movieApp.data,
//     filter: state.movieApp.selectedFilter,
//     loader: state.movieApp.loader,
//     rawData: state.movieApp.rawData
// });

// const mapDispatchToProps = (dispatch: AppDispatch) => ({
//     getMoviesList: (reqData?: any) => dispatch(getMoviesList(reqData)),
//     loadMore: (reqData?: any) => dispatch(loadMore(reqData))
// });

// export default connect(mapStateToProps, mapDispatchToProps)(AppLanding);
