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
    gender: {label: ""},


}
import Icon from 'react-native-vector-icons/FontAwesome';

const iconColor = '#4466b0';
export default function ModalScreen({navigation, route}: any) {
    const {clientId} = route.params
    const [data, setData] = useState<IClient>(IClientData)
    useEffect(() => {
        (async () => {
            const clientData = await ClientApi.getClientData(clientId)
            console.log(clientData, clientId, 'clientData')
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
            <View>

                <Text>{data.gender.label === 'M' ? <Icon name="male" style={styles.iconItem} size={25} color={iconColor}/> :
                    <Icon name="female" style={styles.iconItem} size={25} color={iconColor}/>}</Text>
            </View>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>

            <View style={styles.bodyModal}>

                <View style={styles.listItem}>
                    <Icon name="clock-o" style={styles.iconItem} size={25} color={iconColor}/>
                    <Text style={styles.textItem}>
                        {data.pick_up}
                    </Text>
                </View>
                <View style={styles.listItem}>
                    <Icon name="ambulance" style={styles.iconItem} size={25} color={iconColor}/>
                    <Text style={styles.textItem}>
                        {data.origin_city + ' ' + data.origin_name + ' ' + data.origin_postal + "\n" + data.origin_street + ' ' + data.origin_suite}
                    </Text>
                    <Icon name="phone" style={styles.iconItem2} size={25} color={iconColor}/>
                </View>
                <View style={styles.listItem}>
                    <Icon name="comment-o" style={styles.iconItem} size={25} color={iconColor}/>
                    <Text style={styles.textItem}>
                        {data.origin_comment}
                    </Text>
                </View>

                <View style={styles.listItem}>
                    <Icon name="clock-o" style={styles.iconItem} size={25} color={iconColor}/>
                    <Text style={styles.textItem}>
                        {data.appointment_time}
                    </Text>
                </View>
                <View style={styles.listItem}>
                    <Icon name="hospital-o" style={styles.iconItem} size={25} color={iconColor}/>
                    <Text style={styles.textItem}>
                        {data.destination_city + ' ' + data.destination_name + '' + data.destination_postal + "\n" + data.destination_street + " " + data.destination_suite}
                    </Text>
                    <Icon name="phone" style={styles.iconItem2} size={25} color={iconColor}/>

                </View>
                <View style={styles.listItem}>
                    <Icon name="comment-o" style={styles.iconItem} size={25} color={iconColor}/>
                    <Text style={styles.textItem}>
                        {data.destination_comment}
                    </Text>
                </View>

                <View style={styles.listItem}>
                    <Icon name="wheelchair" style={styles.iconItem} size={25} color={iconColor}/>
                    <Text style={styles.textItem}>
                        {data.los}
                    </Text>
                </View>
                <View style={styles.listItem}>
                    <Icon name="globe" style={styles.iconItem} size={25} color={iconColor}/>
                    <Text style={styles.textItem}>
                        {data.member_uniqie_identifer}
                    </Text>
                </View>
                <View style={styles.listItem}>
                    <Icon name="close" style={styles.iconItem} size={30} color={iconColor}/>
                </View>
                <View style={styles.listItem}>
                    <Icon name="ambulance" style={styles.iconItem} size={30} color={iconColor}/>
                </View>
                <View style={styles.listItem}>
                    <Icon name="hospital-o" style={styles.iconItem} size={30} color={iconColor}/>
                </View>
                <View style={styles.listItem}>
                    <Icon name="comment-o" style={styles.iconItem} size={30} color={iconColor}/>
                </View>
                <View style={styles.listItem}>
                    <Icon name="comments-o" style={styles.iconItem} size={30} color={iconColor}/>
                </View>

                <View style={styles.listItem}>
                    <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
                </View>
                <EditScreenInfo path="/screens/ModalScreen.tsx"/>
            </View>
            {/* Use a light status bar on iOS to account for the black space above the modal */}
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        flex: 1,
        marginVertical: 20,
    },
    title: {
        flexDirection: "row",
        // display:"flex",
        fontSize: 20,
        /// width: "100%",
        fontWeight: 'bold',
    },
    titleSmallSection: {
        flexDirection: "row",
        fontSize: 10,
        marginHorizontal: 20,
        ///flexDirection: "column",
    },
    separator: {
        /// marginVertical: 30,
        borderColor: "black",
        borderWidth: 1,
        height: 1,
        flexDirection: "column",
        marginVertical: 1,
        width: '100%',
    },
    titleSection: {
        flexGrow: 5,
        marginHorizontal: 20,
        fontSize: 20,
        fontWeight: "bold"
        ///alignSelf:"flex-start"
        // textAlign:"left"
    },
    closeButtonSection: {
        marginHorizontal: 20,
        marginVertical: 20,
    },
    closeButton: {
        flexGrow: 0.5,
        fontSize: 20,
        fontWeight: 'bolder',
        ///alignSelf:"flex-end",
        // textAlign:"right"
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
        minHeight: 60
    },
    textItem: {
        justifyContent: 'flex-start',
        ///textAlign:'center',
        ///    textAlign:'start',
        //  marginRight: 10,
        fontSize: 15,
        flex: 10,
        //  fontFamily: 'TAHOMA'
    },
    iconItem: {
        flex: 1,
    },
    iconItem2: {
        alignItems: 'flex-end',
        flex: 1,

    }

});
