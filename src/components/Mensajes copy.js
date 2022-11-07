import { MensajesService } from '../services/MensajesService'
import { Button } from 'primereact/button';
import { useEffect, useState } from 'react'
import { InputText } from 'primereact/inputtext';
import { Form, Field } from 'react-final-form';
import '../assets/Mensajes.css'
import io from 'socket.io-client'
const socket = io('http://localhost:4000')

export default function Mensajes({ msgSelected, updateComponent, allMsg }) {

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState(""); 

    useEffect(() => {
        updateComponent()
        const receiveMessage = (message) => {
            setMessages([message, ...messages]);
        };

        socket.on("message", receiveMessage);

        return () => {

            socket.off("message", receiveMessage);

        };
    }, [messages]);

    const handleSubmit = (event, form) => {
        console.log(event, 'event')
        const newMessage = {
            body: event,
            from: "Me",
        };
        setMessages([...messages, newMessage,]);
        setMessage("");
        socket.emit("message", newMessage.body, localStorage.id, msgSelected[0].idEmisor);
        form.restart()
    };


console.log(msgSelected, 'MSG SELECTED: ')




    return (

        <div >
            <div className='mensajesArea'>
                <ul className="h-80 overflow-y-auto">
                    {msgSelected.map((message, index) => (
                        <li
                            key={index}
                            className={`my-2 p-2 table text-sm rounded-md ${message.from === "Me" ? "bg-sky-700" : "bg-black"
                                }`}
                        >
                     

                            {message.idEmisor == localStorage.id ? <p> {`Yo: ${message.mensaje}`} </p> : <p> {`Persona: ${message.mensaje}`}</p>}

                        </li>
                    ))}
                </ul>

                <Form onSubmit={handleSubmit} initialValues={{ msg: '' }} render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit} className="p-fluid writeMessage" >
                        <Field name="msg" render={({ input }) => (
                            <div className="field">
                                <span className="p-float-label">
                                    <InputText value={message} name='msg' {...input} className='inputMessage' rows={4} cols={4}
                                        /*        onChange={(e) => setMessage(e.target.value)} */
                                        autoResize />
                                    <label htmlFor="msg"></label>
                                </span>
                            </div>

                        )} />
                        <Button type="submit" label="Enviar mensaje" className="sendMessage" /* onClick={onSubmit} */ />

                    </form>
                )} />
            </div>
        </div>

    )



}