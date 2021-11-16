import {User, ActionTypes, Action} from "../actions";

let user :User = {
    user_id: 0,
    email: "",
    firstname: "",
    lastname : "",
    password : "",
    profpic  : "",
    userRole: "",
    username : ""
}


export const loginReducer = (state:User = user, action: Action) => {
    console.log("In the LoginReduce With action "+ user + action.type.toString)
    switch (action.type) {
        case ActionTypes.login:
            return action.payload;
        case ActionTypes.logout:
            console.log("IN the Logout Reduces before changing the state!!")
            return action.payload;
        default:
            return state;
    }
}