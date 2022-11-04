import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../assets/ContactoMascotaEncontrada.css'
import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Form, Field } from 'react-final-form';
import axios from 'axios'




export default function MascotaPerdida({ idMascotaPerdida, setDialog }) {

    const [displayPosition, setDisplayPosition] = useState(true);
    const [displayResponsive, setDisplayResponsive] = useState(false);
    const [position, setPosition] = useState('center');
    const [petDetail, setPetDetail] = useState({})
    const [msg, setMsg] = useState(null)


    console.log('mensaje a enviar: ', msg)
    console.log('el ID del usuario receptor del mensaje:', idMascotaPerdida.idHumano)
    console.log('el ID del emisario: ', localStorage.id)
    const objetoFecha = Date.now();
    const nowDate = new Date(objetoFecha);
    let fechaMensaje = nowDate.toLocaleDateString('en-ZA');
    console.log('Horario del mensaje:', fechaMensaje)




    const sendData = () => {
        const msgData = {
            msg: msg,
            emisor: parseInt(localStorage.id),
            receptor: idMascotaPerdida.idHumano,
            date: fechaMensaje
        }
        axios.post("http://localhost:3001/mensajes/nuevoMensaje", msgData, {
        }).then((response) => {
            console.log(response)
        })
        setDialog(false)
    }
    const sendMessage = (data) => {
        console.log(data)
        setMsg(data)

    }

    useEffect(() => {
        if (msg !== null) {
            sendData()
        }
    }, [msg])

    const onHide = () => {
        setDialog(false)
    }

    useEffect(() => {
        setPetDetail(idMascotaPerdida)
    }, [displayResponsive]);

    const renderFooter = (name) => {
        return (
            <div>

            </div>
        );
    }
    return (
        <div className="dialog-demo">
            <Dialog className='dialogMascotasPerdidas' header={
                <div>
                    <p className='textoBusqueda'> Haz encontrado a tu mascota! </p>
                    <div className='mascotaNombrePerdida'>
                        Escribele para ponerte en contacto
                    </div>

                </div>
            } visible={displayPosition} /* footer={renderFooter('displayPosition')} */ position={position} onHide={() => onHide('displayBasic')} style={{ width: '90vw' }}
                draggable={false} resizable={false}>
                <Form onSubmit={sendMessage} initialValues={{ msg: '' }} render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit} className="p-fluid formContainer">
                        <Field name="msg" render={({ input }) => (
                            <div className="field">
                                <span className="p-float-label">
                                    <InputTextarea name='msg' {...input} className='textArea' rows={8} cols={6} autoResize />
                                    <label htmlFor="msg"></label>
                                </span>
                            </div>

                        )} />
 {/*                        <img src={petDetail.fotoMascota} className="fotoMascota" />
                        <img src={idMascotaPerdida.fotoMascota} className="fotoMascota" /> */}

                        <Button type="submit" label="Enviar mensaje" className="sendMsg" /* onClick={onSubmit} */ />
                        <Button label="Cancelar" onClick={e => setDialog(false)} className="sendMsg" />
                    </form>
                )} />
            </Dialog>
        </div>

    )
}
