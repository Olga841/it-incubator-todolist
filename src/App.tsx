import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
// CRUD => СRUD
// GUI & CLI
export type FilterValuesType = "all" | "active" | "completed"
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TaskStateType = {
    [todolistID: string]: Array<TaskType>
}

function App() {
    // BLL:
    const todolistID_1: string = v1()
    const todolistID_2: string = v1()
    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistID_1, title: 'What to learn', filter: 'all'},
        {id: todolistID_2, title: 'What to buy', filter: 'all'}
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todolistID_1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS/ES6", isDone: false},
        ],
        [todolistID_2]: [
            {id: v1(), title: "Meat", isDone: true},
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Milk", isDone: false},
        ]
    })
    const [filter, setFilter] = useState<FilterValuesType>("all")

    const removeTask = (taskID: string, todolistID: string): void => {
        setTasks({
            ...tasks, [todolistID]: tasks[todolistID].filter((task: TaskType) => task.id !== taskID)
        })
    }

    const addTask = (title: string, todolistID: string) => {

        setTasks({...tasks, [todolistID]: [{id: v1(), title, isDone: false}]})
    }
    const changeFilter = (filter: FilterValuesType, todolistID: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistID ? {...tl, filter} : tl))
    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todolistID: string) => {  // 3, false
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(tl => tl.id === taskID ? {...tl, isDone} : tl)})
    }

    const removeTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistID))
        delete tasks[todolistID]
    }

    // UI:
    const todolistsForRender = todolists.map(tl => {
            let tasksForRender;
            switch (tl.filter) {
                case "completed":
                    tasksForRender = tasks[tl.id].filter(t => t.isDone === true)
                    break
                case "active":
                    tasksForRender = tasks[tl.id].filter(t => t.isDone === false)
                    break
                default:
                    tasksForRender = tasks[tl.id]
            }

            return (<TodoList
                id={tl.id}
                title={tl.title}
                filter={tl.filter}
                tasks={tasksForRender}
                addTask={addTask}
                removeTask={removeTask}
                removeTodolist={removeTodolist}
                changeFilter={changeFilter}
                changeTaskStatus={changeTaskStatus}
            />)
        }
    )

    return (
        <div className="App">
            {todolistsForRender}
        </div>
    );
}

export default App;
