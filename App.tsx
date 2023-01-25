///import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
// import useColorScheme from './hooks/useColorScheme';
// import Navigation from './navigation';
import LoginScreen from "./screens/LoginScreen";
import Navigation from "./navigation";
import useColorScheme from "./hooks/useColorScheme";
import {useNavigation} from "@react-navigation/native";

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
        <Navigation colorScheme={colorScheme} />
        {/*<LoginScreen />*/}
      </SafeAreaProvider>
    );
  }
}
