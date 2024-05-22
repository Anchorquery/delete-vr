import QRCode from 'qrcode'
import { useState } from 'react'
import "./qr.css"

function QRCodeGenerator() {
    const [qr, setQr] = useState('')

    const GenerateQRCode = () => {
        const currentUrl = window.location.href; // Obtiene la URL actual
        QRCode.toDataURL(currentUrl, {
            width: 600,
            margin: 1,
            color: {
                dark: '#335383FF',
                light: '#EEEEEEFF'
            }
        }, (err, url) => {
            if (err) return console.error(err)

            console.log(url)
            setQr(url)
        })
    }

    return (
        <div className="app">
            <h1 className='hola'>QR Generator</h1>
            <button onClick={GenerateQRCode} className='boton' class="btn btn-success">Generate</button>
            <hr />
            {qr && <>
                <img className='qr' src={qr} alt="imagen QR"/>
                <br />
                <a href={qr} download="qrcode.png" className='download'class="btn btn-info" >Download</a>
            </>}
        </div>
    )
}
export default QRCodeGenerator;

