/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {FontAwesome} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {ActivityIndicator, ColorSchemeName, Pressable} from 'react-native';
import ClientComponent from '../assets/images/Clients';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import Clients from '../screens/Clients';
import TabTwoScreen from '../screens/TabTwoScreen';
import {RootStackParamList, RootTabParamList, RootTabScreenProps} from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import SettingsComponent from "../assets/images/Settings";
import Login from "../screens/LoginScreen";
import {useEffect, useState} from "react";
import {AuthApi} from "../api/auth";

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
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
            <Stack.Screen name="Home" component={BottomTabNavigator} options={{headerShown: false}}/>
            <Stack.Screen name="NotFound" component={NotFoundScreen} options={{title: 'Oops!'}}/>
            <Stack.Group screenOptions={{presentation: 'modal'}}>
                <Stack.Screen name="Modal"  component={ModalScreen}  options={{headerShown: false}}/>
            </Stack.Group>

        </Stack.Navigator>
    );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();


function BottomTabNavigator() {
    const colorScheme = useColorScheme();
    const [open, setOpen] = useState<boolean>(false);
    const openSearch = () => {
        setOpen(!open);
        ///navigation.navigate('Modal')
    };
    return (
        <BottomTab.Navigator
            initialRouteName="Clients"
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme].tint,
            }}>
            <BottomTab.Screen
                name="Clients"
                component={Clients}
                options={{headerShown:false}}
            />
            <BottomTab.Screen
                name="TabTwo"
                component={TabTwoScreen}
                options={{
                    title: 'Settings',
                    tabBarIcon: ({color}) => <TabSettingsIcon name="code" color={color}/>,
                }}
            />
        </BottomTab.Navigator>
    );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabClientIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
}) {
    return <ClientComponent/>;
}

function TabSettingsIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
}) {
    return <SettingsComponent/>;
}
