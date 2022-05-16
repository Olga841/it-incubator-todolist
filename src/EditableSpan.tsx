import React, {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanType = {
    title: string
    onChange: (newTitle: string) => void
}

export function EditableSpan(props: EditableSpanType) {
    const [editMode, setEditMode] = useState<boolean>(true);
    const [title, setTitle] = useState('')
    const activateEditMode = () => {
        setEditMode(false);
        setTitle(props.title)
    };

    const activateViewMode = () => {
        setEditMode(true);
        props.onChange(title)
    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return editMode
        ? <span onDoubleClick={activateEditMode}>{props.title}</span>
        : <TextField id="standard-basic" variant="standard" onBlur={activateViewMode} value={title} autoFocus onChange={onChangeTitle}/>

}