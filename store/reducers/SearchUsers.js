import { SEARCH_USER, ADD_PROFILE } from "../actions/SearchUsers"
import { User } from "../../model/user";

const initialState = {
    searchUsers: [],
    addUser: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_USER:
            // console.log(action.userName);
            const userIndex = state.searchUsers.filter(userName => userName.login === action.userName)

            // console.log(JSON.stringify(userIndex))

            if (userIndex.length !== 0) {
                return{
                    ...state,
                }
            }
            return {
                ...state,
                searchUsers: state.searchUsers.concat(action.users)
            }
        case ADD_PROFILE:
            // console.log(JSON.stringify(action.userInfo))
            return {
                ...state,
                addUser: action.userInfo
            }


        default:
            return state;
    }
}
