import {ChangeEvent, FormEvent, useState} from 'react';

import {ImageProfileWithoutId} from "./ImageProfile.ts";
import {Button, Input, TextField} from "@mui/material";


type Props = {

    addImageProfile: (data: FormData, name: string) => void

}

function ImageAddForm(props: Props) {
    const [name, setName] = useState<string>("");
    const [image, setImage] = useState<File>();


    const addImage = (): void => {
        const data = new FormData()
        const imageProfileWithoutId: ImageProfileWithoutId = {
            name: name
        }


        if (image) {
            data.append("file", image)
        }
        data.append("data", new Blob([JSON.stringify(imageProfileWithoutId)], {type: "application/json"}))
        props.addImageProfile(data, name)

    };

    function handleProductNameInput(event: ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        addImage();
        setName("")
        setImage(undefined)
    }

    function handleImageInput(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.files) {
            setImage(event.target.files[0])
        }
    }


    return (
        <form onSubmit={handleSubmit}>
            <TextField value={name} onChange={handleProductNameInput} label={'ProductName'} size={'small'}/>
            <Input type={"file"} onChange={handleImageInput}/>
            <Button variant={'contained'} size={'large'} type="submit">
                Add
            </Button>
        </form>
    );
}

export default ImageAddForm;
