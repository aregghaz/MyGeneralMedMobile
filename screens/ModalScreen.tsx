import {StatusBar} from 'expo-status-bar';
import {Linking, Platform, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, View} from '../components/Themed';
import React, {useState} from "react";
import {ClientApi} from "../api/client";
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import {useDispatch} from "react-redux";
import {ALERT_TYPE, AlertNotificationRoot, Dialog} from 'react-native-alert-notification';
import {useFocusEffect} from '@react-navigation/native';

const IClientData = {
    id: 0,
    trip_id: 0,
    fullName: '',
    gender: "",
    pick_up_address: "",
    los: "",
    phone_number: "",
    date_of_service: "",
    appointment_time: "",
    pick_up: "",
    drop_down: "",
    request_type: 0,
    status: 0,
    origin: "",
    origin_id: "",
    origin_phone: "",
    origin_comment: '',
    destination: '',
    destination_id: '',
    destination_phone: '',
    destination_comment: '',
    height: 0,
    weight: 0,
    escortType: 0,
    type_of_trip: 0,
    miles: 0,
    member_uniqie_identifer: 0,
    birthday: 0,
    additionalNote: '',
    operator_note: ''
}

const iconColor = '#D63D3D';
export default function ModalScreen({navigation, route}: any) {
    const {clientId} = route.params
    const dispatch = useDispatch();
    // const client = useSelector(getClientData);
    //  const {clientById} = client;

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
                console.log(clientData, 22222)
                setData(clientData.client)
                //  dispatch(clientAction.fetching({clientById: clientData.client}))
            })();

            //  return () => clientData();
        }, [clientId])
    );
    const handlerStart = async () => {
        // const clientData = await ClientApi.startTrip(clientId)
        try {
            const clientData = await ClientApi.startTrip(clientId)

            if (clientData.status === 1) {
                console.log(clientData, 'data')
                Dialog.show({
                    type: ALERT_TYPE.DANGER,
                    title: clientData.tripId,
                    textBody: 'You can\'t start a new trip until you have not completed a previous trip',
                    button: 'Go',
                    onPressButton: () => {
                        navigation.navigate('Modal', {'clientId': clientData.clientId})
                        Dialog.hide()
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
        //   console.log(clientData,'data')

    }
    const handlerDone = async (id: number) => {
        const clientData = await ClientApi.doneTrip(clientId)
    }
    console.log(clientById, 'clientById')
    return (<AlertNotificationRoot>
            <View style={styles.container}>
                <View style={styles.title}>
                    <View style={styles.header}>
                        <Text style={styles.titleSection}>{clientById.fullName}</Text>
                        <Text style={styles.titleSmallSection}>{clientById.trip_id}</Text>
                    </View>
                    <View style={styles.closeButtonSection}>
                        <TouchableOpacity style={styles.closeButton}
                                          onPress={() => navigation.goBack()}>
                            <Text> <Icon name="close" size={30} color={iconColor}/></Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
                <View style={styles.iconsSection}>

                    <View style={styles.iconView}>{clientById.gender === 'M' ?
                        <Icon name="male" style={styles.iconItem} size={20} color={iconColor}/> :
                        <Icon name="female" style={styles.iconItem} size={20} color={iconColor}/>}
                    </View>
                    <View style={styles.iconItem}>
                        <Icon2 name="arrows-alt-v" size={20} color={iconColor}/>
                        <Text>
                            {clientById.height ? clientById.height : 0}
                        </Text>
                    </View>
                    <View style={styles.iconItem}>
                        <Icon2 name="weight" size={20} color={iconColor}/>
                        <Text>
                            {clientById.weight ? clientById.weight : 0}
                        </Text>
                    </View>

                    <Text style={styles.iconView}>
                        {clientById.request_type}
                    </Text>
                </View>
                <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>

                <View style={styles.bodyModal}>
                    <View style={styles.listItem}>
                        <Icon name="address-card-o" style={styles.iconItem} size={25} color={iconColor}/>
                        <Text style={styles.textItem}>
                            {clientById.member_uniqie_identifer}
                        </Text>
                    </View>
                    <View style={styles.separatorList} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>

                    <View style={styles.listItem}>
                        <Icon name="clock-o" style={styles.iconItem} size={25} color={iconColor}/>
                        <Text style={styles.textItem}>
                            {clientById.pick_up}
                        </Text>
                    </View>
                    <View style={styles.separatorList} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>

                    <View style={styles.listItem}>
                        <Icon name="address-book-o" style={styles.iconItem} size={25} color={iconColor}/>
                        <Text style={styles.textItem}>
                            {clientById.origin}
                        </Text>
                        <Icon name="phone" style={styles.iconPhone} size={25} color={iconColor} onPress={() => {
                            Linking.openURL('tel:' + clientById.origin_phone);
                        }}/>
                    </View>
                    <View style={styles.separatorList} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>

                    <View style={styles.listItem}>
                        <Icon name="comment-o" style={styles.iconItem} size={25} color={iconColor}/>
                        <Text style={styles.textItem}>
                            {clientById.origin_comment}
                        </Text>
                    </View>
                    <View style={styles.separatorList} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>

                    <View style={styles.listItem}>
                        <Icon name="clock-o" style={styles.iconItem} size={25} color={iconColor}/>
                        <Text style={styles.textItem}>
                            {clientById.pick_up}
                        </Text>
                    </View>
                    <View style={styles.separatorList} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>

                    <View style={styles.listItem}>
                        <Icon name="hospital-o" style={styles.iconItem} size={25} color={iconColor}/>
                        <Text style={styles.textItem}>
                            {clientById.destination}
                        </Text>
                        <Icon name="phone" style={styles.iconPhone} size={25} color={iconColor} onPress={() => {
                            Linking.openURL('tel:' + clientById.destination_phone);
                        }}/>

                    </View>
                    <View style={styles.separatorList} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>

                    <View style={styles.listItem}>
                        <Icon name="comment-o" style={styles.iconItem} size={25} color={iconColor}/>
                        <Text style={styles.textItem}>
                            {clientById.destination_comment}
                        </Text>
                    </View>
                    <View style={styles.separatorList} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>

                    <View style={styles.listItem}>
                        <Icon name="wheelchair" style={styles.iconItem} size={25} color={iconColor}/>
                        <Text style={styles.textItem}>
                            {clientById.los}
                        </Text>
                    </View>
                    <View style={styles.separatorList} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>

                    {/*<View style={styles.listItem}>*/}
                    {/*    <Icon name="close" style={styles.iconItem} size={30} color={iconColor}/>*/}
                    {/*</View>*/}
                    {/*<View style={styles.listItem}>*/}
                    {/*    <Icon name="ambulance" style={styles.iconItem} size={30} color={iconColor}/>*/}
                    {/*</View>*/}
                    {/*<View style={styles.listItem}>*/}
                    {/*    <Icon name="hospital-o" style={styles.iconItem} size={30} color={iconColor}/>*/}
                    {/*</View>*/}
                    {/*<View style={styles.listItem}>*/}
                    {/*    <Icon name="comment-o" style={styles.iconItem} size={30} color={iconColor}/>*/}
                    {/*</View>*/}
                    {/*<View style={styles.listItem}>*/}
                    {/*    <Icon name="comments-o" style={styles.iconItem} size={30} color={iconColor}/>*/}
                    {/*</View>*/}

                    {/*<View style={styles.listItem}>*/}
                    {/*    <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>*/}
                    {/*</View>*/}
                    {/*<EditScreenInfo path="/screens/ModalScreen.tsx"/>*/}
                    <View style={styles.buttonIcons}>

                        <TouchableOpacity style={styles.closeButton}
                                          onPress={() => {
                                              navigation.goBack();
                                              navigation.navigate('DriverRoute', {
                                                  id: clientId
                                              })
                                          }}>
                            <Icon2 name={'route'} size={35} color={iconColor}/>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.closeButton}
                                          onPress={() => handlerStart()}>
                            <Icon name="play-circle-o" style={styles.iconItem} size={30} color={iconColor}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.closeButton}
                                          onPress={() => {
                                              navigation.goBack();
                                              handlerDone(clientId)
                                          }}>
                            <Icon name="check-circle-o" style={styles.iconItem} size={30} color={iconColor}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.closeButton}
                                          onPress={() => {
                                              navigation.goBack();
                                              navigation.navigate('DriverRoute', {
                                                  id: clientId
                                              })
                                          }}>
                            <Icon name="ban" style={styles.iconItem} size={30} color={iconColor}/>
                        </TouchableOpacity>

                    </View>
                </View>
                {/* Use a light status bar on iOS to account for the black space above the modal */}
                <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'}/>
            </View>
        </AlertNotificationRoot>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 1,
        marginVertical: 20,
    },
    title: {
        flexDirection: "row",
        fontSize: 20,
        fontWeight: 'bold',
    },
    titleSmallSection: {
        flexDirection: "row",
        fontSize: 10,
        marginHorizontal: 20,
    },
    separator: {
        borderColor: "black",
        borderWidth: 1,
        height: 1,
        flexDirection: "column",
        marginVertical: 10,
        width: '100%',
    },
    separatorList: {
        ///   borderColor: "black",
        ///borderWidth: 1,
        height: 1,
        flexDirection: "column",
        marginVertical: 6,
        width: '100%',

    },
    titleSection: {
        flexGrow: 5,
        marginHorizontal: 20,
        fontSize: 20,
        fontWeight: "bold"
    },
    closeButtonSection: {
        marginHorizontal: 20,
        marginVertical: 20,
    },
    closeButton: {
        flexGrow: 0,
        marginHorizontal: 25,
        fontSize: 20,
        fontWeight: 'bolder',
    },
    bodyModal: {
        paddingHorizontal: 20,
        flex: 20,
        height: "100%"
    },
    listItem: {
        //  paddingLeft: 8,
        // width: 100,\
        //flex: 1,
        flexDirection: 'row',
        // minHeight: 60
    },
    textItem: {
        alignSelf: 'flex-start',
        fontSize: 15,
        flex: 8,
    },
    iconItem: {
        flex: 1,
        /// justifyContent:'flex-start',
        flexDirection: "row"
    },
    iconPhone: {
        alignItems: 'flex-end',
        flex: 1,

    },
    iconsSection: {
        ///flex: 1,
        alignSelf: 'flex-start',
        //flexWrap: 'wrap',
        flexDirection: "row",
        paddingHorizontal: 20
    },
    iconView: {
        alignSelf: 'flex-start',
        fontSize: 15,
        flex: 1,
        /// justifyContent: "flex-start",
        marginHorizontal: 5,
        ///flexWrap: 'wrap',

    },
    buttonIcons: {
        padding: 25,
        flexDirection: 'row',
        // flex:1,
        alignSelf: 'center',

    }

});
