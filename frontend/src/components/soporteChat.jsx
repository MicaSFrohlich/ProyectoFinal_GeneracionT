import React, { useState } from "react";
import "./soporteChat.css";

const SoporteChat = () => {
  const [mensajes, setMensajes] = useState([]);
  const [input, setInput] = useState("");

  const enviarMensaje = () => {
  if (input.trim() === "") return;

  setMensajes(prev => [...prev, { texto: input, origen: "usuario" }]);

  setTimeout(() => {
    setMensajes(prev => {
      if (prev.some(m => m.origen === "soporte")) return prev;
      return [
        ...prev,
        { 
          texto: "Gracias por consultar! Estamos buscando un agente disponible para atenderte.",
          origen: "soporte" 
        },
      ];
    });
  }, 1000);

  setInput("");
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