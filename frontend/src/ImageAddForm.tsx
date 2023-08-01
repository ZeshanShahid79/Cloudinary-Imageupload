import {ChangeEvent, FormEvent, useState} from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
import {ImageProfileWithoutId} from "./ImageProfile.ts";
import {Button, Input, TextField} from "@mui/material";



type Props = {
    fetchImages: () => void;
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

        axios
            .post('/api/image', data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(() => {
                toast.success('Added: ' + name);
                props.fetchImages()
                setName('');
                setImage(undefined)
            })
            .catch((error: string) => {
                toast.error('Error adding ImageProfile' + error); // Frage an Florian wie komme ich an den statusText
            });
    };

    function handleProductNameInput(event: ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        addImage();
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
