import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../assets/MePerdiButton.css'
import '../assets/MascotaPerdidaDialog.css'
import Index from '../components/WrapperMap'
import MapComponent from '../components/MapComponent'
import React, { useState, useEffect } from 'react';
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
    const [toggle, setToggle] = useState({ update: false })
    const [location, setLocation] = useState([])





    const sendLocation = []


    const updateLocation = (f) => {

        let newData = {
            latitude: f.lat,
            longitude: f.lng
        }
        sendLocation.push(newData)
    }
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

    const onHide = (name, e,) => {
        dialogFuncMap[`${name}`](false);


    }

    const enviarCoordenadas = (name, e) => {

        if (sendLocation.length > 0) {
            let id = e.currentTarget.value
            axios.post(`http://localhost:3001/mascotas/mascotaPerdidaNewLocation/${id}`, sendLocation).then((response) => {
                update()
            })

            sendLocation.splice(0, sendLocation.length)


        }
        else {
            let id = e.currentTarget.value
            axios.post(`http://localhost:3001/mascotas/mascotaPerdida/${id}`, state).then((response) => {
                update()
            });
        }
        dialogFuncMap[`${name}`](false);

    }

    const renderFooter = (name) => {
        return (
            <div>
                <Button label="Cancelar" /* icon="pi pi-times" */ onClick={() => onHide(name)} className="p-button-text " />
                <Button value={idMascotaPerdida.idMascota} label="Buscar" /* icon="pi pi-check" */ onClick={(e) => enviarCoordenadas(name, e)} autoFocus />

            </div>
        );
    }


    return (

        <div className="dialog-demo">
            <div className="card">
                <div className="grid flex-column">
                    <div className="col">
                        {idMascotaPerdida.status !== 1 ? <Button label={`Perdí a ${idMascotaPerdida.nombre}`} /* icon="pi pi-arrow-down" */ onClick={() => onClick('displayPosition', 'top')} className="p-button-warning" /> : <p></p>}
                    </div>
                </div>
                <Dialog className='dialogMascotasPerdidas' header={
                    <div>
                        <p className='textoBusqueda'> ¿Quieres que busquemos a  </p>
                        <div className='mascotaNombrePerdida'>
                            {idMascotaPerdida.nombre}?
                        </div>
                    </div>
                } visible={displayPosition} position={position} modal style={{ width: '70vw' }} footer={renderFooter('displayPosition')} onHide={() => onHide('displayPosition')}
                    draggable={false} resizable={false}>
                    {/* <MapComponent prueba={updateLocation} /> */}
                    <Index newLocation={updateLocation} />

                </Dialog>

            </div>
        </div>
    )
}
