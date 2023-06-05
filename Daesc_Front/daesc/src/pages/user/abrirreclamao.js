import React, { useState } from "react";
import axios from "axios";

const ListaServicos = () => {

  const [rua, setRua] = useState("");
  const [bairro, setBairro] = useState("");
  const [descricao, setDescricao] = useState("");
  const [flashMessages, setFlashMessages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {

    event.preventDefault();

    if (!rua || !bairro || !descricao) {
      // Verifica se algum campo está vazio
      setFlashMessages([{ text: "Por favor, preencha todos os campos.", type: "error" }]);
      return;
    }

    setIsSubmitting(true);

    try {

      // Envia uma solicitação POST para criar uma nova reclamação
      await axios.post("http://localhost:8083/user/situacao/nova", {
        rua,
        bairro,
        descricao,
      });

      // Limpa os campos de entrada
      setRua("");
      setBairro("");
      setDescricao("");

      // Exibe mensagem de sucesso
      setFlashMessages([{ text: "Reclamação criada com sucesso!", type: "success" }]);

    } catch (error) {
      if (error.response && error.response.data && error.response.data.erros_reclamacao) {

        // Exibe mensagens de erro retornadas pelo servidor
        setFlashMessages(error.response.data.erros_reclamacao.map((erro) => ({ text: erro.texto, type: "error" })));

      } else {
        console.error(error);
      }

    }

    setIsSubmitting(false);

  };

  return (

    <div>

      {/* Exibe as mensagens de feedback */}
      {flashMessages.length > 0 ? (
        <div>
          {flashMessages.map((message, index) => (
            <div
              key={index}
              className={`alert ${message.type === "success" ? "alert-success" : "alert-danger"}`}
              role="alert"
            >
              {message.text}
            </div>
          ))}
        </div>
      ) : null}

      <h3>Lista de Serviços</h3>

      <div className="card">

        <div className="card-body">

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label htmlFor="rua">Rua:</label>
              {/* Campo de entrada para a rua */}
              <input
                type="text"
                name="rua"
                id="rua"
                placeholder="Insira o nome da rua"
                className="form-control"
                value={rua}
                onChange={(event) => setRua(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="bairro">Bairro:</label>
              {/* Campo de entrada para o bairro */}
              <input
                type="text"
                name="bairro"
                id="bairro"
                placeholder="Insira o nome do bairro"
                className="form-control"
                value={bairro}
                onChange={(event) => setBairro(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="descricao">Descrição:</label>
              {/* Campo de entrada para a descrição */}
              <textarea
                name="descricao"
                id="descricao"
                rows="3"
                placeholder="Insira uma descrição detalhada do serviço"
                className="form-control"
                value={descricao}
                onChange={(event) => setDescricao(event.target.value)}
              ></textarea>
            </div>

            {/* Botão de envio do formulário */}
            <button type="submit" className={`btn ${isSubmitting ? "btn-secondary" : "btn-success"} mt-4`} disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Criar nova reclamação"}
            </button>

          </form>

        </div>

      </div>

    </div>

  );

};

export default ListaServicos;
