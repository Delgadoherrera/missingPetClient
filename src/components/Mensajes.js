import { MensajesService } from '../services/MensajesService'
import { useEffect, useState } from 'react'
import { Button } from 'primereact/button';
import MensajesArea from '../views/MensajesArea'
import '../assets/Mensajes.css'
const getAllMsg = new MensajesService()


export default function Mensajes() {
    const [allMsg, setAllMsg] = useState([])
    const [filteredMessages, setFilteredMessages] = useState([])
    const [displayMessage, setDisplayMessage] = useState(false)
    const [emisario, setEmisario] = useState(0)
    const [inbox, setInbox] = useState({})



    const getAllMsg = new MensajesService()



    useEffect(() => {
        getAllMsg.getAllMyMsg(localStorage.id).then(data => {
            setAllMsg(data[0]);
        });
    }, []);

    useEffect(() => {
        setFilteredMessages(letrasUnicas)
    }, [allMsg]);



    let letrasUnicas = [];
    let idUnicos=[]

    allMsg.forEach((elemento) => {      
        if (!letrasUnicas.includes(elemento.nombre)) {
            letrasUnicas.push(elemento.nombre);
        }
    });

    allMsg.forEach((elemento) => {
        console.log('ELEMENTOS', elemento)
        if (!idUnicos.includes(elemento.idHumano)) {
            idUnicos.push(elemento.idHumano);
        }
    });




    let hash = {};
    let filteredMsg = allMsg.filter(function (current) {
        let exists = !hash[current.nombre];
        hash[current.nombre] = false;
        return exists;
    });

    const clicOnMessages = (e) => {
        console.log('id Emisario', e.currentTarget.value)
        setDisplayMessage(!displayMessage)
        setEmisario(e.currentTarget.value)
    }
    const updateComponent = () => {
        setDisplayMessage(!displayMessage)

    }


    console.log(filteredMessages)
    console.log(idUnicos)
    return (
        <div className='divMsg'>

            {
                displayMessage === true ?
                    <MensajesArea updateComponent={updateComponent} idReceptor={emisario} />
                    : <p></p>
            }
            {filteredMessages.map((one, index) => {
               

                return <Button type="button" label={` Mensaje de: ${one}`}
                    icon="pi pi-users"
                    className="p-button-warning mensajesButton" /* badge="1" */
                    badgeClassName="p-badge-danger"
                    value={idUnicos[index]}
                    onClick={(e) => { clicOnMessages(e) }} />

            })}






        </div>
    )
}