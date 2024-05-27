import React, { Component, useDebugValue } from 'react';
import PropTypes from 'prop-types';
import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PosterImage from '../../components/PosterImage/PosterImage';
import { Feather, Entypo, } from "@expo/vector-icons";

import Cast from '../../components/Cast/Cast';
import { formatViewCountNumber } from '../../helpers/formatViewCountNumber';



interface PropsMovieDetails { }
interface StateMovieDetails { }

class MovieDetails extends Component<PropsMovieDetails, StateMovieDetails> {

    data =
        {
            "adult": false,
            "backdrop_path": "/fY3lD0jM5AoHJMunjGWqJ0hRteI.jpg",
            "belongs_to_collection": null,
            "budget": 15000000,
            "genres": [
                {
                    "id": 878,
                    "name": "Science Fiction"
                },
                {
                    "id": 27,
                    "name": "Horror"
                },
                {
                    "id": 28,
                    "name": "Action"
                },
                {
                    "id": 878,
                    "name": "Science Fiction"
                },
                {
                    "id": 27,
                    "name": "Horror"
                },
                {
                    "id": 28,
                    "name": "Action"
                }
            ],
            "homepage": "https://tickets.godzilla.com",
            "id": 940721,
            "imdb_id": "tt23289160",
            "origin_country": [
                "JP"
            ],
            "original_language": "ja",
            "original_title": "ゴジラ-1.0",
            "overview": "Postwar Japan is at its lowest point when a new crisis emerges in the form of a giant monster, baptized in the horrific power of the atomic bomb.",
            "popularity": 1273.455,
            "poster_path": "/hkxxMIGaiCTmrEArK7J56JTKUlB.jpg",
            "production_companies": [
                {
                    "id": 882,
                    "logo_path": "/iDw9Xxok1d9WAM2zFicI8p3khTH.png",
                    "name": "TOHO",
                    "origin_country": "JP"
                },
                {
                    "id": 182161,
                    "logo_path": "/wvG4lK0m76M6jK8WbWkXNecA7SP.png",
                    "name": "TOHO Studios",
                    "origin_country": "JP"
                },
                {
                    "id": 12386,
                    "logo_path": "/oxvw2Mrq3GcTxFc2mlT7E5tpek7.png",
                    "name": "Robot Communications",
                    "origin_country": "JP"
                }
            ],
            "production_countries": [
                {
                    "iso_3166_1": "JP",
                    "name": "Japan"
                }
            ],
            "release_date": "2023-11-03",
            "revenue": 115857413,
            "runtime": 125,
            "spoken_languages": [
                {
                    "english_name": "English",
                    "iso_639_1": "en",
                    "name": "English"
                },
                {
                    "english_name": "Japanese",
                    "iso_639_1": "ja",
                    "name": "日本語"
                }
            ],
            "status": "Released",
            "tagline": "Postwar Japan. From zero to minus.",
            "title": "Godzilla Minus One",
            "video": false,
            "vote_average": 7.671,
            "vote_count": 1161
        }

    constructor(props: PropsMovieDetails) {
        super(props);
        this.state = {}
    }




    render() {
        let tt = formatViewCountNumber(1555)
        return (
            <View style={{ flex: 1, backgroundColor: "black", paddingBottom: 100 }}>
                <ScrollView fadingEdgeLength={100}>
                    <View>
                        <View style={{ display: 'flex', justifyContent: "center", alignItems: 'center', }}>
                            <View style={{ marginTop: 30 }}>
                                <PosterImage />
                            </View>
                        </View>
                        <View style={{
                            width: "100%",
                            position: "absolute", padding: 10, bottom: 0, backgroundColor: 'rgba(17, 17, 17, 0.766)',
                        }}>

                            <View style={{
                                alignItems: 'center',
                                alignContent: "center",
                                display: "flex",
                                flexDirection: "row",
                            }}>
                                <View style={{ width: "70%", display: "flex", flexDirection: "column", }}>
                                    <Text style={{ color: 'white', fontSize: 15, fontWeight: "bold", textAlign: "left", }}>
                                        The Cook, the Thief, His Wife & Her Lover Lover
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
                                        }}>(8.9)</Text>
                                    </View>
                                    <View>
                                        <Text style={{ color: "white", fontSize: 10, marginTop: 5 }}>{`Views ( ${formatViewCountNumber(1555)} )`}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ padding: 10, gap: 20 }}>
                        <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 10, justifyContent: 'flex-start', marginTop: 20 }}>
                            {
                                this.data.genres.map((v, i) => {
                                    return <View style={{ borderWidth: 1, borderColor: "white", borderRadius: 5 }}><Text style={{ color: 'white', marginRight: 10, marginLeft: 10, marginTop: 5, marginBottom: 5, fontSize: 10 }}>{v.name}s</Text></View>
                                })
                            }
                        </View>
                        <View>
                            <Text style={{ fontSize: 15, fontWeight: "500", color: "white", }}>Synopsis</Text>
                        </View>
                        <View style={{ borderBottomWidth: 1, borderBlockColor: '#383e42', paddingBottom: 10 }}>
                            <Text style={{ color: 'white', fontSize: 15, fontWeight: 100 }}>
                                {this.data.overview}
                            </Text>
                        </View>

                        <View>
                            <Text style={{ fontSize: 15, fontWeight: "500", color: "white", }}>
                                Languages
                            </Text>
                        </View>
                        <View style={{ borderBottomWidth: 1, borderBlockColor: '#383e42', paddingBottom: 10 }}>
                            <Text style={{ color: 'white', fontSize: 15, fontWeight: 100 }}>
                                English | Hindi | Marathi
                            </Text>
                        </View>


                        <View>
                            <Text style={{ fontSize: 15, fontWeight: "500", color: "white", }}>Star cast</Text>
                        </View>
                        <View style={{ borderBottomWidth: 1, borderBlockColor: '#383e42', paddingBottom: 10 }}>
                            <View style={{
                                display: 'flex',
                                flexDirection: 'row',
                                flexWrap: "wrap",
                                justifyContent: "space-around",
                                gap: 10
                            }}>
                                {
                                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((v, i) => {
                                        return <Cast />
                                    })
                                }
                            </View>
                        </View>

                        <View>
                            <Text style={{ fontSize: 15, fontWeight: "500", color: "white", }}>
                                Production House
                            </Text>
                        </View>

                        <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 10, justifyContent: 'flex-start' }}>
                            {
                                this.data.production_companies.map((v, i) => {
                                    return <View style={{ borderWidth: 1, borderColor: "white", borderRadius: 5 }}><Text style={{ color: 'white', marginRight: 10, marginLeft: 10, marginTop: 5, marginBottom: 5, fontSize: 10 }}>{v.name}</Text></View>
                                })
                            }
                        </View>

                    </View>
                </ScrollView>
            </View>
        );
    }
}


export default MovieDetails;