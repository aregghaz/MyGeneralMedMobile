import React, {ChangeEvent} from 'react'
import {TextInput, StyleSheet, View} from "react-native";

interface IInput {
    error?: string
    placeholder:string
    value:string
    secureTextEntry:boolean
    setValue:(value:string) =>  void


}

const Input: React.FC<IInput> = ({error,placeholder, value, setValue,secureTextEntry}) => (
    <View style={styles.container}>
        <TextInput
            placeholder={placeholder}
            style={styles.input}
            value={value}
            onChangeText={setValue}
            secureTextEntry={secureTextEntry}
        />
    </View>
)

const styles = StyleSheet.create({
    container:{
        backgroundColor:"white",
        width: "100%",
        borderColor:"#4466b0",
        borderWidth:1,
        borderRadius:5,
        padding:10,
        marginVertical:5

    },
    input:{}
})
export default Input
