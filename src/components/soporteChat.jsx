import React, { useState } from "react";
import "./soporteChat.css";

const SoporteChat = () => {
  const [mensajes, setMensajes] = useState([]);
  const [input, setInput] = useState("");
  const [respuestaEnviada, setRespuestaEnviada] = useState(false);

  const enviarMensaje = () => {
    if (input.trim() === "") return;

    setMensajes(prev => [...prev, { texto: input, origen: "usuario" }]);
    setInput("");

    if (!respuestaEnviada) {
      setRespuestaEnviada(true);

      setTimeout(() => {
        setMensajes(prev => [
          ...prev,
          { texto: "Gracias por consultar! Estamos buscando un agente disponible para atenderte.", origen: "soporte" }
        ]);
      }, 1000);

      setTimeout(() => {
        setMensajes(prev => [
          ...prev,
          { texto: "Mientras tanto, contanos cómo podemos ayudarte...", origen: "soporte" }
        ]);
      }, 2000);
    }
  };

  return (
    <div className="chatContainer">
      <div className="chat-mensajes">
        {mensajes.map((msg, index) => (
          <div key={index} className={`mensaje ${msg.origen}`}>
            {msg.texto}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Escribinos tu consulta!"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && enviarMensaje()}
        />
        <button onClick={enviarMensaje}>Enviar</button>
      </div>
    </div>
  );
};

export default SoporteChat;