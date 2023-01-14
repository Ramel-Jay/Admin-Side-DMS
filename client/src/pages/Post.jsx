import React, { useState } from "react";
import axios from 'axios';

function Post() {

    const [imageData, setImageData] = useState(null);

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/news", data, { withCredentials: true })
        .then((response) => {
            if(response.data.error){
                alert("response.data.error");
            }else{
                alert("Post uploaded");
            }
        });
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageData(reader.result);
        };
        reader.readAsDataURL(file);
    };


    return(
        <>
            <input
                autoComplete='off'
                type="text" 
                id="caption"
                required
            />
            <input type="file" onChange={handleImageChange} />
            <button type="submit" onClick={onSubmit}>Post</button>
        </>
    )
};
export default Post;