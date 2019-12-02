export const SEARCH_USER = 'SEARCH_USER';
export const ADD_PROFILE = 'ADD_PROFILE';

export const searchUser = userName => {
    return async dispatch => {
        try {
            const reponse = await fetch(`https://api.github.com/users/${userName}`);
            if (!reponse.ok) {
                throw new Error('User can`t register of Github');
            }

            const reponseData = await reponse.json();
            // console.log(reponseData);

            dispatch({
                type: SEARCH_USER, users: reponseData, userName: reponseData.login
            });
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export const addProfile = userInfo => {
    // console.log(userInfo);
    return { type: ADD_PROFILE, userInfo: userInfo }
}
