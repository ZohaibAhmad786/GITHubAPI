import React, { useReducer, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
    switch (action.type) {
        case INPUT_CHANGE:
            return {
                ...state,
                value: action.value,
                isValid: action.isValid
            };
        case INPUT_BLUR:
            return {
                ...state,
                touched: true
            };
        default:
            return state;
    }
};

export default Input = props => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue,
        isValid: props.initiallyValid,
        touched: false
    });

    const { onInputChange, id } = props;

    useEffect(() => {
        if (inputState.touched) {
            onInputChange(id, inputState.value, inputState.isValid);
        }
    }, [inputState, onInputChange, id]);

    const textChangeHandler = text => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
        const projectTitleRegex = /^[a-zA-Z0-9_ ]{6,17}$/
        const descriptionRegex=/^[a-zA-Z0-9_ ]{6,50}$/
        let isValid = false;
        // if (props.required && text.trim().length === 0) {
        //     isValid = false;
        // }
        if(props.userName && projectTitleRegex.test(text.toLowerCase())){
            isValid=true;
        }
        if (props.email && emailRegex.test(text.toLowerCase())) {
            isValid = true;
        }
        if (props.password && passRegex.test(text.toLowerCase())) {
            isValid = true;
        }
        if (props.title && projectTitleRegex.test(text.toLowerCase())) {
            isValid = true;
        }
        if (props.description && descriptionRegex.test(text.toLowerCase())) {
            isValid = true;
        }

        
        dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
    };

    const lostFocusHandler = () => {
        dispatch({ type: INPUT_BLUR });
    };
    return (
        <View>
            <Text style={styles.lable}>{props.label}</Text>
            <TextInput
                {...props}
                style={styles.inputContainer}
                value={inputState.value}
                onChangeText={textChangeHandler}
                onBlur={lostFocusHandler}

            />
            {
                !inputState.isValid && inputState.touched && (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{props.errorText}</Text>
                    </View>
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    lable: {
        fontSize: 16,
    },
    inputContainer: {
        width: '100%',
        borderColor: '#ccc',
        borderBottomWidth: 1,
    },
    errorContainer: {
        marginVertical: 4
    },
    errorText: {
        color: 'red',
        fontSize: 13
    }
});