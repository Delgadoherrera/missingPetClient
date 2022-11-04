
export class MascotasService {

    getMascotasByIdHumano(id) {
        return fetch(`http://www.localhost:3001/mascotas/getById/${id}`).then(res => res.json()).then(d => d.data);
    }

    getAllMissingPets() {
        return fetch('http://www.localhost:3001/mascotas/mascotasPerdidas').then(res => res.json()).then(d => d.data);
    }

    getPetsByZone() {
        return fetch('http://www.localhost:3001/mascotas/mascotaEncontrada').then(res => res.json()).then(d => d.data);
    }
}
