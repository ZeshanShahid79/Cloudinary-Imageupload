import axios from "axios";

import {useEffect, useState} from "react";
import {toast} from 'react-toastify';
import {ImageProfile} from "./ImageProfile.ts";





export const useImageProfile = () => {
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
    function fetchImages(){
        getImageProfile()
    }

    return {imageProfiles,fetchImages}
}

