import { useEffect, useState } from "react";
import io from "socket.io-client";
import { MensajesService } from '../services/MensajesService'

const socket = io('/')

export default function App({ idReceptor, updateComponent, nombreEmisario }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [allMsg, setAllMsg] = useState([])

  const getAllMsg = new MensajesService()
  useEffect(() => {
    getAllMsg.getMessages(localStorage.id, idReceptor).then(data => {
      setAllMsg(data);
    });

  }, [messages]);


  useEffect(() => {
    const receiveMessage = (message) => {
      setMessages([message, ...messages]);
    };

    socket.on("message", receiveMessage);

    return () => {
      socket.off("message", receiveMessage);
    };
  }, [messages]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newMessage = {
      body: message,
      from: "Me",
    };
    setMessages([newMessage, ...messages]);
    setMessage("");
    console.log(newMessage)
    socket.emit("message", newMessage.body, localStorage.id, idReceptor);
  };

  const backToMessages = () => {
    updateComponent()
  }

  return (
    <div className="divAllMesages">
      <form onSubmit={handleSubmit} className="formChat">
        <h1 className="text-2xl font-bold my-2"></h1>
        <input
          name="message"
          type="text"
          placeholder="Escribe un mensaje..."
          onChange={(e) => setMessage(e.target.value)}
          className="writeAMessage"
          value={message}
          autoFocus
        />

        <p className="backToMessages" onClick={(e) => updateComponent()}> Volver a mensajes  </p>


        <ul className="chatMsgContainer">
          {allMsg.map((message, index) => (
            <li
              key={index}
              className={`my-2 p-2 table text-sm rounded-md ${message.idEmisor === parseInt(localStorage.id) ? "bg-sky-70 ml-auto" : "bg-black"
                }`}
            >

              {message.idEmisor === parseInt(localStorage.id) ? <p> <span className="spanName"> {localStorage.name}:</span> {message.mensaje}</p> : <p> </p>}
              {message.idEmisor !== parseInt(localStorage.id) ? <p className="chattingWith"><span className="spanName"> {nombreEmisario}: </span> {message.mensaje} </p> : <p> </p>}

            </li>
          ))}
        </ul>
      </form>
    </div>
  );
}