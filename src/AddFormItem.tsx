import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@mui/material";
import {AddBox} from "@material-ui/icons";

type AddFormItemType = {
    addItem: (title: string) => void
}

export function AddFormItem(props: AddFormItemType) {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addItem();
        }
    }


    return (
        <>
            <div>
                <TextField id="standard-basic"
                           variant="standard"
                           value={title}
                           onChange={onChangeHandler}
                           onKeyPress={onKeyPressHandler}
                           error={!!error}
                           label='Title'
                           helperText={error}/>
                <IconButton color="primary"
                            size="small"
                            onClick={addItem}><AddBox/></IconButton>
            </div>
        </>

    )
}