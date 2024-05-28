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
        console.log(JSON.stringify(data), 'this.props=>>>')
        this.initCalls()
    }

    initCalls = async () => {
        try {
            const { route } = this.props
            let _id = route.params.data.id
            const { getMovieDetailsById, getMoiveCastById } = this.props
            let allResolved: any = await Promise.all([getMovieDetailsById({ id: _id }), getMoiveCastById({ id: _id })])
            this.setState({ movieDetail: allResolved[0]['payload'], cast: allResolved[1]["payload"], loader: false })
        } catch (error) {
            console.log(error)
        }
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
        if (loader && !movieDetail) return <Loading />

        return (
            <SafeAreaView style={{ backgroundColor: "black", flex: 1 }}>
                <ScrollView >
                    <View style={{}}>
                        <View style={{ display: 'flex', justifyContent: "center", alignItems: 'center', }}>
                            <View>
                                <PosterImage url={movieDetail.poster_path} />
                            </View>
                        </View>
                        <View style={{
                            width: "100%",
                            position: "absolute", padding: 12, paddingRight: 25, paddingLeft: 25, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.732)',
                        }}>

                            <View style={{
                                alignItems: 'center',
                                alignContent: "center",
                                display: "flex",
                                flexDirection: "row",
                            }}>
                                <View style={{ width: "70%", display: "flex", flexDirection: "column", }}>
                                    <Text style={{ color: 'white', fontSize: 20, fontWeight: "bold", textAlign: "left", }}>
                                        {movieDetail.title}
                                    </Text>
                                </View>
                                <View style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "flex-end", width: "30%", }}>
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
                                        <Text style={{
                                            color: "white",
                                            fontSize: 12,
                                            fontWeight: "bold"
                                        }}>
                                            {`${Math.ceil(parseInt(String(movieDetail.vote_average)))}`}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={{ color: "white", fontSize: 10, marginTop: 5 }}>{`Views ( ${formatViewCountNumber(movieDetail.vote_count)} )`}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{ padding: 15, gap: 40, }}>
                        <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
                            {
                                movieDetail.genres.map((v: movieGenre, index: any) => {
                                    return <Text style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, color: "white", borderWidth: 0.5, borderColor: 'white', borderRadius: 5, fontSize: 12, fontWeight: "300" }}>{v.name}</Text>
                                })
                            }
                        </View>





                        <View style={{ display: "flex", justifyContent: "space-between", flexDirection: "row", padding: 20, borderTopWidth: 0.5, borderTopColor: "white", borderBottomWidth: 0.5, borderBottomColor: "white" }}>
                            <View style={{ display: "flex", gap: 10, width: "33.33%", flexDirection: "column", justifyContent: "center", alignItems: "center", alignContent: "center" }}>
                                <Entypo name="thumbs-up" size={25} color="#1791fc" />
                                <Text style={{ color: "white", fontSize: 12 }}>{formatViewCountNumber(movieDetail.vote_count)}</Text>
                            </View>
                            <View style={{ display: "flex", gap: 10, width: "33.33%", flexDirection: "column", justifyContent: "center", alignItems: "center", alignContent: "center" }}>
                                <Entypo name="star" size={25} color="#fcbd28" />
                                <Text style={{ color: "white", fontSize: 12 }}>{`${Math.ceil(parseInt(String(movieDetail.vote_average)))} / 10`}</Text>
                            </View>
                            <View style={{ display: "flex", gap: 10, width: "33.33%", flexDirection: "column", justifyContent: "center", alignItems: "center", alignContent: "center" }}>
                                <Entypo name="plus" size={25} color="green" />
                                <Text style={{ color: "white", fontSize: 12 }}>{Math.ceil(parseInt(String(movieDetail.popularity)))}</Text>
                            </View>
                        </View>

                        <View style={{ display: "flex", flexDirection: "column", gap: 10 }}>

                            <View style={{ display: "flex", flexDirection: "row", gap: 10, flexWrap: "wrap",alignItems:"center" }}>
                                <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>{`Languages :`}</Text>
                                {
                                    movieDetail.spoken_languages.map((v: spoken_languages, index: number) => {
                                        return <Text style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, color: "white", borderWidth: 0.5, borderColor: 'white', borderRadius: 5, fontSize: 12, fontWeight: "300" }}>{v.english_name}</Text>
                                    })
                                }
                            </View>
                        </View>

                        <View style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                            <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>{`Movie Story : [ ${toHoursAndMinutes(movieDetail.runtime)} ]`}</Text>
                            <Text style={{ color: "white", fontSize: 15, fontWeight: "100" }}>{movieDetail.overview}</Text>
                        </View>


                        <View style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                            <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>{`Cast :`}</Text>
                            <Cast castList={cast} displayLength={10} />
                        </View>


                        <View style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                            <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>{`Production Houses :`}</Text>
                            <View style={{ display: "flex", flexDirection: "row", gap: 10, flexWrap: "wrap" }}>
                                {
                                    movieDetail.production_companies.map((v: production_companies, index: number) => {
                                        return <Text style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, color: "white", borderWidth: 0.5, borderColor: 'white', borderRadius: 5, fontSize: 12, fontWeight: "300" }}>{v.name}</Text>
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
    data: state.movieApp.data,
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
