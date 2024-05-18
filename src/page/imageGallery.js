import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navibar from "../components/Navbar";
import '@google/model-viewer';

function Gallery() {
    const navigate = useNavigate();
    const [images, setImages] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await axios.get("https://test.ddvelop.com/api/images");//deployado
            console.log(res);
            setImages(res.data);
        })();
    }, []);

    return (
        <div className="row">
            <Navibar></Navibar>
            <hr></hr>
            <br></br>
            {images.map(image => (
                <div className="col-md-4 p-1 card-image" key={image.id}
                onClick={() => navigate(`/images/${image.id}`)}>
                    <model-viewer  alt="3D model" auto-rotate camera-controls style={{ width: '100%', height: '400px' }}></model-viewer>
                </div>
            ))}
        </div>
    )
}

export default Gallery;
