import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../assets/Mascotas.css';

import React, { useState, useEffect, useRef } from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { MascotasService } from '../services/MascotasService';
import MascotaPerdida from '../views/MascotaPerdidaDialog'



export default function DataViewLazyDemo() {
    const [products, setProducts] = useState(null);
    const [layout, setLayout] = useState('list');
    const [loading, setLoading] = useState(true);
    const [first, setFirst] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const [perdida, setPerdida] = useState(null)
    const rows = useRef(6);
    const datasource = useRef(null);
    const isMounted = useRef(false);
    const getAllPets = new MascotasService();
    const [state, setState] = useState({
        longitude: 0,
        latitude: 0,
    });

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                // console.log(position);
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

    
    useEffect(() => {
        if (isMounted.current) {
            setTimeout(() => {
                /*  setLoading(false); */
            }, 1000);
        }
    }, [loading]);


    useEffect(() => {
        isMounted.current = true;
        getAllPets.getMascotasByIdHumano(localStorage.id).then(data => {
            datasource.current = data;
            setTotalRecords(data.length);
            setProducts(datasource.current.slice(0, rows.current));
            setLoading(false);
        });
    }, []);

    const onPage = (event) => {
        setLoading(true);

        const startIndex = event.first;
        const endIndex = Math.min(event.first + rows.current, totalRecords - 1);
        const newProducts = startIndex === endIndex ? datasource.current.slice(startIndex) : datasource.current.slice(startIndex, endIndex);

        setFirst(startIndex);
        setProducts(newProducts);
        setLoading(false);

    }


    const meperdiButton = (e) => {
        setPerdida(e.currentTarget.value)
    }

    const renderListItem = (data) => {
        return (

            <div className="col-12">

                <div className="product-list-item">
                    <img src={data.fotoMascota} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.name} />
                    <div className="product-list-detail">
                        <div className="product-name">{data.nombre}</div>
                        <div className="product-description">{data.descripcion}</div>

                        {/*                         <i className="pi pi-tag product-category-icon"></i><span className="product-category">{data.colorPrimario}</span>
 */}                    </div>
                    <div className="product-list-action">
                        {/*          <span className="product-price">{data.status}</span> */}
                        {/*  */}
                        {/*        <MapView state={state} /> */}
                        <MascotaPerdida state={state} idMascotaPerdida={data} />



                        {/*  <span className={`product-badge status-${data.nombre}`}>{data.inventoryStatus}</span> */}
                    </div>
                </div>
            </div>
        );
    }



    const itemTemplate = (product, layout) => {
        if (!product) {
            return;
        }
        if (layout === 'list')
            return renderListItem(product);

    }

    const renderHeader = () => {
        let onOptionChange = (e) => {
            setLoading(true);
            setLayout(e.value);
        };

        /*  return (
             <div style={{ textAlign: 'left' }}>
                 <DataViewLayoutOptions layout={layout} onChange={onOptionChange} />
             </div>
         ); */
    }

    const header = renderHeader();

    return (
        <div className="dataview-demo">
            <div className="card">
                <DataView value={products} layout={layout} header={header}
                    itemTemplate={itemTemplate} /* lazy paginator */ rows={rows.current}
                    totalRecords={totalRecords} first={first} onPage={onPage}  />
            </div>
        </div>
    );
}
