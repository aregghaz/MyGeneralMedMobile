import React, {ChangeEvent} from 'react'
import {TextInput, StyleSheet, View,Text} from "react-native";
import {Control, Controller, FieldValues} from "react-hook-form";

interface IInput {
    name: string
    placeholder: string
    secureTextEntry: boolean
    control: Control<FieldValues, Object>
    rules?: Object


}

const Input: React.FC<IInput> = ({
                                     rules = {},
                                     control,
                                     name,
                                     placeholder,
                                     secureTextEntry
}) => (
    <Controller
        control={control}
        name={name}
        rules={rules}
        render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
           <>
               <View style={[styles.container, {borderColor: error? 'red': "#D63D3D"}]}>
                   <TextInput
                       placeholder={placeholder}
                       style={styles.input}
                       onBlur={onBlur}
                       value={value}
                       onChangeText={onChange}
                       secureTextEntry={secureTextEntry}
                   />
               </View>
               {
                   error && <Text style={{color:'red', alignSelf:'stretch'}}>{error.message || 'Error'}</Text>
               }
           </>
        )}
    />


)

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        width: "100%",
        borderColor: "#D63D3D",
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginVertical: 5

    },
    input: {}
})
export default Input
