import ImageAddForm from "./ImageAddForm.tsx";
import {useEffect, useState} from "react";
import {ImageProfile} from "./ImageProfile.ts";
import axios, {AxiosError} from "axios";
import {toast} from "react-toastify";

function App() {

    const [imageProfiles, setImageProfiles] = useState<ImageProfile[]>([]);

    useEffect(() => {
        getImageProfile();
    }, []);

    function getImageProfile() {
        axios
            .get("/api/image")
            .then(response => {
                const responseData = response.data as ImageProfile[]
                setImageProfiles(responseData);
            })
            .catch(() => {
                toast.error("Error fetching products")
            });
    }

    function addImageProfile(data: FormData, name: string) {
        axios
            .post('/api/image', data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                setImageProfiles([...imageProfiles, response.data])
                toast.success('Added: ' + name);

            })
            .catch((error: AxiosError) => {
                console.log(error)
                toast.error('Error adding ImageProfile' + error.response?.statusText);
            });
    }


    return (
        <>
            <div>
                <ImageAddForm addImageProfile={addImageProfile}/>
                {imageProfiles.map(imageProfile =>
                    <div key={imageProfile.id}>
                        <h1>{imageProfile.name}</h1>
                        <img src={imageProfile.url} alt={imageProfile.name}/>
                    </div>
                )}
            </div>
        </>
    )
}

export default App
