
export class MascotasService {

    getMascotasByIdHumano(id) {
        return fetch(`https://backend.missingpets.art/mascotas/getById/${id}`).then(res => res.json()).then(d => d.data);
    }

    getAllMissingPets() {
        return fetch('https://backend.missingpets.art/mascotas/mascotasPerdidas').then(res => res.json()).then(d => d.data);
    }

    getPetsByZone() {
        return fetch('https://backend.missingpets.art/mascotas/mascotaEncontrada').then(res => res.json()).then(d => d.data);
    }
}
