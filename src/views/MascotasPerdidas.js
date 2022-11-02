
import { MascotasService } from '../services/MascotasService';
import { useState, useEffect } from 'react'
import React, { Component } from 'react';
import { Carousel } from 'primereact/carousel';
import { Button } from 'primereact/button';
import '../assets/MascotasPerdidas.css';
import ContactoMascotaEncontrada from './ContactoMascotaEncontrada'


export default function MascotasPerdidas() {
    const [mascotas, setMascotas] = useState([])
    const [dialogFounded, setDialogFounded] = useState(false)
    const missingPets = new MascotasService();
    const areaMissingPets = new MascotasService();
    const [mascotaperdida, setMascotaPerdida] = useState({})
    const [petDetail, setpetFoundDetail] = useState({})

    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '600px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '480px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    const contactPetFounded = () => {
        setDialogFounded(!dialogFounded)
    }


    useEffect(() => {
        missingPets.getAllMissingPets().then(data => {

            setMascotas(data)
        });


    }, [petDetail]);

    const petFounded = (e) => {
        console.log('la mascota se encontro', e)
        setDialogFounded(true)
        setpetFoundDetail(e)
        console.log(e)
    }




    const dataTemplate = (data) => {
        return (

            <div className="data-item">
                <div className="data-item-content">
                    <div className="mb-3">
                        <img src={`${data.fotoMascota}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.name} className="data-image" />
                    </div>
                    <div>
                        <h4 className="mb-1">{data.nombre}</h4>
                        <h6 className="mt-0 mb-3">{data.descripcion}</h6>

                        <div>
                            <span className={`data-badge status-${data.inventoryStatus}`}>Color primario: {data.colorPrimario}</span>
                        </div>
                        <div>
                            <span className={`data-badge status-${data.inventoryStatus}`}>Color secundario: {data.colorSecundario}</span>
                        </div>
                        <div>
                            <span className={`data-badge status-${data.inventoryStatus}`}>Peso aproximado: {data.pesoAproximado}</span>
                        </div>
                        <div className="car-buttons mt-5">

                            {data.status === 3 ? <Button onClick={() => petFounded(data)} className="p-button p-button-rounded mr-2 buttonMyPet" label='Es mi mascota' /> :  <Button onClick={(e) => petFounded(e)} className="p-button p-button-rounded mr-2 buttonMyPet" label={`Encontre a la loca de ${data.nombre}`} />}
                            {dialogFounded === true ? <ContactoMascotaEncontrada setDialog={contactPetFounded} idMascotaPerdida={petDetail} /> : <p></p>}

                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="carousel-demo">
            <div className="card">
                {/* <p className='tituloMascotasPerdidas'> Mascotas perdidas en tu zona</p> */}
                <Carousel value={mascotas} numVisible={3} numScroll={1} responsiveOptions={responsiveOptions} className="custom-carousel" circular
                    autoplayInterval={3500} itemTemplate={dataTemplate} header={<h5></h5>} />
            </div>
        </div>
    );
}