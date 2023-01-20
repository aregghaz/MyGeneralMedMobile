import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import {useEffect, useState} from "react";
import {DriverApi} from "../api/driver";

interface IClient{

}
export default function Clients({ navigation }: RootTabScreenProps<'Clients'>) {
  const [data, setData] = useState<Array<IClient>>([])

  useEffect( () => {
    (async () => {
      // const clientData = await DriverApi.getClientsData()
      // setData(clientData)
    })()
  },[])
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clients</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/Clients.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
