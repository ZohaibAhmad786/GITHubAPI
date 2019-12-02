import { ADD_USER } from "../actions/FormData";

const initialState = {
    userData: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER:
            // console.log(action.userData.email);
            const index = state.userData.filter(data => data.email === action.userData.email);
            if (index.length !== 0) {
                return {
                    ...state
                }
            }
            // console.log(state.userData);
            return {
                ...state,
                userData: state.userData.concat(action.userData)
            }
        default:
            return state;
    }
}