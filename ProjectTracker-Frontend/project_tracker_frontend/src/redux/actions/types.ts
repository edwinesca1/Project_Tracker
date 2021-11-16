import {FetchAllUsersAction} from "./users";
import {LoginUserAction, LogoutUserAction} from "./login";
import {FetchAllProjectsAction} from "./project";
import {FetchAllTasksAction} from "./task";

export enum ActionTypes{
    fetchaAllUsers,
    login,
    logout,
    fetchaAllProjects,
    fetchaAllTasks

}

export type Action = FetchAllUsersAction | LoginUserAction | LogoutUserAction
    | FetchAllProjectsAction |FetchAllTasksAction;
