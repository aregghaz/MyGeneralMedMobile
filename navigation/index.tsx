/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {DarkTheme, DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {ColorSchemeName} from 'react-native';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import HomeScreen from '../screens/HomeScreen';
import {RootStackParamList} from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import Login from "../screens/LoginScreen";
import {AuthApi} from "../api/auth";
import RouterScreen from "../screens/RouteScreen";
import {AlertNotificationRoot} from "react-native-alert-notification";
import PreRouteScreen from "../screens/PreRouteScreen";

export default function Navigation({colorScheme}: { colorScheme: ColorSchemeName }) {
    return (
        <NavigationContainer
            linking={LinkingConfiguration}
            theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <RootNavigator/>
        </NavigationContainer>
    );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator({navigation}: any) {
    const [user, setUser] = useState(null);
    useEffect(() => {
        checkUser()
    }, [])
    const checkUser = async () => {
        try {
            const userData = await AuthApi.getUser()
            setUser(userData)
        } catch (e) {
            setUser(null)
        }
    }
    // if (user === null) {
    //     return (<View style={{flex: 1, justifyContent: 'center', alignItems: "center"}}>
    //         <ActivityIndicator/>
    //     </View>)
    // }
    return (
        // <AlertNotificationRoot>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
                <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
                <Stack.Screen name="NotFound" component={NotFoundScreen} options={{title: 'Oops!'}}/>
                <Stack.Screen name="DriverRoute" component={RouterScreen} options={{headerShown: false}}/>
                <Stack.Screen name="PreRouteScreen" component={PreRouteScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Modal" component={ModalScreen} options={{headerShown: false}}/>

                {/*<Stack.Group screenOptions={{presentation: 'modal'}}>*/}
                {/*</Stack.Group>*/}

            </Stack.Navigator>
        // </AlertNotificationRoot>
    );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
// const BottomTab = createBottomTabNavigator<RootTabParamList>();

//
// function BottomTabNavigator() {
//     const colorScheme = useColorScheme();
//     const [open, setOpen] = useState<boolean>(false);
//     const openSearch = () => {
//         setOpen(!open);
//         ///navigation.navigate('Modal')
//     };
//     return (
//         <BottomTab.Navigator
//             initialRouteName="HomeScreen"
//             screenOptions={{
//                 tabBarActiveTintColor: Colors[colorScheme].tint,
//             }}>
//             <BottomTab.Screen
//                 name="HomeScreen"
//                 component={HomeScreen}
//                 options={{headerShown:false, tabBarIcon: ({color}) => <TabClientIcon name="code" color={color}/>,}}
//             />
//             <BottomTab.Screen
//                 name="TabTwo"
//                 component={TabTwoScreen}
//                 options={{
//                     title: 'Settings',
//                     tabBarIcon: ({color}) => <TabSettingsIcon name="code" color={color}/>,
//                 }}
//             />
//         </BottomTab.Navigator>
//     );
// }
//
//
// /**
//  * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
//  */
// function TabClientIcon(props: {
//     name: React.ComponentProps<typeof FontAwesome>['name'];
//     color: string;
// }) {
//     return <ClientComponent/>;
// }
//
// function TabSettingsIcon(props: {
//     name: React.ComponentProps<typeof FontAwesome>['name'];
//     color: string;
// }) {
//     return <SettingsComponent/>;
// }
