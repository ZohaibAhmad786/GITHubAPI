import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from "react-native";
import { useSelector } from "react-redux";
import color from '../constant/color';
import ProfileDesign from '../component/ProfileDesign';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../component/UI/HeaderButton';

export default Profile = props => {
    const userData = useSelector(state => state.SearchUsers.addUser);
    // console.log(JSON.stringify(userData));
    return (
        <View style={styles.screen}>
            {
                userData.id ?
                    <View style={styles.ProfileContainer}>
                        <Image style={styles.imageContainer} source={{ uri: userData.avatar_url }} />
                        <Text style={styles.label}>{userData.name}</Text>
                        <Text style={styles.label}>{userData.company ? userData.company : 'No Company'}</Text>
                        <View style={styles.infoMain}>
                            <ProfileDesign userName='Username' data={userData.login} />
                            <ProfileDesign userName='Id' data={userData.id} />
                            <ProfileDesign userName='Location' data={userData.location} />
                            <ProfileDesign userName='Type' data={userData.type} />
                            <ProfileDesign userName='Repositories' data={userData.public_repos} />
                            <ProfileDesign userName='Followers' data={userData.followers} />
                            <ProfileDesign userName='Followings' data={userData.following} />
                            <ProfileDesign userName='Created' data={userData.created_at} />
                            <ProfileDesign userName='Updated' data={userData.updated_at} />
                        </View>
                    </View>
                    :
                    <Text style={styles.label}>Add profile of any searched user</Text>
            }

        </View>
    )
};

Profile.navigationOptions = navData => {
    return {
        headerTitle: 'Profile',
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Menu'
                    iconName='md-menu'
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }
                    }

                />
            </HeaderButtons>
        )
    }
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ProfileContainer: {
        width: '80%',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        padding: 20,
        alignItems: 'center'

    },
    imageContainer: {
        height: 150,
        width: 150,
        borderRadius: 80,
        borderColor: color.accent,
        borderWidth: 5
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    infoMain: {
        flexDirection: 'column',
        marginVertical: 5,
    },
});
