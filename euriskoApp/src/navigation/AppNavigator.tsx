import * as React from 'react'
import LandingScreen from '../screens/landingScreen';
import LoginScreen from '../screens/loginScreen';
import DashboardScreen from '../screens/dashboardScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator()

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Landing">
                <Stack.Screen name='Landing' component={LandingScreen} />
                <Stack.Screen name='Login' component={LoginScreen} />
                <Stack.Screen name='Dashboard' component={DashboardScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator;