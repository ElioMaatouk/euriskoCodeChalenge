import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import LoadingIndicator from '../components/loader';
import Space from '../components/space';
import locals from '../localization/locals';
import { saveToken } from '../redux/actions/saveTokenAction';
import authServices from '../services/authServices';
import messagingServices from '../services/local/messagingServices';
import { scale, verticalScale } from '../utils/scale';

type LoginScreenProps = {
    navigation: StackNavigationProp<any>
}

const LoginScreen: React.FC<LoginScreenProps> = (props) => {
    const dispatch = useDispatch()
    const token = useSelector((store) => store.token.token)
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const loginPressed = () => {
        setLoading(true)
        authServices.Login({ username: username, password: password }).then((res) => {
            if (res.success) {
                dispatch(saveToken(res.data.accessToken))
                messagingServices.broadcastSuccess("Login Success")
                props.navigation.navigate('Dashboard')
            } else {
                console.log(res, 'res')
                messagingServices.broadcastFailure(res.error)
            }
        }).finally(() => { setLoading(false) })
    }
    const disableLoginButton = () => {
        if (username == "" || password == "" || loading == true) {
            return true
        }
        return false
    }
    return (
        <>
            <LoadingIndicator visible={loading} />
            <View style={styles.container}>
                <Image source={{ uri: 'https://euriskomobility.com/wp-content/uploads/2019/02/eurisko-mobility-logo-final.png' }} style={styles.image} />
                <Space top={20} />
                <TextInput
                    value={username}
                    placeholder={locals.label_username}
                    onChangeText={(val) => { setUsername(val) }}
                    style={styles.textInput}
                />
                <Space top={10} />
                <TextInput
                    value={password}
                    placeholder={locals.label_password}
                    onChangeText={(val) => { setPassword(val) }}
                    style={styles.textInput}
                // secureTextEntry
                />
                <Space top={20} />
                <TouchableOpacity
                    style={[
                        styles.loginButton,
                        {
                            backgroundColor: disableLoginButton() ? 'grey' : 'green'
                        }
                    ]}
                    disabled={disableLoginButton()}
                    onPress={() => { loginPressed() }}
                >
                    <Text style={styles.loginText}>
                        {locals.label_login}
                    </Text>
                </TouchableOpacity>
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000033',
        paddingHorizontal: 20,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '90%',
        height: 100,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    textInput: {
        width: '100%',
        height: verticalScale(50),
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        paddingLeft: 20
    },
    loginButton: {
        width: scale(150),
        height: verticalScale(50),
        borderRadius: 15,
        backgroundColor: 'green',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginText: {
        color: '#FFFFFF',
        fontWeight: '600'
    }
})
export default LoginScreen