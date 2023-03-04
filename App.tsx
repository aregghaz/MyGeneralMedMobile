///import { StatusBar } from 'expo-status-bar';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
// import useColorScheme from './hooks/useColorScheme';
// import Navigation from './navigation';
import Navigation from "./navigation";
import React from "react";
import store from "./store/store";
import {Provider} from "react-redux";
import {AlertNotificationRoot} from "react-native-alert-notification";
import useColorScheme from "./hooks/useColorScheme";

export default function App() {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();

    //
    // <Navigation colorScheme={colorScheme} />
    // <StatusBar />
    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <SafeAreaProvider>
                    <Provider store={store}>
                        <Navigation colorScheme={colorScheme}/>
                    </Provider>
                {/*<LoginScreen />*/}
            </SafeAreaProvider>
        );
    }
}
