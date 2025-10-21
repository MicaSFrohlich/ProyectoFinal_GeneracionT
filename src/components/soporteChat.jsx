import React, { useState, useEffect } from "react";
import "./soporteChat.css";

const SoporteChat = () => {
  const usuario = JSON.parse(sessionStorage.getItem("usuario"));
  const userId = usuario?.userid || "anonimo";

  const [mensajes, setMensajes] = useState(() => {
    const chatGuardado = sessionStorage.getItem(`chat_soporte_${userId}`);
    if (chatGuardado) {
      try {
        return JSON.parse(chatGuardado).mensajes || [];
      } catch {
        return [];
      }
    }
    return [];
  });

  const [input, setInput] = useState("");

  const [respuestaEnviada, setRespuestaEnviada] = useState(() => {
    const chatGuardado = sessionStorage.getItem(`chat_soporte_${userId}`);
    if (chatGuardado) {
      try {
        return JSON.parse(chatGuardado).respuestaEnviada || false;
      } catch {
        return false;
      }
    }
    return false;
  });

  useEffect(() => {
    sessionStorage.setItem(
      `chat_soporte_${userId}`,
      JSON.stringify({ mensajes, respuestaEnviada })
    );
  }, [mensajes, respuestaEnviada, userId]);

  const enviarMensaje = () => {
    if (input.trim() === "") return;

    setMensajes(prev => [...prev, { texto: input, origen: "usuario" }]);
    setInput("");

    if (!respuestaEnviada) {
      setRespuestaEnviada(true);

      setTimeout(() => {
        setMensajes(prev => [
          ...prev,
          { texto: "¡Gracias por consultar! Estamos buscando un agente disponible para atenderte.", origen: "soporte" }
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
          placeholder="¡Escribinos tu consulta!"
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