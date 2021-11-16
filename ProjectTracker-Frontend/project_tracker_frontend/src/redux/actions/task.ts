import axios from "axios";
import {Dispatch} from "redux";
import {ActionTypes} from "./types";

const urlApi = `http://3.144.217.113:8080/api/task/all` ;

export interface Task{
    task_id: number;
    task_description: string;
    task_note: string;
    task_start_date: string;
    task_end_date : string;
}
export interface FetchAllTasksAction {
    type: ActionTypes.fetchaAllTasks;
    payload: Task[];
}

export const fetchAllTasks = () => {
    return async (dispatch: Dispatch) => {
        const resp = await axios.get<Task[]>(urlApi)
        dispatch<FetchAllTasksAction>({
            type: ActionTypes.fetchaAllTasks,
            payload: resp.data
        })
    }
}