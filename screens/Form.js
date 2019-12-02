import React, { useState, useReducer, useCallback } from 'react';
import { View, Text, Button, StyleSheet, Picker, ScrollView, KeyboardAvoidingView, Alert } from "react-native";
import color from '../constant/color';
import Input from '../component/UI/Input';
import { useDispatch } from 'react-redux';
import * as formActions from '../store/actions/FormData';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../component/UI/HeaderButton';


const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        };
    }
    return state;
};

export default Form = props => {
    const dispatch = useDispatch();
    const [pickerValue, setPickerValue] = useState('');

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            username: '',
            title: '',
            email: '',
            password: '',
            description: ''
        },
        inputValidities: {
            username: false,
            title: false,
            email: false,
            password: false,
            description: false
        },
        formIsValid: false
    });


    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            dispatchFormState({
                type: FORM_INPUT_UPDATE,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
            });
        },
        [dispatchFormState]
    );
    const submitUserData = () => {
        if (formState.formIsValid) {

            if (pickerValue === '' || pickerValue === 'None') {
                Alert.alert('Wrong Selection!', 'Please select your type.', [
                    { text: 'Okay' }
                ]);
                return;
            } else {
                dispatch(formActions.addUser(
                    formState.inputValues.username,
                    formState.inputValues.email,
                    formState.inputValues.title,
                    formState.inputValues.password,
                    formState.inputValues.description,
                    pickerValue
                ));
            }
        } else {
            Alert.alert('Wrong input!', 'Please check the errors in the form.', [
                { text: 'Okay' }
            ]);
            return;
        }

    }

    return (
        <KeyboardAvoidingView style={styles.screen} behavior='padding' keyboardVerticalOffset={50} >
            <View style={styles.card}>
                <ScrollView>
                    <View style={styles.formTitle}>
                        <Text style={{ ...styles.lable, ...styles.fontBold }}>Project Forums</Text>
                    </View>

                    <Input
                        id="username"
                        label="Username"
                        errorText="Please enter a valid Username !"
                        keyboardType="default"
                        autoCapitalize="sentences"
                        autoCorrect
                        returnKeyType="next"
                        onInputChange={inputChangeHandler}
                        initialValue=''
                        initiallyValid={false}
                        userName
                    />
                    <Input
                        id="email"
                        label="Email"
                        errorText="Please enter a valid Email !"
                        keyboardType="default"
                        autoCapitalize="sentences"
                        autoCorrect
                        returnKeyType="next"
                        onInputChange={inputChangeHandler}
                        initialValue=''
                        initiallyValid={false}
                        email
                    />
                    <Input
                        id="title"
                        label="ProjectTitle"
                        errorText="Please enter a valid Project Title!"
                        keyboardType="default"
                        autoCapitalize="sentences"
                        autoCorrect
                        returnKeyType="next"
                        onInputChange={inputChangeHandler}
                        initialValue=''
                        initiallyValid={false}
                        title
                    />

                    <Input
                        id="password"
                        label="Password"
                        errorText="Minimum eight characters, at least one letter and one number!"
                        keyboardType="default"
                        autoCapitalize="sentences"
                        autoCorrect
                        returnKeyType="next"
                        onInputChange={inputChangeHandler}
                        secureTextEntry
                        initialValue=''
                        initiallyValid={false}
                        password
                    />
                    <Input
                        id="description"
                        label="Description"
                        errorText="Minimum 4character required!"
                        keyboardType="default"
                        autoCapitalize="sentences"
                        autoCorrect
                        returnKeyType="next"
                        onInputChange={inputChangeHandler}
                        initialValue=''
                        initiallyValid={false}
                        description
                    />
                    <View style={styles.picker}>
                        <View style={{ width: '100%' }}>
                            <Text style={styles.lable}>Type</Text>
                        </View>
                        <View style={{ width: '100%' }}>
                            <Picker
                                selectedValue={pickerValue}
                                onValueChange={Item => setPickerValue(Item)}
                            >
                                <Picker.Item value='None' label='Select your type' />
                                <Picker.Item value='Standard' label='Standard' />
                                <Picker.Item value='Premium' label='Premium' />
                            </Picker>
                        </View>
                    </View>

                    <View style={styles.btnContainer}>
                        <Button title='Submit' color={color.primary} onPress={() => submitUserData()} />
                    </View>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
}
Form.navigationOptions = navData => {
    return {
        headerTitle: 'Form',
        headerRight: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Archive'
                    iconName='md-archive'
                    onPress={() => 
                        navData.navigation.navigate({routeName:'Project'})
                    }

                />
            </HeaderButtons>
        ),
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
        alignItems: 'center',
        marginVertical: 10
    },
    card: {
        width: '90%',
        padding: 20,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 0, height: 2,
        },
        shadowOpacity: 0.26,
        shadowRadius: 10,
        elevation: 5,
        backgroundColor: 'white'
    },
    formTitle: {
        alignItems: 'center',
    },
    fontBold: {
        fontWeight: 'bold',
        fontSize: 22
    },
    picker: {
        width: '100%',
        marginVertical: 5,
        flexDirection: 'column',
    },
    btnContainer: {
        marginTop: 5
    }
});

