import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default SearchProfile = props => {
    return (
        <View style={styles.orderItem}>
            <View style={styles.subContainer}>
                <Image style={styles.imgContainer} source={{ uri: props.userImage }} />
                <Text style={styles.labelStyle}>{props.usersName}</Text>
            </View>
            <View style={styles.action}>
                {props.children}
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    orderItem: {
        flex:1,
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
        marginHorizontal: '10%',
        marginVertical:5,
        padding: 10,
    },
    imgContainer: {
        width: '90%',
        height: 150,
        resizeMode:'stretch'
    },
    subContainer: {
        alignItems: 'center'
    },
    labelStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop:5
    },
    action:{
        flexDirection:'row',
        justifyContent:'flex-end',
        marginTop:5
    }
});