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
    console.log(clientById, 'clientById')
    return (
        <View style={styles.container}>
            <ScrollView>
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
                <View style={styles.separator} lightColor="#070A52" darkColor="rgba(255,255,255,0.1)"/>
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
                <View style={styles.separator} lightColor="#070A52" darkColor="rgba(255,255,255,0.1)"/>

                <View style={styles.bodyModal}>
                    <View style={styles.listItem}>
                        <Icon name="address-card-o" style={styles.iconItem} size={25} color={iconColor}/>
                        <Text style={styles.textItem}>
                            {clientById.member_uniqie_identifer}
                        </Text>
                    </View>
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
                                          onPress={() => handlerAction(1)}>
                            <Icon name="play-circle-o" style={styles.iconItem} size={30} color={iconColor}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.closeButton}
                                          onPress={() => handlerAction(2)}>
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
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        paddingTop: 15,
        height: "100%"
        /// overflow:"scroll",
        // height:100
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
        borderColor: "#070A52",
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
        ///flex: 20,
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
    address: {
        borderColor: '#070A52',
        borderLeftWidth: 1,
        ///paddingVertical:10,
        paddingHorizontal: 10,
        marginBottom: 10
    },
    buttonIcons: {
        padding: 25,
        flexDirection: 'row',
        // flex:1,
        alignSelf: 'center',

    },
    step: {
        textAlign: "center",
        marginBottom: 10
    }

});
