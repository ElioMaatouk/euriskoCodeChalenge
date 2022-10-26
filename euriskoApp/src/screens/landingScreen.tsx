import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import {View,Text, Image, StyleSheet} from 'react-native'

type LandingScreenProps = {
    navigation: StackNavigationProp<any>
}

const LandingScreen : React.FC<LandingScreenProps> = (props) => {
    useEffect(() => {
        setTimeout(() => {
            props.navigation.navigate('Login')
        },3000)
    })
    return(
        <View style={styles.container}>
           <Image source={{uri:'https://euriskomobility.com/wp-content/uploads/2019/02/eurisko-mobility-logo-final.png'}} style={styles.image}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignContent:'center',
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:20,
        backgroundColor:'#000033'
    },
    image:{
        width:'90%',
        height:100,
        resizeMode:'contain'
    }
})

export default LandingScreen