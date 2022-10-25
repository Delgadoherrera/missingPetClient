
import { MascotasService } from '../services/MascotasService';
import { useState, useEffect } from 'react'
import React, { Component } from 'react';
import { Carousel } from 'primereact/carousel';
import { Button } from 'primereact/button';
import '../assets/MascotasPerdidas.css';
export default function MascotasPerdidas() {
    const [mascotas, setMascotas] = useState([])

    const missingPets = new MascotasService();
    const areaMissingPets = new MascotasService();

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


    useEffect(() => {
        missingPets.getAllMissingPets().then(data => {
            console.log('la data', data)
            setMascotas(data)
        });


    }, []);


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
                            {/*        <span className={`data-badge status-${data.inventoryStatus}`}>{data.inventoryStatus}</span> */}
                            <div className="car-buttons mt-5">
                                <Button icon="pi pi-search" className="p-button p-button-rounded mr-2" />
                                <Button icon="pi pi-star-fill" className="p-button-success p-button-rounded mr-2" />
                                <Button icon="pi pi-cog" className="p-button-help p-button-rounded" />
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="carousel-demo">
                <div className="card">
                    <h3> Se ha perdido en tu zona, si la ves, avisanos!</h3>
                    <Carousel value={mascotas} numVisible={3} numScroll={1} responsiveOptions={responsiveOptions} className="custom-carousel" circular
                        autoplayInterval={3500} itemTemplate={dataTemplate} header={<h5></h5>} />
                </div>
            </div>
        );
    }