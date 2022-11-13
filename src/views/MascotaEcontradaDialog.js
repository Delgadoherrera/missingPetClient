import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../assets/MePerdiButton.css'
import '../assets/MascotaEncontradaDialog.css'
import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import axios from 'axios';

export default function MascotaPerdida({ idMascotaPerdida, state, update }) {
    const [displayBasic, setDisplayBasic] = useState(false);
    const [displayBasic2, setDisplayBasic2] = useState(false);
    const [displayModal, setDisplayModal] = useState(false);
    const [displayMaximizable, setDisplayMaximizable] = useState(false);
    const [displayPosition, setDisplayPosition] = useState(false);
    const [displayResponsive, setDisplayResponsive] = useState(false);
    const [position, setPosition] = useState('center');


    const dialogFuncMap = {
        'displayBasic': setDisplayBasic,
        'displayBasic2': setDisplayBasic2,
        'displayModal': setDisplayModal,
        'displayMaximizable': setDisplayMaximizable,
        'displayPosition': setDisplayPosition,
        'displayResponsive': setDisplayResponsive
    }

    const onClick = (name, position) => {
        dialogFuncMap[`${name}`](true);

        if (position) {
            setPosition(position);
        }
    }

    const onHide = (name, e) => {
        dialogFuncMap[`${name}`](false);
        console.log('name de hide', name)

    }
    const enviarCoordenadas = (name, e) => {
        let id = e.currentTarget.value
        axios.post(`https://missing-pet-server.herokuapp.com/mascotas/mascotaEncontrada/${id}`, state).then((response) => {
            update()
        });
        dialogFuncMap[`${name}`](false);
    }


    const renderFooter = (name) => {
        return (
            <div className='encontradasDialogFooter'>
        
                <Button label="Cancelar" /* icon="pi pi-times" */ onClick={() => onHide(name)} className="p-button-text" />
                <Button value={idMascotaPerdida.idMascota} label="Mascota encontrada" /* icon="pi pi-check" */ onClick={(e) => enviarCoordenadas(name, e)} autoFocus />
            </div>
        );
    }


    return (

        <div className="dialog-demo">
            <div className="card">
                <div className="grid flex-column">
                    <div className="col">

                        {idMascotaPerdida.status === 1 ? <Button label={`ENCONTRE A  ${idMascotaPerdida.nombre}`.toUpperCase()} /* icon="pi pi-arrow-down" */ onClick={() => onClick('displayPosition', 'top')} className="p-button-warning mascotaEncontrada" /> : <p></p>}
                    </div>
                </div>
                <Dialog className='dialogMascotasPerdidas' header={
                    <div>
                        <p className='textoBusqueda'> {idMascotaPerdida.nombre} se quitará de la lista de mascotas perdidas. Felicidades! </p>
                        <div className='mascotaNombrePerdida'>
                            {/*   {idMascotaPerdida.nombre} */}
                        </div>
                    </div>
                } visible={displayPosition} position={position} modal style={{ width: '90vw' }} footer={renderFooter('displayPosition')} onHide={() => onHide('displayPosition')}
                    draggable={false} resizable={false}>
                    {/*      <Index state={state} /> */}
                    <img className='imgEncontradaDialog' src={idMascotaPerdida.fotoMascota} />

                </Dialog>
            </div>
        </div>
    )
}
