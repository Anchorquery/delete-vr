import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

function Form() {
    const [file, setFile] = useState();
    const [secondFile, setSecondFile] = useState(); // Estado para el segundo archivo
    const [medidas, setMedidas] = useState(""); // Estado para las medidas
    const [title, setTitle] = useState("");
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
    };

    const handleSecondFileChange = (e) => {
        const file = e.target.files[0];
        setSecondFile(file);
    };

    const handleMedidasChange = (e) => {
        setMedidas(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("secondFile", secondFile); // Agregar el segundo archivo al FormData
        formData.append("title", title);
        formData.append("medidas", medidas); // Agregar las medidas al FormData

        try {
            await axios.post("http://localhost:4000/api/images/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                onUploadProgress: (progressEvent) => {
                    const { loaded, total } = progressEvent;
                    let percent = parseInt((loaded * 100) / total);
                    setUploadPercentage(percent);
                },
            });

            alert('Archivo cargado con éxito.');
            setFile(null);
            setSecondFile(null); // Limpieza del estado del segundo archivo
            setMedidas(""); // Limpieza del estado de las medidas
            setTitle('');
            setUploadPercentage(0);
        } catch (error) {
            console.error(error);
            alert('Ocurrió un error al subir el archivo.');
        }

        setLoading(false);
    };

    return (
        <div className="col-md-4 offset-md-4">
            <Navbar />
            <br/>
            {loading && (
                <div className="progress rounded-0">
                    <div
                        className="progress-bar progress-bar-striped bg-success"
                        role="progressbar"
                        style={{ width: `${uploadPercentage}%` }}
                    >
                        {uploadPercentage}%
                    </div>
                </div>
            )}
            <div className="card bg-dark text-light rounded-0 p-4">
                <div className="card-body">
                    <h1 className="h3 card-title">Subir Imagen</h1>
                    <form onSubmit={handleSubmit}>
                        <h5>Titulo</h5>
                        <input
                            type="text"
                            className="form-control bg-dark text-light my-3"
                            placeholder="Write a title for your Photo"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <h5>Archivo GLB</h5>
                        <input
                            type="file"
                            className="form-control bg-dark text-light rounded-0 border border-secondary"
                            onChange={handleChange}
                        />
                        <br></br>
                        <h5>Archivo USDZ</h5>
                        <input
                            type="file"
                            className="form-control bg-dark text-light rounded-0 border border-secondary my-3"
                            onChange={handleSecondFileChange}
                        />
                       <h5>Medidas</h5>
                        <input
                            type="text"
                            className="form-control bg-dark text-light my-3"
                            placeholder="Enter dimensions"
                            value={medidas}
                            onChange={handleMedidasChange}
                        />
                        <div className="my-3">
                            <button
                                className="btn btn-success rounded-0 w-100"
                                disabled={loading || !file || !secondFile || !medidas}
                            >
                                {!loading ? "Upload" : (
                                    <span
                                        className="spinner-border spinner-border-sm"
                                        role="status"
                                        aria-hidden="true"
                                    ></span>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Form;