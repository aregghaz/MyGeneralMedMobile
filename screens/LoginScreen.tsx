import React, {useState} from 'react'
import {StyleSheet, Text, View, Image, useWindowDimensions} from 'react-native'
import Logo from '../assets/images/logo.png'
import Input from "../components/input/input";
import Button from "../components/button/button";
import {useNavigation} from "@react-navigation/native";
import {useForm} from 'react-hook-form'
const Login = () => {
    const {height} = useWindowDimensions()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation()
    const {control, handleSubmit} = useForm()
    const handlerLogin = () => {
        console.warn('log in')
        navigation.navigate('Home')
    }
    return (
        <View style={styles.root}>
            <Image
                source={Logo}
                style={[styles.logo, {height: height * 0.3}]}
                resizeMode='contain'
            />
            <Input
                placeholder={'Username'}
                value={username}
                setValue={setUsername}
                secureTextEntry={false}

            />
            <Input
                placeholder={'Password'}
                value={password}
                setValue={setPassword}
                secureTextEntry={true}
            />
            <Button
                text={'Sign In'}
                onPress={handlerLogin}
                type={'PRIMARY'}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    root: {
        alignItems: "center",
        padding: 20
    },
    logo: {
        width: "70%",
        maxWidth: 300,
        maxHeight: 200
    }
})
export default Login;