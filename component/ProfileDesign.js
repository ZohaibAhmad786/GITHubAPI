
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from "react-native";
export default ProfileDesign = props => {
    return (
        <View style={styles.infoSub} >
            <View style={styles.contents}>
                <Text style={styles.label}>{props.userName}</Text>
            </View>

            <View style={styles.contents}>
                <Text>{props.data}</Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    label: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    infoSub: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginVertical:2
    },
    contents: {
        width: '45%',
    }
});