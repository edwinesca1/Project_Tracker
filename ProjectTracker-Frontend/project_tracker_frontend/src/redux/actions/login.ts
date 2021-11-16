import axios from "axios";
import {Dispatch} from "redux";
import {ActionTypes} from "./types";
import {User} from "./users";

const urlApi = `http://3.144.217.113:8080/api/users/` ;

export interface LoginUserAction{
    type: ActionTypes.login;
    payload: User;
}
export interface LogoutUserAction{
    type: ActionTypes.logout;
    payload: User;

}
export interface LoginType{
    username:string;
    password:string;
}

export const loginUser = (user:LoginType) => {
    return async (dispatch: Dispatch) => {
        console.log("In the Action Login !!!"+user)
        const resp = await axios.post<User>(urlApi+"login",user)
        sessionStorage.setItem("currentUser", JSON.stringify(resp.data))
        sessionStorage.setItem("logged", "true")
        console.log(sessionStorage.getItem("currentUser"))
        dispatch<LoginUserAction>({
            type: ActionTypes.login,
            payload: resp.data
        })
    }
}
export const logoutUser = () => {
    sessionStorage.clear()
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
    return (dispatch: Dispatch) => dispatch<LogoutUserAction>({
        type: ActionTypes.logout,
        payload: user

    })
}