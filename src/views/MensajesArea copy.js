import { MensajesService } from '../services/MensajesService'
import { UserService } from '../services/UsuariosService'
import { Button } from 'primereact/button';
import { useEffect, useState } from 'react'
import '../assets/MensajesArea.css'
import '../assets/Mensajes.css'
import { InputText } from 'primereact/inputtext';
import { Form, Field } from 'react-final-form';
import io from 'socket.io-client'
import Mensajes from '../components/Mensajes';
const socket = io('http://localhost:4000')


export default function MensajesArea() {

    const [allMsg, setAllMsg] = useState([])
    const [filteredMessages, setFilteredMessages] = useState([])
    const [msgDisplay, setMsgDisplay] = useState(false)
    const [emisor, setEmisor] = useState(0)
    const [selectedMessages, setSelectedMessages] = useState([])
    const [refresh, setRefresh] = useState(false);
    const [user, setUser] = useState({})
    const getAllMsg = new MensajesService()

    const getUser = new UserService()
    const clicOnMessages = (e) => {

        setMsgDisplay(!msgDisplay)
        setEmisor(e.currentTarget.value)
        /*      setRefresh(!refresh) */

        getUser.getAUser(e.currentTarget.value).then(data => {
            console.log(data, 'usfx AAAAAsAAAAAAAdata')
            setUser(data);
        });
        
        getAllMsg.getMessages(localStorage.id, emisor).then(data => {
            console.log('DATOS RECIBIDOS DE GETMESSAGES', data)
            setSelectedMessages(data);
        });

    }





    useEffect(() => {
        setUser(user)

    }, []);

    console.log('EMISOR', emisor)
    console.log('MSG SELECTED', selectedMessages)
    useEffect(() => {

      


    }, [refresh]);


    useEffect(() => {
        getAllMsg.getAllMyMsg(localStorage.id).then(data => {
            setAllMsg(data);
        });

    }, [refresh]);


    const updateComponent = () => {
        setRefresh(!refresh)
    }
    const filtereds = []
    
    useEffect(() => {
        setFilteredMessages(newData)
    }, [allMsg]);



    let hash = {};
    let newData = allMsg.filter(function (current) {
        var exists = !hash[current.idEmisor];
        hash[current.idEmisor] = true;
        return exists;
    });


    return (
        <div>


            <div className='areaMensajes'>

                {filteredMessages.map((one) => {
                    return <div>


                        <Button type="button" label={one.idEmisor}
                            icon="pi pi-users"
                            className="p-button-warning mensajesButton" /* badge="1" */
                            badgeClassName="p-badge-danger"
                            value={one.idEmisor}
                            onClick={(e) => { clicOnMessages(e) }} />

                    </div>

                })}
                {msgDisplay === true ? <Mensajes msgSelected={selectedMessages} allMsg={allMsg} updateComponent={updateComponent} /> : <p></p>}

            </div>

        </div>
    )




}