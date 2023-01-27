import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
    StyleSheet,
    View,
    Dimensions,
    Text, TouchableOpacity,
} from "react-native";

import { GOOGLE_API_KEY } from "../environments";
import Constants from "expo-constants";
import {useEffect, useRef, useState} from "react";
import MapViewDirections from "react-native-maps-directions";
import Geocoder from 'react-native-geocoding';
import Icon2 from "react-native-vector-icons/FontAwesome5";
import {ClientApi} from "../api/client";

export default function RouteScreen({navigation,route}:any) {
    const {id} = route.params
    const [origin, setOrigin] = useState<LatLng | null>();
    const [destination, setDestination] = useState<LatLng | null>();

    const [showDirections, setShowDirections] = useState(false);
    const [distance, setDistance] = useState(0);
    const [duration, setDuration] = useState(0);
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
            console.log(clientData,  '333333ååå')
           /// setData(clientData.client)
            await traceRoute(clientData.route)
        })()
    }, [])
    const traceRouteOnReady = (args: any) => {
        if (args) {
            setDistance(args.distance);
            setDuration(args.duration);
        }
    };

    const traceRoute = async (route:{origin:string, destination:string}) => {
        Geocoder.init(GOOGLE_API_KEY);
        const dataTo = await Geocoder.from(route.origin)
        var locationFrom = dataTo.results[0].geometry.location;
        setDestination({
            latitude: locationFrom.lat,
            longitude: locationFrom.lng
        })
        const datafrom = await Geocoder.from(route.destination)
        var locationTO = datafrom.results[0].geometry.location;
        setOrigin({
            latitude: locationTO.lat,
            longitude: locationTO.lng
        })
        setShowDirections(true);
        mapRef.current?.fitToCoordinates([{
            latitude: locationFrom.lat,
            longitude: locationFrom.lng
        }, {
            latitude: locationTO.lat,
            longitude: locationTO.lng
        }], {edgePadding});
        //}
    };


    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                // initialRegion={INITIAL_POSITION}
            >
                {origin && <Marker coordinate={origin} />}
                {destination && <Marker coordinate={destination} />}
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
                    onPress={() => {
                        navigation.goBack();

                    }}>
                    <Text>Back</Text>
                </TouchableOpacity>
                {distance && duration ? (
                    <View>
                  {/*      <TouchableOpacity
                                          onPress={() => {
                                              navigation.goBack();

                                          }}>
                           <Text>Back</Text>
                        </TouchableOpacity>*/}
                        <Text>Distance: {distance.toFixed(2)}</Text>
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
        backgroundColor: "white",
        shadowColor: "black",
        shadowOffset: { width: 2, height: 2 },
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
    buttonText: {
        textAlign: "center",
    },
});