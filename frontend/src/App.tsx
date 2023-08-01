import {useImageProfile} from "./useImageProfile.tsx";
import ImageAddForm from "./ImageAddForm.tsx";

function App() {

    const {imageProfiles, fetchImages} = useImageProfile()



    return (
        <>
            "Hello World"
            <div>
                <ImageAddForm fetchImages={fetchImages}/>
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
