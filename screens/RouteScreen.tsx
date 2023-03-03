import MapView, {LatLng, Marker, PROVIDER_GOOGLE} from "react-native-maps";
import {Dimensions, StyleSheet, Text, TouchableOpacity, View,} from "react-native";

import {GOOGLE_API_KEY} from "../environments";
import Constants from "expo-constants";
import {useEffect, useRef, useState} from "react";
import MapViewDirections from "react-native-maps-directions";
import Geocoder from 'react-native-geocoding';
import {ClientApi} from "../api/client";
import Icon from 'react-native-vector-icons/FontAwesome';
import { SwipeListView } from 'react-native-swipe-list-view';

const iconColor = '#D63D3D';
export default function RouteScreen({navigation, route}: any) {

    const {id} = route.params
    const [origin, setOrigin] = useState<LatLng | null>();
    const [destination, setDestination] = useState<LatLng | null>();

    const [showDirections, setShowDirections] = useState(false);
    const [distance, setDistance] = useState(0);
    const [duration, setDuration] = useState(0);
    const [data, setData] = useState<{ origin: string, destination: string }>({destination: "", origin: ""});
    const mapRef = useRef<MapView>(null);


    const edgePaddingValue = 70;

    const edgePadding = {
        top: edgePaddingValue,
        right: edgePaddingValue,
        bottom: edgePaddingValue,
        left: edgePaddingValue,
    };

    useEffect(() => {
        (async () => {
            const clientData = await ClientApi.getClientRoute(id)
            console.log(clientData, '333333ååå')
            /// setData(clientData.client)
            await traceRoute(clientData)
        })()
    }, [])
    const traceRouteOnReady = (args: any) => {
        if (args) {
            setDistance(args.distance);
            setDuration(args.duration);
        }
    };

    const traceRoute = async (route: { origin: string, origin_id: string, destination_id: string, destination: string }) => {
        Geocoder.init(GOOGLE_API_KEY);
        setData(route)
        const dataTo = await Geocoder.from(route.origin)
        const datafrom = await Geocoder.from(route.destination)

        var locationFrom = dataTo.results[0].geometry.location;
        var locationTO = datafrom.results[0].geometry.location;

        setDestination({
            latitude: locationTO.lat,
            longitude: locationTO.lng
        })
        setOrigin({
            latitude: locationFrom.lat,
            longitude: locationFrom.lng
        })

        setShowDirections(true);
        mapRef.current?.fitToCoordinates([{
            latitude: locationFrom.lat,
            longitude: locationFrom.lng
        }, {
            latitude: locationTO.lat,
            longitude: locationTO.lng
        }], {edgePadding});
    };


    return data && (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                // initialRegion={INITIAL_POSITION}
            >
                {destination && <Marker
                    title={`Drop down`}
                    description={data.destination}
                    coordinate={destination}/>}
                {origin && <Marker title={`Pick up`}
                                   description={data.origin}
                                   coordinate={origin}/>}

                {showDirections && origin && destination && (
                    <MapViewDirections
                        origin={origin}
                        destination={destination}
                        apikey={GOOGLE_API_KEY}
                        strokeColor="#6644ff"
                        strokeWidth={4}
                        onReady={traceRouteOnReady}
                    />
                )}
            </MapView>
            <View style={styles.searchContainer}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => {
                        navigation.goBack();
                    }}>
                    <Icon name="arrow-left" size={30} color={iconColor}/>
                </TouchableOpacity>
                {distance && duration ? (
                    <View style={styles.info}>
                        {/*      <TouchableOpacity
                                          onPress={() => {
                                              navigation.goBack();

                                          }}>
                           <Text>Back</Text>
                        </TouchableOpacity>*/}
                        <Text>Distance: {distance.toFixed(2)} mile</Text>
                        <Text>Duration: {Math.ceil(duration)} min</Text>
                    </View>
                ) : null}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
    searchContainer: {
        position: "absolute",
        width: "90%",
        display: "flex",
        flexDirection: "row",
        backgroundColor: "white",
        shadowColor: "black",
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 4,
        padding: 8,
        borderRadius: 8,
        top: Constants.statusBarHeight,
    },
    input: {
        borderColor: "#888",
        borderWidth: 1,
    },
    button: {
        backgroundColor: "#bbb",
        paddingVertical: 12,
        marginTop: 16,
        borderRadius: 4,
    },
    backButton: {
        //width: 50,
        margin: 5,
        paddingHorizontal: 15,
        display: "flex",
        borderRightWidth: 1,
        borderRightColor: iconColor,
        flexDirection: "column",
        textAlignVertical: "center",

    },
    info: {
        margin: 5,
        display: "flex",
        flexDirection: "column"
    },
    buttonText: {
        textAlign: "center",
    },
});