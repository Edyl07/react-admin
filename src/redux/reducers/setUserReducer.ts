import { Role } from "../../classes/role";
import { User } from "../../classes/user";


const setUserReducer = (state: { user: User } = { user: new User(0, '', '', '', new Role(0, '', []), []) }, action: { type: string, user: User }) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.user
            }

        default:
            return state;
    }
}

export default setUserReducer;