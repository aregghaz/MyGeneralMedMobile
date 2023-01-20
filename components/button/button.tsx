import React from 'react'
import {StyleSheet, TextInput, Text, View, Pressable} from "react-native";

// import s from './button.module.scss'

interface IButton {
    text: string,
    type: string,
    onPress: () => void
}

const Button: React.FC<IButton> = ({onPress, text, type ='PRIMARY'}) => {

    return (
        ////TODO: think about it problem in typescript
       /// <Pressable onPress={onPress} style={[styles.container, styles[`container_${type}`]]}>
        <Pressable onPress={onPress} style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#4466b0",
        width: "100%",
        borderColor: "#4466b0",
        borderWidth: 1,
        borderRadius: 5,
        padding: 15,
        marginVertical: 5

    },
    container_PRIMARY: {
        backgroundColor:  "#4466b0",
    },
    container_SECONDARY: {
        backgroundColor: 'white'
    },
    text: {
        fontWeight: "bold",
        color: "white",
        textAlign: 'center'
    }
})
export default Button
