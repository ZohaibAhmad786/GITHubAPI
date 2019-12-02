import React from 'react';
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Color from '../constant/color';
import { Ionicons } from '@expo/vector-icons';
import Icons from "react-native-vector-icons/FontAwesome";
import AntiIcons from "react-native-vector-icons/AntDesign";
import Form from '../screens/Form';
import { View, SafeAreaView, Image, Dimensions } from 'react-native';
import Projects from '../screens/Projects';


let defaultNavigationOption = {
    headerStyle: {
        backgroundColor: Color.primary
    },
    headerTintColor: 'white'
}
const HomeNavigator = createStackNavigator({
    Home: Home,

}, {
    defaultNavigationOptions: defaultNavigationOption,
    navigationOptions: {
        drawerIcon: drawerConfig => {
            return <AntiIcons name="home" size={23} color={drawerConfig.tintColor} />;
        }
    }
});


const ProfileNavigator = createStackNavigator({
    Profile: Profile,

}, {
    defaultNavigationOptions: defaultNavigationOption,
    navigationOptions: {
        drawerIcon: drawerConfig => {
            return <Icons name="user-o" size={23} color={drawerConfig.tintColor} />;
        }
    }

});

const FormNavigator = createStackNavigator({
    Form: Form,
    Project: Projects
}, {
    defaultNavigationOptions: defaultNavigationOption,
    navigationOptions: {
        drawerIcon: drawerConfig => {
            return <Icons name="wpforms" size={23} color={drawerConfig.tintColor} />;
        }
    }
});

const MainNavigator = createDrawerNavigator({
    Home: HomeNavigator,
    Profile: ProfileNavigator,
    Form: FormNavigator
}, {
    contentOptions: {
        activeTintColor: Color.primary,
    },
    contentComponent: props => {
        return <View style={{ flex: 1, paddingTop: 25 }}>
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                <View style={{ height: 150, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                    <Image style={{ height: 150, width: 150 }} source={require('../assets/github_PNG40.png')} />
                </View>
                <DrawerItems {...props} />
            </SafeAreaView>
        </View>
    }
})


export default createAppContainer(MainNavigator);