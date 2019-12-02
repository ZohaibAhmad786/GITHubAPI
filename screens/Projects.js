import React, { useState } from 'react';
import { View, StyleSheet, Text, Button, FlatList } from "react-native";
import {  useSelector } from "react-redux";
import color from '../constant/color';


export default Projects = props => {
    const archiveProjects = useSelector(state => state.formData.userData);
    const [flag, setFlag] = useState(false);
    return (
        <View style={styles.screen}>
            <FlatList
                data={archiveProjects}
                keyExtractor={item => item.email}
                renderItem={itemData =>
                    <View style={styles.Container}>
                        <Text style={{ ...styles.label, ...{ fontWeight: 'bold' } }}>House of tutor</Text>
                        <View style={styles.infoContainer}>
                            <View style={styles.contentLabel}>
                                <Text style={styles.label}>Username</Text>
                            </View>
                            <View style={styles.contentLabel}>
                                <Text style={styles.label}>{itemData.item.username}</Text>
                            </View>
                        </View>
                        <View style={styles.infoContainer}>
                            <View style={styles.contentLabel}>
                                <Text style={styles.label}>Type</Text>
                            </View>
                            <View style={styles.contentLabel}>
                                <Text style={styles.label}>{itemData.item.type}</Text>
                            </View>
                        </View>
                        <View style={{ marginVertical: 4 }}>
                            <Button color={color.primary} title={flag ? 'Hide Detail' : 'Show Detail'} onPress={() => setFlag(prevState => !prevState)} />
                        </View>
                        {
                            flag &&
                            <View>
                                <View style={styles.infoContainer}>
                                    <View style={styles.contentLabel}>
                                        <Text style={styles.label}>Email</Text>
                                    </View>
                                    <View style={styles.contentLabel}>
                                        <Text style={styles.label}>{itemData.item.email}</Text>
                                    </View>
                                </View>
                                <View style={styles.infoContainer}>
                                    <View style={styles.contentLabel}>
                                        <Text style={styles.label}>Descrition</Text>
                                    </View>
                                    <View style={styles.contentLabel}>
                                        <Text style={styles.label}>{itemData.item.description}</Text>
                                    </View>
                                </View>
                            </View>
                        }
                    </View>
                }
            />
        </View>
    );
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    Container: {
        marginHorizontal: 20,
        marginVertical: 8,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 0, height: 2
        },
        shadowOpacity: 0.26,
        shadowRadius: 8,
        elevation: 5
    },
    itemsContainer: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    label: {
        fontSize: 16,
        textAlign: 'center'
    },
    infoContainer: {
        flexDirection: 'row',
        width: '100%'
    },
    contentLabel: {
        width: '45%',
        alignItems: 'flex-start',
        paddingLeft: 5,

    }
});