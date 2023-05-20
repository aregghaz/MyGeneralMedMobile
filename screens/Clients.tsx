import React, {useRef, useState} from 'react';
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
import {openNotification, openSimpleNotification, timestampToDate} from '../utils';
import {ClientApi} from "../api/client";
import {IClient} from '../types/client';
import {SwipeListView} from 'react-native-swipe-list-view';
import Icon2 from "react-native-vector-icons/FontAwesome5";
import Icon from "react-native-vector-icons/FontAwesome";
import Input from "../components/input/input";
import {useForm} from "react-hook-form";
import {useFocusEffect} from "@react-navigation/native";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);


const START = 1;
const DONE = 2;
const LOWER_HEADER_HEIGHT = 85;
const RED_COLOR = "#D63D3D";
const BORDER_RADIUS = 7;
export default function Clients({navigation}: any) {
    const animatedValue = useRef(new Animated.Value(0)).current;
    const [dataClient, setData] = useState<Array<IClient>>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [query, setQuery] = useState<string>('')


    useFocusEffect(
        React.useCallback(() => {
            (async () => {
                await getTripData();
                setRefreshing(false)
            })();

            //  return () => clientData();
        }, [loading])
    );


    const [refreshing, setRefreshing] = React.useState(false);
    const {control, handleSubmit, formState: {errors}} = useForm()


    const getTripData = async () => {
        const clientData = await ClientApi.getClientsData(query)
        console.log(clientData, 'clientData')
        setData(clientData.clients);
        setRefreshing(false);
    }
    const onRefresh = React.useCallback(async () => {
            setRefreshing(true);
            try {
                await getTripData()
            } catch (error) {
                console.error(error);
            }
        }
        ,
        [refreshing]
    )

    const handlerAction = async (clientId: number, action: number) => {
        let clientData;
        try {
            if (action === START) {
                clientData = await ClientApi.startTrip(clientId)
            } else if (action === DONE) {
                clientData = await ClientApi.doneTrip(clientId)
            }
            if (clientData.status === START) {
                openNotification(clientData, navigation, action)
            } else if (clientData.status === DONE) {
                openSimpleNotification()
            } else {
                if (action === 1) {
                    navigation.navigate('DriverRoute', {
                        id: clientId
                    })
                } else if (action === 2) {
                    setLoading(!loading)
                }
            }
        } catch (e) {
            console.log(e)
        }
    }

    const handlerSearch = async (data: any) => {
        setQuery(data)
        setLoading(!loading)
    }
    return (
        <View style={styles.container}>
            {/*<StatusBar barStyle="light-content"/>*/}
            <SafeAreaView>
                <View style={styles.upperHeader}>
                    <View style={styles.searchContainer}>

                        <View style={styles.searchInput}>
                            <Input
                                placeholder="Search"
                                /// placeholderTextColor="rgba(255, 255, 255, 0.8)"
                                // style={styles.searchInput}
                                control={control} name={'search'} secureTextEntry={false}/>
                        </View>
                        <View style={styles.searchIcon}>
                            <View style={styles.searchIconView}>
                                <Icon name="search" size={20} onPress={handleSubmit(handlerSearch)}
                                      color={'black'}/>
                            </View>
                        </View>
                    </View>

                    <View style={styles.notification}>
                        <View style={styles.searchIconView}>
                            <Icon name="bell-o" size={20}
                                  color={'black'}/>
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
                style={styles.containerInfo}
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
                                onPress={() => handlerAction(data.item.id, 1)}>
                                <View style={[styles.rowBackText, styles.rowBackTextRight]}>
                                    <Icon name="play-circle-o" size={35}
                                          color={'white'}/>
                                    <Text style={styles.rowBackTextLabel}>Start Trip</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={[styles.rowBackText, styles.borderRadiusButton]}>
                                <TouchableOpacity
                                    onPress={() => handlerAction(data.item.id, 2)}>
                                    <View
                                        style={[styles.rowBackText, styles.rowBackTextRight, styles.borderRadiusButton]}>
                                        <Icon name="check-circle-o" size={35}
                                              color={'white'}/>
                                        <Text style={styles.rowBackTextLabel}>Done Trip</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.rowBackText}>
                                <TouchableOpacity
                                    onPress={() => handlerAction(data.item.id, 1)}>
                                    <View
                                        style={[styles.rowBackText, styles.rowBackTextRight, styles.borderRadiusButton]}>
                                        <Icon name="ban" size={35} color={'white'}/>
                                        <Text style={styles.rowBackTextLabel}>On Hold</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>)
                }}
                leftOpenValue={80}
                rightOpenValue={-240}
                ///  useNativeDriver={false}
                renderItem={({item, index}) => {
                    let dateData = item.pick_up.split(':');
                    let pickUp = `${dateData[0]}:${dateData[1]}`
                    return <TouchableHighlight
                        style={styles.container}
                        underlayColor={RED_COLOR}
                        onPress={() => {
                            return navigation.navigate('Modal', {'clientId': item.id})
                        }}
                    >
                        <View style={styles.rowFront}>
                            <Text style={[styles.listText, styles.listTextName]}>
                                <Icon name='user' size={21} color={'black'}/>{' '}
                                {item.fullName}
                                <Text style={styles.tripId}> {item.trip_id}</Text>
                            </Text>
                            <Text style={styles.listTextContainerText}>
                                {item.los}
                            </Text>
                            <View style={styles.listTextContainer}>
                                <Text style={styles.listTextContainerText}>
                                    <View style={{paddingRight: 5}}>
                                        <Icon name='clock-o' size={15} color={'black'}/>
                                    </View>

                                    {timestampToDate(item.date_of_service)} {pickUp}
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

                            <Text style={[styles.listText, styles.listTextOrigin]}>
                                <Icon name="map-marker" size={20} color={"black"}/>{' '}
                                {item.address}.
                            </Text>
                            {/*<Text style={[styles.listText, styles.listTextOrigin]}><Icon name="map-pin" size={20} color={"black"}/> {item.destination}</Text>*/}
                        </View>
                    </TouchableHighlight>
                }}/>

        </View>

    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: RED_COLOR,
        paddingLeft: 2,
        paddingRight: 2,
    },
    searchIcon: {
        display: "flex",
        ///   flex:10,
        flexDirection: "column",
        alignItems: 'flex-start',
        // height:40,
        paddingLeft: 12

    },
    notification: {
        paddingHorizontal: 10
    },
    profile: {
        paddingRight: 10,
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
        borderRadius: 10,
        marginTop: 10
    },
    containerInfo: {
        marginTop: 20
    },

    rowBack: {
        alignItems: 'center',
        backgroundColor: 'transparent',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 2,
        marginTop: 6
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
        borderRadius: BORDER_RADIUS,
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
    borderRadiusButton: {
        borderBottomRightRadius: BORDER_RADIUS,
        borderTopEndRadius: BORDER_RADIUS,
        borderTopLeftRadius: BORDER_RADIUS,
        borderBottomLeftRadius: BORDER_RADIUS,
    },

    rowBackTextLabel: {
        color: "white",
        fontSize: 12,
        fontWeight: "700",
        marginTop: 5,
    },

    upperHeader: {
        width: "98%",
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        height: 50,
        // paddingBottom: 15,
        backgroundColor: "#fff",
        borderRadius: 14,
        marginLeft: "1%",
        marginTop: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {width: 6, height: 1},
        shadowOpacity: 0.6,
        shadowRadius: 7,

    },
    searchContainer: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: 'transparent',
        // paddingLeft: 10
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
        borderColor: "blue",
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

    tripId: {
        fontSize: 12,
        fontStyle: "italic",
        color: "grey",
        fontWeight: '600'
    }
});