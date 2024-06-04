import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { useParams } from 'react-router-dom';

import "./qr.css"

function QRCodeGenerator() {
    const [qr, setQr] = useState('');
    const params = useParams(); 

    useEffect(() => {
        GenerateQRCode();
    }, []); 

    const GenerateQRCode = () => {
        const currentUrl = `${window.location.origin}/solo-modelo/${params.slug}`;

        QRCode.toDataURL(currentUrl, {
            width: 600,
            margin: 1,
            color: {
                dark: '#335383FF',
                light: '#EEEEEEFF'
            }
        }, (err, url) => {
            if (err) return console.error(err);
            setQr(url);
        });
    };

    return (
        <div className="app">
            <h1 className='hola'>QR Generator</h1>
           <br />
           <br />
            {qr && (
                <>
                    <img className='qr' src={qr} alt="imagen QR" />
                    <br />
                    <a href={qr} download="qrcode.png" className='download' class="btn btn-info">Download</a>
                </>
            )}
        </div>
    );
}

export default QRCodeGenerator;

