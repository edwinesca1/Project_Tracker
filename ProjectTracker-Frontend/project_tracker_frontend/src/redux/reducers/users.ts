import {User, ActionTypes, Action} from "../actions";

export const usersReducer = (state: User[] = [], action: Action) => {
    switch (action.type) {
        case ActionTypes.fetchaAllUsers:
            return action.payload;
        default:
            return state;
    }
}