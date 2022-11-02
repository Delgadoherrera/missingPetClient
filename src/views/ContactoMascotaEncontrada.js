import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
/* import '../assets/MePerdiButton.css' */
import '../assets/ContactoMascotaEncontrada.css'
import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Form, Field } from 'react-final-form';




export default function MascotaPerdida({ idMascotaPerdida, setDialog }) {
    const [displayBasic, setDisplayBasic] = useState(false);
    const [displayBasic2, setDisplayBasic2] = useState(false);
    const [displayModal, setDisplayModal] = useState(false);
    const [displayMaximizable, setDisplayMaximizable] = useState(false);
    const [displayPosition, setDisplayPosition] = useState(true);
    const [displayResponsive, setDisplayResponsive] = useState(false);
    const [position, setPosition] = useState('center');
    const [toggle, setToggle] = useState({ update: false })
    const [petDetail, setPetDetail] = useState({})


    const dialogFuncMap = {
        'displayBasic': setDisplayBasic,
        'displayBasic2': setDisplayBasic2,
        'displayModal': setDisplayModal,
        'displayMaximizable': setDisplayMaximizable,
        'displayPosition': setDisplayPosition,
        'displayResponsive': setDisplayResponsive
    }

    const sendMessage = () => {

    }


    const onHide = () => {
        setDialog(false)
    }


    const renderFooter = (name) => {
        return (
            <div>
                <Button label="Cancelar" onClick={e => setDialog(false)} className="p-button-text " />
                {/*     <Button label="Enviar mensaje"  onClick={e => sendMessage()}  className="p-button-text " /> */}
            </div>
        );
    }
    /*     console.log('Mascota que se encontro', idMascotaPerdida)
     */
    useEffect(() => {
        setPetDetail(idMascotaPerdida)
    }, [displayResponsive]);

    /*     console.log(petDetail,'petDetail') */

    return (
        <div className="dialog-demo">
            <Dialog className='dialogMascotasPerdidas' header={
                <div>
                    <p className='textoBusqueda'> Felicidades! </p>
                    <div className='mascotaNombrePerdida'>
                        Escribele para contarle que tienes a su mascota!
                    </div>
                    <Form onSubmit={sendMessage} initialValues={{ msg: '' }} render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit} className="p-fluid">
                            <Field name="msg" render={({ input }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputTextarea name='msg' className='textArea' rows={4} cols={4} /* value={} */ autoResize />
                                        <label htmlFor="msg"></label>
                                    </span>
                                </div>

                            )} />
                            <img src={petDetail.fotoMascota} className="fotoMascota" />
                            <Button type="submit" label="Enviar mensaje" className="sendMsg" /* onClick={onSubmit} */ />
                            <Button label="Cancelar" onClick={e => setDialog(false)} className="sendMsg" />
                        </form>
                    )} />
                </div>
            } visible={displayPosition} position={position} onHide={() => onHide('displayBasic')} style={{ width: '90vw' }}
                draggable={false} resizable={false}>
            </Dialog>
        </div>

    )
}
