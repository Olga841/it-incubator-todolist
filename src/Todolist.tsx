import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {AddFormItem} from "./AddFormItem";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTitle: (id: string, newTitle: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const removeTodolist = () => props.removeTodolist(props.id)
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);
    return <div>
        <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
            <IconButton aria-label="delete">
                <DeleteIcon/>
            </IconButton>
        </h3>
        <AddFormItem addItem={addTask}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }
                    const onChangeTitle = (newTitle: string) => {
                        props.changeTitle(t.id, newTitle, props.id);
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox defaultChecked onChange={onChangeHandler} checked={t.isDone}/>
                        <EditableSpan title={t.title}
                                      onChange={onChangeTitle}/>
                        <IconButton aria-label="delete"
                                    color="primary"
                                    onClick={onClickHandler}>
                            <DeleteIcon fontSize="small"/>
                        </IconButton>
                    </li>
                })
            }
        </ul>
        <div>
            <Button variant={props.filter === 'all' ? "outlined" : "text"}
                    color="primary"
                    onClick={onAllClickHandler}>All
            </Button>
            <Button variant={props.filter === 'active' ? "outlined" : "text"}
                    color="secondary"
                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button variant={props.filter === 'completed' ? "outlined" : "text"}
                    color="error"
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
}

