
export class MensajesService {


    getAllMyMsg(id) {
        return fetch(`http://www.localhost:3001/mensajes/getAllMyMsg/${id}`).then(res => res.json()).then(d => d.data);
    }
    getMessages(id,emisor) {
        return fetch(`http://www.localhost:3001/mensajes/getMessagesById/${id}/${emisor}`).then(res => res.json()).then(d => d.data);
    }

}
