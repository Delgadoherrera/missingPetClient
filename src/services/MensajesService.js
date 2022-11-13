
export class MensajesService {


    getAllMyMsg(id) {
        return fetch(`http://https://missing-pet-server.herokuapp.com/mensajes/getAllMyMsg/${id}`).then(res => res.json()).then(d => d.data);
    }
    getMessages(id,emisor) {
        return fetch(`https://missing-pet-server.herokuapp.com/mensajes/getMessagesById/${id}/${emisor}`).then(res => res.json()).then(d => d.data);
    }

}
