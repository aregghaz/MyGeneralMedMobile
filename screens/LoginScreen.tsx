import React, {useState} from 'react'
import {StyleSheet, Text, View, Image, useWindowDimensions} from 'react-native'
import Logo from '../assets/images/logo.png'
import Input from "../components/input/input";
import Button from "../components/button/button";
import {useNavigation} from "@react-navigation/native";
import {useForm} from 'react-hook-form'
import {AuthApi} from "../api/auth";
import axios from "axios";
const Login = () => {
    const {height} = useWindowDimensions()
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    const {control, handleSubmit, formState:{errors}} = useForm()
    const handlerLogin = async (data: any) => {
        if(loading){
            return
        }
        setLoading(true)
        try {
            const response = await AuthApi.login(data.username, data.password)
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access_token
            navigation.navigate('Home')
         } catch (e:any) {
            console.warn(e.message)
         }
        setLoading(false)
    }
    // console.warn(errors,'22222222')
    return (
        <View style={styles.root}>
            <Image
                source={Logo}
                style={[styles.logo, {height: height * 0.3}]}
                resizeMode='contain'
            />
     <View style={styles.input}>
         <Input
             placeholder={'Username'}
             name={'username'}
             control={control}
             rules={{required: 'Username is required', minLength:{value:3,message:'Username should be minimum 3 character length'}}}
             secureTextEntry={false}
         />
     </View>
            <View style={styles.input}>
            <Input
                placeholder={'Password'}
                name={'password'}
                control={control}
                rules={{required:'Password is required', minLength:{value:5,message:'Password should be minimum 5 character length'}}}
                secureTextEntry={true}
            />
            </View>
            <Button
                text={loading ? 'Loading...' : 'Sign In'}
                onPress={handleSubmit(handlerLogin)}
                type={'PRIMARY'}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    root: {
        alignItems: "center",
        padding: 40
    },
    logo: {
        width: "70%",
        maxWidth: 300,
        maxHeight: 200
    },
    input:{
        height: 40,
        width:"100%",
        marginVertical:10
    },
})
export default Login;