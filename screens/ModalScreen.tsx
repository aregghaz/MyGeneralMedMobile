import {StatusBar} from 'expo-status-bar';
import {Platform, StyleSheet, TouchableOpacity} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import {Text, View} from '../components/Themed';
import {useEffect, useState} from "react";
import {ClientApi} from "../api/client";
import {IClient} from "../types/client";

const IClientData = {
    id: '',
    name: '',
    surname: '',
    appointment_time: '',
    origin_name: '',
    origin_city: '',
    origin_postal: '',
    destination_name: '',
    destination_street: '',
    destination_suite: '',
    origin_street: "",
    origin_suite: "",
    destination_city: "",
    destination_postal: "",
    trip_id: "",
    pick_up: "",
    origin_comment: "",
    destination_comment: "",
    member_uniqie_identifer: "",
    los: "",
    weight: '',
    height: '',
    gender: {label: ""},
    request_type: {label: ""},


}
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/FontAwesome5';

const iconColor = '#4466b0';
export default function ModalScreen({navigation, route}: any) {
    const {clientId} = route.params
    const [data, setData] = useState<IClient>(IClientData)
    useEffect(() => {
        (async () => {
            const clientData = await ClientApi.getClientData(clientId)
          ////  console.log(clientData, clientId, 'clientData')
            setData(clientData.client)
        })()
    }, [])
    /// console.log(data, '111')
    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <View style={styles.header}>
                    <Text style={styles.titleSection}>{data.name + ' ' + data.surname}</Text>
                    <Text style={styles.titleSmallSection}>{data.trip_id}</Text>
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

                <View style={styles.iconView}>{data.gender.label === 'M' ?
                    <Icon name="male" style={styles.iconItem} size={20} color={iconColor}/> :
                    <Icon name="female" style={styles.iconItem} size={20} color={iconColor}/>}
                </View>
                <View style={styles.iconItem}>
                    <Icon2 name="arrows-alt-v" size={20} color={iconColor}/>
                    <Text>
                        {data.height ? data.height : 0}
                    </Text>
                </View>
                <View style={styles.iconItem}>
                    <Icon2   name="weight"  size={20} color={iconColor}/>
                    <Text >
                        {data.weight ? data.weight : 0}
                    </Text>
                </View>

                <Text style={styles.iconView}>
                    {data.request_type.label}
                </Text>
            </View>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>

            <View style={styles.bodyModal}>
                <View style={styles.listItem}>
                    <Text style={styles.textItem}>
                        {data.member_uniqie_identifer}
                    </Text>
                </View>
                <View style={styles.separatorList} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>

                <View style={styles.listItem}>
                    <Icon name="clock-o" style={styles.iconItem} size={25} color={iconColor}/>
                    <Text style={styles.textItem}>
                        {data.pick_up}
                    </Text>
                </View>
                <View style={styles.separatorList} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>

                <View style={styles.listItem}>
                    <Icon name="ambulance" style={styles.iconItem} size={25} color={iconColor}/>
                    <Text style={styles.textItem}>
                        {data.origin_city + ' ' + data.origin_name + ' ' + data.origin_postal + "\n" + data.origin_street + ' ' + data.origin_suite}
                    </Text>
                    <Icon name="phone" style={styles.iconPhone} size={25} color={iconColor}/>
                </View>
                <View style={styles.separatorList} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>

                <View style={styles.listItem}>
                    <Icon name="comment-o" style={styles.iconItem} size={25} color={iconColor}/>
                    <Text style={styles.textItem}>
                        {data.origin_comment}
                    </Text>
                </View>
                <View style={styles.separatorList} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>

                <View style={styles.listItem}>
                    <Icon name="clock-o" style={styles.iconItem} size={25} color={iconColor}/>
                    <Text style={styles.textItem}>
                        {data.appointment_time}
                    </Text>
                </View>
                <View style={styles.separatorList} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>

                <View style={styles.listItem}>
                    <Icon name="hospital-o" style={styles.iconItem} size={25} color={iconColor}/>
                    <Text style={styles.textItem}>
                        {data.destination_city + ' ' + data.destination_name + '' + data.destination_postal + "\n" + data.destination_street + " " + data.destination_suite}
                    </Text>
                    <Icon name="phone" style={styles.iconPhone} size={25} color={iconColor}/>

                </View>
                <View style={styles.separatorList} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>

                <View style={styles.listItem}>
                    <Icon name="comment-o" style={styles.iconItem} size={25} color={iconColor}/>
                    <Text style={styles.textItem}>
                        {data.destination_comment}
                    </Text>
                </View>
                <View style={styles.separatorList} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>

                <View style={styles.listItem}>
                    <Icon name="wheelchair" style={styles.iconItem} size={25} color={iconColor}/>
                    <Text style={styles.textItem}>
                        {data.los}
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
                                          navigation.navigate('DriverRoute',{
                                              id:clientId
                                          })
                                      }}>
                    <Icon2 name={'route'} size={35} color={iconColor} />
                    </TouchableOpacity>
                </View>
            </View>
            {/* Use a light status bar on iOS to account for the black space above the modal */}
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'}/>
        </View>
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
        flexGrow: 0.5,
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
        flex: 10,
    },
    iconItem: {
        flex: 1,
        flexDirection:"row"
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
    buttonIcons:{
        flexDirection:'row',
        alignSelf: 'center',
    }

});
