import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

type ActionType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeFilterTodolistActionType
    | ChangeTitleTodolistActionType


export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
}
export type ChangeTitleTodolistActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type ChangeFilterTodolistActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    newFilter: FilterValuesType
    id: string
}

export const todolistsReducer = (state: Array<TodolistType>, action: ActionType) : Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':{
            return state.filter(tl => tl.id != action.id)
        }
        case 'ADD-TODOLIST': {
            let newTodolistId = v1();
            let newTodolist: TodolistType = {id: newTodolistId, title: action.title, filter: 'all'};
            let newState = [...state, newTodolist]
            return newState
        }
        case 'CHANGE-TODOLIST-FILTER': {
            let todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.filter = action.newFilter
                return [...state]
            }
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                if (action.type !== "CHANGE-TODOLIST-FILTER") {
                    todolist.title = action.title;
                }
                return [...state]
            }
        }

        default:
            throw new Error('I don\'t understand this type')
    }
}
