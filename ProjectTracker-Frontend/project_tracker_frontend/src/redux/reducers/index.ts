import {combineReducers} from "redux";
import {usersReducer} from "./users";
import {Project, Task, User} from "../actions";
import {loginReducer} from "./login";
import {projectReducer} from "./project";
import {taskReducer} from "./task";

export interface StoreState{
    users: User[];
    userLogin: User;
    project: Project[];
    task : Task[]

}

export const reducers = combineReducers<StoreState>({
    users: usersReducer,
    userLogin: loginReducer,
    project: projectReducer,
    task: taskReducer
});