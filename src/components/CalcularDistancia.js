import { useEffect, useState } from 'react'

export default function ({ geoData, allPets, receiveNearPets }) {


    console.log(receiveNearPets)
    const gradosARadianes = (grados) => {
        return grados * Math.PI / 180;
    };

    const distanciaCoords = (lat1, lon1, lat2, lon2) => {

        lat1 = gradosARadianes(lat1);
        lon1 = gradosARadianes(lon1);
        lat2 = gradosARadianes(lat2);
        lon2 = gradosARadianes(lon2);

        const radioTierra = 6371;
        let difLng = (lon2 - lon1);
        let difLat = (lat2 - lat1);
        let a = Math.pow(Math.sin(difLat / 2.0), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(difLng / 2.0), 2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return radioTierra * c;
    };

    const mascotasCercanas = []

    const filterPets = () => {
        allPets.forEach((j) => {
            let distance = distanciaCoords(geoData.latitude, geoData.longitude, j.latPerdida, j.lngPerdida)

            if (distance < 1) {
                console.log('hay mascotas cerca')
                mascotasCercanas.push()
/*                 receiveNearPets(j) */
            }

            else {
                console.log('aun no hay mascotas cerca')
            }

            /* console.log('distance', distance) */
        })
    }
    filterPets()





}