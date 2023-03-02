import React, {useEffect, useRef, useState} from 'react';
import {
    SafeAreaView,
    View,
    TextInput,
    Image,
    Text,
    StyleSheet,
    ScrollView,
    StatusBar,
    Animated,
    FlatList, TouchableOpacity,
} from 'react-native';
import {getFeatureViewAnimation} from '../utils';
import {ClientApi} from "../api/client";
import navigation from '../navigation';
import { IClient } from '../types/client';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);



const UPPER_HEADER_HEIGHT = 35;
const UPPER_HEADER_PADDING_TOP = 4;
const LOWER_HEADER_HEIGHT = 85;

export default function Clients({navigation}: any) {
    const animatedValue = useRef(new Animated.Value(0)).current;
    const depositViewAnimation = getFeatureViewAnimation(animatedValue, 40);
    const withdrawViewAnimation = getFeatureViewAnimation(animatedValue, 20);
    const qrViewAnimation = getFeatureViewAnimation(animatedValue, 0);
    const scanViewAnimation = getFeatureViewAnimation(animatedValue, -40);
    const [dataClient, setData] = useState<Array<IClient>>([])
    useEffect(() => {
        (async () => {
            const clientData = await ClientApi.getClientsData()
           /// console.log(clientData, 'clientData')
            setData(clientData.clients)
        })()
    }, [])

    const featureIconCircleAnimation = {
        opacity: animatedValue.interpolate({
            inputRange: [0, 25],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        }),
    };
    const featureNameAnimation = {
        transform: [
            {
                scale: animatedValue.interpolate({
                    inputRange: [0, 30],
                    outputRange: [1, 0],
                    extrapolate: 'clamp',
                }),
            },
        ],
        opacity: animatedValue.interpolate({
            inputRange: [0, 30],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        }),
    };
    const featureIconAnimation = {
        opacity: animatedValue.interpolate({
            inputRange: [0, 50],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        }),
    };
    const textInputAnimation = {
        transform: [
            {
                scaleX: animatedValue.interpolate({
                    inputRange: [0, 50],
                    outputRange: [1, 0],
                    extrapolate: 'clamp',
                }),
            },
            {
                translateX: animatedValue.interpolate({
                    inputRange: [0, 25],
                    outputRange: [0, -100],
                    extrapolate: 'clamp',
                }),
            },
        ],
        opacity: animatedValue.interpolate({
            inputRange: [0, 25],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        }),
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content"/>

            <SafeAreaView>
                <View style={styles.upperHeaderPlaceholder}/>
            </SafeAreaView>

            <SafeAreaView style={styles.header}>
                <View style={styles.upperHeader}>
                    <View style={styles.searchContainer}>
                        <Image
                            source={require('../assets/images/search.png')}
                            style={[styles.icon16, {marginLeft: 8}]}
                        />
                        <AnimatedTextInput
                            placeholder="Search"
                            placeholderTextColor="rgba(255, 255, 255, 0.8)"
                            style={[styles.searchInput, textInputAnimation]}
                        />
                    </View>


                    <Image
                        source={require('../assets/images/avatar.png')}
                        style={styles.avatar}
                    />
                </View>

                <View style={[styles.lowerHeader]}>
                    <Animated.View style={[styles.feature, depositViewAnimation]}>
                        <Animated.Image
                            source={require('../assets/images/map.png')}
                            style={[styles.featureIcon, featureIconAnimation]}
                        />
                        <Animated.Image
                            source={require('../assets/images/map.png')}
                            style={[styles.icon32, featureIconCircleAnimation]}
                        />
                        <Animated.Text style={[styles.featureName, featureNameAnimation]}>
                            Route
                        </Animated.Text>
                    </Animated.View>

                    <Animated.View style={[styles.feature, withdrawViewAnimation]}>
                        <Animated.Image
                            source={require('../assets/images/info.jpeg')}
                            style={[styles.featureIcon, featureIconAnimation]}
                        />
                        <Animated.Image
                            source={require('../assets/images/info.jpeg')}
                            style={[styles.icon32, featureIconCircleAnimation]}
                        />
                        <Animated.Text style={[styles.featureName, featureNameAnimation]}>
                            Info
                        </Animated.Text>
                    </Animated.View>

                    <Animated.View style={[styles.feature, qrViewAnimation]}>
                        <Animated.Image
                            source={require('../assets/images/bell.png')}
                            style={[styles.featureIcon, featureIconAnimation]}
                        />
                        <Animated.Image
                            source={require('../assets/images/bell.png')}
                            style={[styles.icon32, featureIconCircleAnimation]}
                        />
                        <Animated.Text style={[styles.featureName, featureNameAnimation]}>
                           Notification
                        </Animated.Text>
                    </Animated.View>

                    <Animated.View style={[styles.feature, scanViewAnimation]}>
                        <Animated.Image
                            source={require('../assets/images/profit.png')}
                            style={[styles.featureIcon, featureIconAnimation]}
                        />
                        <Animated.Image
                            source={require('../assets/images/profit.png')}
                            style={[styles.icon32, featureIconCircleAnimation]}
                        />
                        <Animated.Text style={[styles.featureName, featureNameAnimation]}>
                            Profit
                        </Animated.Text>
                    </Animated.View>
                </View>
            </SafeAreaView>
            <FlatList
                data={dataClient}
                onScroll={Animated.event([{
                        nativeEvent: {contentOffset: {y: animatedValue}}
                    }],
                    {useNativeDriver: false}
                )}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{marginVertical: 86}}
                renderItem={({item, index}) => {
                    return <TouchableOpacity style={{
                        // height:30,
                        borderRadius: 15,
                        backgroundColor: "white",
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 10
                        },
                        ///transform:[{scale}],
                        padding: 20,
                        margin: 10,
                        ///   opacity,
                        shadowOpacity: .3,
                        shadowRadius: 20
                    }}
                    onPress={() => {
                        navigation.navigate('Modal',{'clientId': item.id})
                    }}
                    >
                        <Text style={styles.listText}>{item.fullName}</Text>
                        <Text style={styles.listText}>{item.pick_up}</Text>
                        <Text style={styles.listText}>{item.origin}</Text>
                        <Text style={styles.listText}>{item.destination}</Text>
                    </TouchableOpacity>
                }}/>

            {/*</ScrollView>*/}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#D63D3D"
    },
    icon16: {
        width: 16,
        height: 16,
    },
    icon32: {
        width: 32,
        height: 32,
    },
    upperHeaderPlaceholder: {
        height: UPPER_HEADER_HEIGHT + UPPER_HEADER_PADDING_TOP,
        paddingTop: UPPER_HEADER_PADDING_TOP,
    },
    header: {
        position: 'absolute',
        width: '100%',
        backgroundColor: "#D63D3D",
    },
    upperHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        height: UPPER_HEADER_HEIGHT + UPPER_HEADER_PADDING_TOP,
        paddingTop: UPPER_HEADER_PADDING_TOP,
    },
    searchContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    featureIcon: {
        width: 20,
        height: 25,
        position: 'absolute',
        top: 8,
    },
    bell: {
        width: 16,
        height: 16,
       // marginHorizontal: 32,
    },
    avatar: {
        width: 28,
        height: 28,
    },
    lowerHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: LOWER_HEADER_HEIGHT,
        paddingHorizontal: 16,
    },
    searchInput: {
        position: 'absolute',
        width: '98%',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        color: 'white',
        borderRadius: 4,
        paddingVertical: 4,
        paddingLeft: 32,
    },
    listText: {},
    feature: {
        alignItems: 'center',
    },
    featureName: {
        fontWeight: 'bold',
        fontSize: 12,
        lineHeight: 14,
        color: '#FFFFFF',
        marginTop: 12,
    },
    spaceForHeader: {
        height: LOWER_HEADER_HEIGHT,
    },
    scrollViewContent: {
        height: 1000,
        backgroundColor: 'white',
    },
});