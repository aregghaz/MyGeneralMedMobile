import {Animated, FlatList, StatusBar, StyleSheet} from 'react-native';
import {Text, View} from '../components/Themed';
import {useEffect, useRef, useState} from "react";
import {ClientApi} from "../api/client";

interface IClient {
    id: string;
    name: string;
    surname: string;
    appointment_time: string;
    origin_name: string;
    destination_name: string;
    destination_street: string;
    destination_suite: string;
    origin_street: string;
    origin_suite: string;

}
const ITEM_SIZE = 160
export default function Clients() {
    const [dataClient, setData] = useState<Array<IClient>>([])
    const scrollY = useRef(new Animated.Value(0)).current
    useEffect(() => {
        (async () => {
            const clientData = await ClientApi.getClientsData()
            console.log(clientData, 'clientData')
            setData(clientData.clients)
        })()
    }, [])
    const AnimatedHeaderValue =new Animated.Value(0)
    const animateHeaderHeight = scrollY.interpolate({
        inputRange:[0,136-50],
        outputRange:[136,50],
        extrapolate:'clamp'
    })
    const animateHeaderHeight2 = scrollY.interpolate({
        inputRange:[0,136-50],
        outputRange:['blue','red'],
        extrapolate:'clamp'
    })
    return (
        <View style={styles.container}>
            <Animated.View style={[styles.header,{
                height:animateHeaderHeight,
                backgroundColor:animateHeaderHeight2
            }]}>
                <Text>jhkhk</Text>
            </Animated.View>
            <Animated.FlatList
                data={dataClient}
                onScroll={Animated.event([{
                        nativeEvent: {contentOffset: {y: scrollY}}
                    }],
                    {useNativeDriver: false}
                )}
                keyExtractor={item => item.id}
               //  contentContainerStyle={{padding:10}}
                renderItem={({item, index}) => {
                    const inputRange =[
                        -1,
                        0,
                        ITEM_SIZE * index,
                        ITEM_SIZE * (index+2),
                    ]
                    const opacityRange =[
                        -1,
                        0,
                        ITEM_SIZE * index,
                        ITEM_SIZE * (index+1),
                    ]
                    const scale = scrollY.interpolate({
                        inputRange,
                        outputRange:[1,1,1,0]
                    })
                    const opacity = scrollY.interpolate({
                        inputRange:opacityRange,
                        outputRange:[1,1,1,0]
                    })
                    return <Animated.View style={{
                        // height:30,
                        borderRadius: 15,
                        backgroundColor:"white",
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 10
                        },
                        transform:[{scale}],
                        padding: 20,
                        margin: 10,
                        opacity,
                        shadowOpacity: .3,
                        shadowRadius: 20
                    }}>
                        <Text style={styles.listText}>{item.name + ' ' + item.surname}</Text>
                        <Text style={styles.listText}>{item.appointment_time}</Text>
                        <Text style={styles.listText}>{item.origin_name}</Text>
                        <Text style={styles.listText}>{item.origin_street}</Text>
                        <Text style={styles.listText}>{item.origin_suite}</Text>


                        {/*<Text style={styles.listText}>{item.id}</Text>*/}

                    </Animated.View>
                }}
            />

        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex:1,
       /// flexDirection: 'row',
        backgroundColor:"#4466b0"
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    list: {
    },
    header:{},
    listText: {
      height:20
    }
});
