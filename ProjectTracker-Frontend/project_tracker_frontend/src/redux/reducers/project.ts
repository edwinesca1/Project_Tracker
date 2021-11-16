import {Project, ActionTypes, Action} from "../actions";

export const projectReducer = (state: Project[] = [], action: Action) => {
    switch (action.type) {
        case ActionTypes.fetchaAllProjects:
            return action.payload;
        default:
            return state;
    }
}