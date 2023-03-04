import React, {useEffect, useRef, useState} from 'react';
import {
    Animated,
    Image,
    RefreshControl,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    View,
} from 'react-native';
import {getFeatureViewAnimation} from '../utils';
import {ClientApi} from "../api/client";
import {IClient} from '../types/client';
import {SwipeListView} from 'react-native-swipe-list-view';
import Icon2 from "react-native-vector-icons/FontAwesome5";
import Icon from "react-native-vector-icons/FontAwesome";
import Input from "../components/input/input";
import {useForm} from "react-hook-form";
import {ALERT_TYPE, AlertNotificationRoot, Dialog} from "react-native-alert-notification";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);


const UPPER_HEADER_HEIGHT = 35;
const UPPER_HEADER_PADDING_TOP = 4;
const LOWER_HEADER_HEIGHT = 85;
const RED_COLOR = "#D63D3D";
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
    const [refreshing, setRefreshing] = React.useState(false);
    const {control, handleSubmit, formState: {errors}} = useForm()

    const onRefresh = React.useCallback(async () => {
            setRefreshing(true);
            try {
                const clientData = await ClientApi.getClientsData()
                console.log(clientData);
                setData(clientData.clients);
                setRefreshing(false)
            } catch (error) {
                console.error(error);
            }
        }
        ,
        [refreshing]
    )
    const handlerStart = async (clientId: number) => {
        // const clientData = await ClientApi.startTrip(clientId)
        let clientData
        try {
            clientData = await ClientApi.startTrip(clientId)

            if (clientData.status === 1) {
                console.log(clientData, clientId, 'data')
                Dialog.show({
                    type: ALERT_TYPE.DANGER,
                    title: clientData.tripId,
                    textBody: 'You can\'t start a new trip until you have not completed a previous trip',
                    button: 'Go',
                    onPressButton: async () => {
                        Dialog.hide()
                        /// navigation.goBack();
                        await navigation.navigate('Modal', {'clientId': clientId})

                    }
                })
            } else {
                navigation.goBack();
                navigation.navigate('DriverRoute', {
                    id: clientId
                })
            }
        } catch (e) {
            console.log(e)
        }
        return clientData;
        //   console.log(clientData,'data')

    }

    return (<AlertNotificationRoot>
            <View style={styles.container}>
                {/*<StatusBar barStyle="light-content"/>*/}
                <SafeAreaView>
                    <View style={styles.upperHeader}>
                        <View style={styles.searchContainer}>
                            <View style={styles.searchIcon}>
                                <View style={styles.searchIconView}>
                                    <Icon name="search" size={30}
                                          color={'white'}/>
                                </View>
                            </View>
                            <View style={styles.searchInput}>
                                <Input
                                    placeholder="Search"
                                    /// placeholderTextColor="rgba(255, 255, 255, 0.8)"
                                    ///  style={styles.searchInput}
                                    control={control} name={'search'} secureTextEntry={false}/>
                            </View>

                        </View>

                        <View style={styles.notification}>
                            <View style={styles.searchIconView}>
                                <Icon name="bell-o" size={30}
                                      color={'white'}/>
                            </View>
                        </View>
                        <View style={styles.profile}>
                            <Image
                                source={require('../assets/images/avatar.png')}
                                style={styles.avatar}
                            />
                        </View>
                    </View>

                </SafeAreaView>
                <SwipeListView
                    //  style={styles.container}
                    data={dataClient}
                    keyExtractor={(item) => item.id.toString()}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
                    }
                    onScroll={Animated.event([{
                            nativeEvent: {contentOffset: {y: animatedValue}}
                        }],
                        {useNativeDriver: false}
                    )}
                    previewRowKey={"1"}
                    stopLeftSwipe={40}
                    stopRightSwipe={-240}
                    swipeToOpenPercent={34}
                    previewOpenValue={-40}
                    leftActionValue={10}
                    rightActionValue={-20}
                    previewOpenDelay={1000}
                    renderHiddenItem={(data: any, rowMap) => {
                        console.log(data, 'datadata')
                        return (<View style={styles.rowBack}>
                            <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate('DriverRoute', {
                                            id: data.item.id
                                        })
                                    }}>
                                    <View style={[styles.rowBackText, styles.rowBackTextLeft]}>
                                        <Icon2 name={'route'} size={35} color={'white'}/>
                                        <Text style={styles.rowBackTextLabel}>Route</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.backRightBtn, styles.backRightBtnLeft]}>
                                <TouchableOpacity
                                    onPress={() => {
                                        handlerStart(data.item.id).then((clientData: any) => {
                                            if (clientData.status === 1) {
                                                ///  console.log(clientData,clientId, 'data')
                                                Dialog.show({
                                                    type: ALERT_TYPE.DANGER,
                                                    title: clientData.tripId,
                                                    textBody: 'You can\'t start a new trip until you have not completed a previous trip',
                                                    button: 'Go',
                                                    onPressButton: () => {
                                                        Dialog.hide()
                                                        /// navigation.goBack();
                                                        console.log(clientData.clientId, 'clientData.clientId')
                                                        navigation.navigate('Modal', {'clientId': clientData.clientId})

                                                    }
                                                })
                                            } else {
                                                navigation.goBack();
                                                navigation.navigate('DriverRoute', {
                                                    id: clientData.clientId
                                                })
                                            }
                                        })
                                    }}>
                                    <View style={[styles.rowBackText, styles.rowBackTextRight]}>
                                        <Icon name="play-circle-o" size={35}
                                              color={'white'}/>
                                        <Text style={styles.rowBackTextLabel}>Start Trip</Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.rowBackText}>
                                    <Icon name="check-circle-o" size={35}
                                          color={'white'}/>
                                    <Text style={styles.rowBackTextLabel}>Done Trip</Text>
                                </View>
                                <View style={styles.rowBackText}>
                                    <Icon name="ban" size={35} color={'white'}/>
                                    <Text style={styles.rowBackTextLabel}>On Hold</Text>
                                </View>
                            </View>

                        </View>)
                    }}
                    leftOpenValue={80}
                    rightOpenValue={-240}
                    ///  useNativeDriver={false}
                    renderItem={({item, index}) => {
                        return <TouchableHighlight
                            style={styles.container}
                            underlayColor={RED_COLOR}
                            onPress={() => {
                                navigation.navigate('Modal', {'clientId': item.id})
                            }}
                        >
                            <View style={styles.rowFront}>
                                <Text style={[styles.listText, styles.listTextName]}><Icon name='user' size={21}
                                                                                           color={'black'}/> {item.fullName}
                                </Text>
                                <View style={styles.listTextContainer}>
                                    <Text style={styles.listTextContainerText}><Icon name='clock-o' size={15}
                                                                                     color={'black'}/> {item.pick_up} - {item.drop_down}
                                    </Text>
                                    <Text style={styles.listTextContainerText}>|</Text>
                                    <Text style={styles.listTextContainerText}>
                                        {item.los}
                                    </Text>
                                    <Text style={styles.listTextContainerText}>|</Text>
                                    <Text style={styles.listTextContainerText}>
                                        W:{' '}
                                        {item.weight ? item.weight : 0}
                                    </Text>
                                    <Text style={styles.listTextContainerText}>|</Text>
                                    <Text style={styles.listTextContainerText}>
                                        H:{' '}
                                        {item.height ? item.height : 0}
                                    </Text>
                                </View>

                                <Text style={[styles.listText, styles.listTextOrigin]}><Icon name="map-marker" size={20}
                                                                                             color={"black"}/> {item.origin}.
                                </Text>
                                {/*<Text style={[styles.listText, styles.listTextOrigin]}><Icon name="map-pin" size={20} color={"black"}/> {item.destination}</Text>*/}
                            </View>
                        </TouchableHighlight>
                    }}/>

            </View></AlertNotificationRoot>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: RED_COLOR,

    },
    searchIcon: {
        display: "flex",
        ///   flex:10,
        flexDirection: "column",
        alignItems: 'flex-start',
        // height:40,

    },
    notification: {
        paddingHorizontal: 10
    },
    profile: {
        paddingRight: 10
    },
    searchIconView: {
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: "column",
        height: 45
    },

    rowFront: {
        alignItems: 'flex-start',
        backgroundColor: 'white',
        borderBottomColor: 'black',
        paddingHorizontal: 20,
        justifyContent: 'space-evenly',
        height: 150,
        marginVertical: 1,
        borderRadius: 10
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: 'transparent',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 2,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        // width: 180,
        height: 140,
    },
    backRightBtnLeft: {
        // flexWrap: "wrap",
        backgroundColor: "transparent",
        width: 240,
        height: 140,
        borderRadius: 10,
        // marginHorizontal:-5,
        justifyContent: "space-evenly",
        flexDirection: "row",
        alignItems: 'center',
    },

    backRightBtnRight: {
        flexWrap: "wrap",
        alignItems: 'flex-end',
    },

    rowBackText: {
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: RED_COLOR,
        borderRadius: 10,
        backgroundColor: "black",
        width: 80,
        height: 140,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        fontSize: 20,
    },

    rowBackTextLeft: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    },

    rowBackTextRight: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
    },

    rowBackTextLabel: {
        color: "white",
        fontSize: 12,
        fontWeight: "700",
        marginTop: 5,
    },

    upperHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        //paddingHorizontal: 10,
        height: 50,
        paddingBottom: 15,
    },
    searchContainer: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: 'transparent',
        paddingLeft: 10
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

    searchInput: {
        flexDirection: "column",
        alignItems: 'flex-end',
        width: '90%',
        color: 'white',
        borderRadius: 4,
        paddingVertical: 0,
        paddingLeft: 5,
        height: 35,
    },

    listTextContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },

    listTextContainerText: {
        marginRight: 5,
        fontWeight: "500",
        fontSize: 15,
        wordSpacing: 15,
    },

    listText: {},

    listTextName: {
        fontSize: 22,
        fontWeight: "600",
    },

    listTextDropdown: {
        fontSize: 15,
        fontWeight: "700",
    },

    listTextOrigin: {
        fontSize: 20,
        fontWeight: "500",
        //  textAlign:'justify'
    },

    feature: {
        alignItems: 'center',
    },


});