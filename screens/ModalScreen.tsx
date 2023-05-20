import {StatusBar} from 'expo-status-bar';
import {Linking, Platform, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, View} from '../components/Themed';
import React, {useState} from "react";
import {ClientApi} from "../api/client";
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import {useDispatch} from "react-redux";
import {useFocusEffect} from '@react-navigation/native';
import {openNotification} from "../utils";
import {IClientData} from "../types/client";
import useDeviceSize from "../hooks/useDeviceSize";


const iconColor = '#D63D3D';
export default function ModalScreen({navigation, route}: any) {
    const {clientId} = route.params
    const dispatch = useDispatch();
    // const client = useSelector(getClientData);
    //  const {clientById} = client;
    const size = useDeviceSize()
    const [clientById, setData] = useState(IClientData)
    // console.log('1111')
    // useFocusEffect(() => {
    //     (async () => {
    //         console.log('aaa')
    //         const clientData = await ClientApi.getClientData(clientId)
    //         console.log(clientData.client)
    //         setData(clientData.client)
    //
    //       //  dispatch(clientAction.fetching({clientById: clientData.client}))
    //     })();
    // })
    useFocusEffect(
        React.useCallback(() => {
            (async () => {
                const clientData: any = await ClientApi.getClientData(clientId)
                // console.log(clientData, 22222)
                setData(clientData.client)
                //  dispatch(clientAction.fetching({clientById: clientData.client}))
            })();

            //  return () => clientData();
        }, [clientId])
    );
    const handlerAction = async (action: number) => {
        let clientData;
        try {
            if (action === 1) {
                clientData = await ClientApi.startTrip(clientId)
            } else if (action === 2) {
                clientData = await ClientApi.doneTrip(clientId)
            }

            if (clientData.status === 1) {
                openNotification(clientData, navigation, action)
            } else if (clientData.status === 2) {

            } else {
                navigation.goBack();
                if (action === 1) {
                    navigation.navigate('DriverRoute', {
                        id: clientId
                    })
                } else if (action === 2) {

                }

            }
        } catch (e) {
            console.log(e)
        }
        //   console.log(clientData,'data')

    }
    const handlerDone = async (id: number) => {
        const clientData = await ClientApi.doneTrip(clientId)
    }

    return (
        <View style={styles.container}>
            {/*<Icon name={"stretcher"} size={30} color={"red"}/>*/}
            <ScrollView style={size.width < 380 ? styles.scrollViewSe : styles.scrollView}>
                <View style={styles.title}>
                    <View style={styles.header}>
                        <Text style={styles.titleSection}>{clientById.fullName}</Text>
                        <Text style={styles.titleSmallSection}>{clientById.trip_id}</Text>
                        <Text style={styles.titleSmallSection}>
                            {clientById.los}
                        </Text>
                    </View>
                    <View style={styles.closeButtonSection}>
                        <TouchableOpacity style={styles.closeButton}
                                          onPress={() => navigation.goBack()}>
                            <Text> <Icon name="close" size={30} color={iconColor}/></Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.separator} lightColor="#070A52" darkColor="rgba(255,255,255,0.1)"/>
                <View style={styles.iconsWrapper}>
                    <View style={styles.iconsSection}>
                        <View style={[ styles.iconView, styles.iconGender]}>{clientById.gender === 'M' ?
                            <Icon name="male" style={styles.iconItem} size={20} color={iconColor}/> :
                            <Icon name="female" style={styles.iconItem} size={20} color={iconColor}/>}
                        </View>

                        <View style={[styles.iconItem, styles.iconView]}>
                            <Icon2 name="arrows-alt-v" size={20} color={iconColor}/>
                            <Text style={styles.iconText}>
                                {clientById.height ? clientById.height : 0}
                            </Text>
                        </View>
                        {/*<View style={[styles.iconItem, styles.iconView]}>*/}
                        {/*    /!*<Icon name={"fa-stretcher"} size={20} color={iconColor}/>*!/*/}
                        {/*</View>*/}
                        {/*<View style={[styles.iconItem, styles.iconView]}>*/}
                        {/*    /!*<Icon name={"fa-stretcher"} size={20} color={iconColor}/>*!/*/}
                        {/*</View>*/}
                        {/*<View style={[styles.iconItem, styles.iconView]}>*/}
                        {/*    /!*<Icon name={"fa-stretcher"} size={20} color={iconColor}/>*!/*/}
                        {/*</View>*/}
                        <View style={[styles.iconItem, styles.iconView]}>
                            <Icon2 name="weight" size={20} color={iconColor}/>
                            <Text style={styles.iconText}>
                                {clientById.weight ? clientById.weight : 0}
                            </Text>
                        </View>
                            <Text style={[styles.iconView, styles.iconPick]}>
                                {clientById.request_type}
                            </Text>

                    </View>
                </View>

                <View style={[styles.separator, styles.separatorCard]} lightColor="#070A52" darkColor="rgba(255,255,255,0.1)"/>

                <View style={styles.bodyModal}>
                    <View  style={ size.width < 380 ? styles.stepsWrapperS : size.width > 500 ? styles.stepsWrapperP : styles.stepsWrapper}>
                        <ScrollView>
                            <View style={[styles.listItem, styles.addressCard]}>
                                <Icon name="address-card-o" style={styles.iconItem} size={25} color={iconColor}/>
                                <Text style={[styles.textItem, styles.textCard]}>
                                    {clientById.member_uniqie_identifer}
                                </Text>
                            </View>
                            <View style={styles.separatorList} lightColor="#070A52" darkColor="rgba(255,255,255,0.1)"/>

                            {/*<View style={styles.separatorList} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>*/}
                            {clientById.address.map((item: {
                                address_comments: string;
                                drop_down: string;
                                stops: number;
                                pick_up: any;
                                address_phone: string;
                                address: string;
                            }, index: number) => {

                                return (<View key={index} style={styles.address}>
                                    <Text style={styles.step}>Step {index + 1}</Text>
                                    <View style={styles.listItem}>
                                        <Icon name="address-book-o" style={styles.iconItem} size={25} color={iconColor}/>
                                        <Text style={styles.textItem}>
                                            {item.address}
                                        </Text>
                                        <Icon name="phone" style={styles.iconPhone} size={25} color={iconColor} onPress={() => {
                                            Linking.openURL('tel:' + item.address_phone);
                                        }}/>
                                    </View>
                                    <View style={styles.separatorList} lightColor="#070A52" darkColor="rgba(255,255,255,0.1)"/>
                                    {
                                        index === 0 ? (<View style={styles.listItem}>
                                            <Icon name="clock-o" style={styles.iconItem} size={25} color={iconColor}/>
                                            <Text style={styles.textItem}>
                                                {item.pick_up}
                                            </Text>
                                        </View>) : (index === clientById.stops ? <><View style={styles.listItem}>
                                            <Icon name="clock-o" style={styles.iconItem} size={25} color={iconColor}/>
                                            <Text style={styles.textItem}>
                                                {item.pick_up}
                                            </Text>
                                        </View><View style={styles.listItem}>
                                            <Icon name="clock-o" style={styles.iconItem} size={25} color={iconColor}/>
                                            <Text style={styles.textItem}>
                                                {item.drop_down}
                                            </Text>
                                        </View></> : <View style={styles.listItem}>
                                            <Icon name="clock-o" style={styles.iconItem} size={25} color={iconColor}/>
                                            <Text style={styles.textItem}>
                                                {item.drop_down}
                                            </Text>
                                        </View>)
                                    }

                                    <View style={styles.separatorList} lightColor="#070A52" darkColor="rgba(255,255,255,0.1)"/>
                                    <View style={styles.listItem}>
                                        <Icon name="comment-o" style={styles.iconItem} size={25} color={iconColor}/>
                                        <Text style={styles.textItem}>
                                            {item.address_comments}
                                        </Text>
                                    </View>

                                    <View style={styles.separatorList} lightColor="#070A52" darkColor="rgba(255,255,255,0.1)"/>
                                </View>)
                            })}

                        </ScrollView>


                    </View>
                    <View style={styles.buttonIcons}>
                        <View style={styles.routeButtons}>
                            <TouchableOpacity style={styles.closeButton}
                                              onPress={() => handlerAction(1)}>
                                <Icon name="play-circle-o" style={styles.iconItem} size={30} color={iconColor}/>
                                <Text style={styles.buttonText}>Start Trip</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.closeButton, styles.routeIcons]}
                                              onPress={() => handlerAction(2)}>
                                <Icon name="check-circle-o" style={styles.iconItem} size={30} color={iconColor}/>
                                <Text style={styles.buttonText}>Done Trip</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.closeButton, styles.routeIcons]}
                                              onPress={() => {
                                                  navigation.goBack();
                                                  navigation.navigate('DriverRoute', {
                                                      id: clientId
                                                  })
                                              }}>
                                <Icon name="ban" style={styles.iconItem} size={30} color={iconColor}/>
                                <Text style={styles.buttonText}>On Hold</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={[styles.closeButton, styles.mapButton, size.width < 380 ? {flexGrow: 1.5} : size.width < 500 ? {flexGrow: 0.5} : {}]}
                                          onPress={() => {
                                              navigation.goBack();
                                              navigation.navigate('DriverRoute', {
                                                  id: clientId
                                              })
                                          }}>
                            <Icon2 name={'route'} size={35} color={iconColor}/>
                            <Text style={styles.buttonText}>Route</Text>
                        </TouchableOpacity>

                    </View>
                </View>
                {/* Use a light status bar on iOS to account for the black space above the modal */}
                <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'}/>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        // paddingTop: 15,
        height: "100%",
        /// overflow:"scroll",
        // height:100
        // backgroundColor: "red"
        // borderStyle: "solid",
        // borderWidth: 2,
        // borderColor: "red"
    },
    scrollView: {
        marginTop:50,
    },

    scrollViewSe: {
        marginTop:20
    },

    header: {
        flex: 1,
        marginVertical: 20,


    },
    title: {
        flexDirection: "row",
        fontSize: 20,
        fontWeight: 'bold',
        borderStyle: "solid",
        borderBottomWidth: 2,
        borderColor: "#D63D3D"
    },
    titleSmallSection: {
        flexDirection: "row",
        fontSize: 10,
        marginHorizontal: 20,
        // borderStyle: "solid",
        // borderWidth: 2,
        // borderColor: "red"
    },
    separator: {
        // borderColor: "#070A52",
        // borderWidth: 1,
        // height: 1,
        flexDirection: "column",
        marginVertical: 10,
        width: '100%',
        // borderStyle: "solid",
        // borderWidth: 2,
        // borderColor: "red"
    },
    separatorList: {
        ///   borderColor: "black",
        ///borderWidth: 1,
        height: 1,
        flexDirection: "column",
        marginVertical: 6,
        width: '100%',
        // borderStyle: "solid",
        // borderWidth: 2,
        // borderColor: "red"
    },
    titleSection: {
        flexGrow: 5,
        marginHorizontal: 20,
        fontSize: 20,
        fontWeight: "bold",

    },
    closeButtonSection: {
        marginHorizontal: 20,
        marginVertical: 20,
        // borderWidth: 1
    },
    closeButton: {
        // marginHorizontal: 10,
        fontSize: 20,
        marginLeft: 10,
        fontWeight: 'bolder',
        alignItems:"center",
        justifyContent: "center",
        padding: 2,
    },
    routeIcons: {
        marginLeft: 15,
    },
    stepsWrapperS: {
      height: 350,
    },
    bodyModal: {
        paddingHorizontal: 20,
        ///flex: 20,
        height: "100%",
        // borderWidth: 1,
        // overflow:"hidden"
    },

    stepsWrapper: {
        width: "100%",
        height: 490,
        overflow: "scroll"
    },

    stepsWrapperP: {
      height: 800
    },

    stepsWrapperSe:{
        height: 300
    },
    listItem: {
        //  paddingLeft: 8,
        // width: 100,\
        //flex: 1,
        flexDirection: 'row',
        // minHeight: 60
        // borderWidth: 1,
        // height: 40,
        flex:1,
        alignItems: "center",
        justifyContent: "center",
        padding: 7

    },
    textItem: {
        alignSelf: 'flex-start',
        fontSize: 15,
        flex: 8,
        // borderWidth: 2,
        // height: 'auto'
    },
    iconItem: {
        flex: 1,
        /// justifyContent:'flex-start',
        flexDirection: "row",
        justifyContent: "center",
    },
    iconText: {
        color: "#fff",
        marginLeft: 5
    },

    iconPick: {
        textAlign: "center",
        paddingVertical: 15,
        paddingHorizontal: 13
    },
    iconGender : {
        paddingVertical: 13
    },

    iconPhone: {
        // alignItems: 'center',
        // justifyContent: "flex-end",
        // flex: 2,
        // borderWidth: 2,
        paddingLeft: 10
    },

    iconsWrapper: {
        width: "100%",
        // borderWidth: 1,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: "5%"
    },

    iconsSection: {
        alignSelf: 'flex-start',
        flexDirection: "row",
        paddingHorizontal: 15,
        width: "95%",
        height: 50,
        borderRadius: 9,
        backgroundColor: "#373737"
    },
    iconView: {
        fontSize: 15,
        flex: 1,
        backgroundColor: "#373737",
        width: 100,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
    },
    address: {
        paddingHorizontal: 10,
        marginBottom: 10
    },
    buttonIcons: {
        paddingVertical:  5,
        flexDirection: 'row',
        justifyContent: "space-between",
        // flex:1,
        // alignSelf: 'center',
        // borderWidth: 1,
        marginTop: 10,
        backgroundColor: "#373737",
        borderRadius: 9,
        width: "100%"
    },
    step: {
        textAlign: "center",
        marginBottom: 10
    },

    addressCard : {
        width: "98%",
        height: 30,
        flex: 1,
        // borderWidth: 1,
        paddingLeft: 10,
        padding: 2
    },

    textCard : {
        marginTop: 4
    },

    separatorCard : {
        width: "80%"
    },

    mapButton: {
        borderLeftWidth: 2,
        borderLeftColor : "#fff",
        // paddingLeft: 15,
        marginLeft: 30,
        flexGrow: 0.2,
    },

    buttonText : {
        color: "#fff",
        textAlign: 'center',
        marginTop: 8
    },

    routeButtons: {
        flexDirection: "row",
        backgroundColor: "transparent",
    }
});
