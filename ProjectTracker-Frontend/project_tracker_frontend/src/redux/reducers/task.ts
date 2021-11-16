import {Task, ActionTypes, Action} from "../actions";

export const taskReducer = (state: Task[] = [], action: Action) => {
    switch (action.type) {
        case ActionTypes.fetchaAllTasks:
            return action.payload;
        default:
            return state;
    }
}