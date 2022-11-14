
import { MascotasService } from '../services/MascotasService';
import { useState, useEffect } from 'react'
import React from 'react';
import { Carousel } from 'primereact/carousel';
import { Button } from 'primereact/button';
import '../assets/MascotasPerdidas.css';
import ContactoMascotaEncontrada from './ContactoMascotaEncontrada'
import axios from 'axios'

export default function MascotasPerdidas() {
    const [mascotas, setMascotas] = useState([])
    const [dialogFounded, setDialogFounded] = useState(false)
    const missingPets = new MascotasService();
    const [petDetail, setpetFoundDetail] = useState({})
    const [nearPets, setNearPets] = useState([])
    const [state, setState] = useState({
        longitude: 0,
        latitude: 0,
    });
    const [files, setFiles] = useState([]);
    const reader = new FileReader();


    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 1,
            numScroll: 1
        },
        {
            breakpoint: '600px',
            numVisible: 1,
            numScroll: 1
        },
        {
            breakpoint: '480px',
            numVisible: 1,
            numScroll: 1
        }
    ];
    // FILTER NEAR PETS




    //GEOLOCATION.
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                console.log(position)
                axios.get('https://backend.missingpets.art/mascotas/mascotasPerdidas', {
                    headers: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }
                }).then(res => {
                    console.log('res api',res)
                    res.data.json()
                
                }).then(d => setMascotas(d.data));

                setState({
                    longitude: position.coords.longitude,
                    latitude: position.coords.latitude,
                });
            },
            function (error) {
                console.error("Error Code = " + error.code + " - " + error.message);
            },
            {
                enableHighAccuracy: true,
            }
        );


    }, []);



    //GET ALL PETS



    useEffect(() => {
        setNearPets(nearPets)


    }, [mascotas]);


    const contactPetFounded = () => {
        setDialogFounded(!dialogFounded)
    }



    const petFounded = (data) => {

        setDialogFounded(true)
        setpetFoundDetail(data.e)

    }

    const receiveNearPets = (pet) => {


        setNearPets(pet)

    }



    const dataTemplate = (data) => {
        return (

            <div className="data-item">
                <div className="data-item-content">
                    <div className="mb-3">
                        <img src={`data:image/jpeg;base64,${data.fotoMascota}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.name} className="data-image" />
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

                            {data.status === 3 ? <Button onClick={() => petFounded({ e: data })} className="p-button p-button-rounded mr-2" label='Es mi mascota' /> : <Button onClick={() => petFounded({ e: data })} className="p-button p-button-rounded mr-2" label={`He encontrado a ${data.nombre}`} />}
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
                <Carousel value={mascotas} numVisible={2} numScroll={1} responsiveOptions={responsiveOptions} className="custom-carousel" circular
              /*        autoplayInterval={3500} */ itemTemplate={dataTemplate} header={<h5></h5>} />
            </div>
        </div>
    );
}