import {TodolistType} from "../App";
import {v1} from "uuid";


type ActionType = {
    type: string
    [key: string]: any
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
        default:
            throw new Error('I don\'t understand this type')
    }
}
