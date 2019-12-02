export const ADD_USER = 'ADD_USER';

export const addUser = (username, email, title, pass, description, type) => {
    // console.log(username,email,pass,description)
    return {
        type: ADD_USER, userData: {
            username: username,
            email: email,
            title: title,
            pass: pass,
            description: description,
            type: type
        }
    }
}