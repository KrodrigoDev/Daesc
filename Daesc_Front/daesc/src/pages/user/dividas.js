import React, { useState } from "react";
import axios from "axios";
import { NumericFormat } from 'react-number-format';

const NovaSimulacao = () => {

  const [boleto, setBoleto] = useState(""); // Estado para armazenar o valor do boleto
  const [entrada, setEntrada] = useState(""); // Estado para armazenar o valor da entrada
  const [parcela, setParcela] = useState(""); // Estado para armazenar o número de parcelas
  const [erros, setErros] = useState([]); // Estado para armazenar mensagens de erro
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para controlar o envio do formulário

  const handleSubmit = async (event) => {

    event.preventDefault();

    if (!boleto || !entrada || !parcela) {
      setErros([{ texto: "Por favor, preencha todos os campos.", type: "error" }]); // Define uma mensagem de erro se algum campo estiver vazio
      return;
    }

    setIsSubmitting(true); // Define o estado de envio como verdadeiro

    try {

      await axios.post("http://localhost:8083/user/servico/novo", {
        boleto,
        entrada,
        parcela,
      });

      setBoleto(""); // Limpa o campo do boleto após o envio do formulário
      setEntrada(""); // Limpa o campo da entrada após o envio do formulário
      setParcela(""); // Limpa o campo da parcela após o envio do formulário

      setErros([{ texto: "Simulação criada com sucesso!", type: "success" }]); // Define uma mensagem de sucesso após o envio do formulário
    } catch (error) {
      console.error(error);

      // Lógica de manipulação do erro, se necessário

    } finally {
      setIsSubmitting(false); // Define o estado de envio como falso, independentemente do resultado
    }

  };

  const renderParcelaOptions = () => {
    const maxParcelas = Math.floor(boleto / entrada); // Calcula o número máximo de parcelas com base no boleto e na entrada
    const options = [];


    for (let i = 1; i <= maxParcelas; i++) {   //Exibe o número de parcelas com "parcela" no singular ou "parcelas" no plural
      options.push(
        <option key={i} value={i}>
          {i} parcela{`${i > 1 ? "s" : ""}`}
        </option>
      );
    }

    return options; // Retorna as opções de parcelas geradas dinamicamente

  };

  return (

    <div>

      {erros.length > 0 ? (
        <div>

          {erros.map((erro, index) => (
            <div
              key={index}
              className={`alert ${erro.type === "success" ? "alert-success" : "alert-danger"}`}
              role="alert"
            >
              {erro.texto}
            </div>
          ))}

        </div>

      ) : null}

      <h3>Nova simulação</h3>

      <div className="card">

        <div className="card-body">

          <form onSubmit={handleSubmit}>

            <label htmlFor="boleto">Boleto:</label>

            <NumericFormat
              thousandSeparator="."
              decimalSeparator=","
              prefix="R$"
              decimalScale={2}
              fixedDecimalScale={true}
              allowNegative={false}
              placeholder="Valor do boleto"
              className="form-control"
              value={boleto}
              onValueChange={(values) => setBoleto(values.floatValue)} // Atualiza o estado do boleto com o valor monetário formatado
            />

            <label htmlFor="entrada">Entrada:</label>

            <NumericFormat
              thousandSeparator="."
              decimalSeparator=","
              prefix="R$"
              decimalScale={2}
              fixedDecimalScale={true}
              allowNegative={false}
              placeholder="Valor da entrada"
              className="form-control"
              value={entrada}
              onValueChange={(values) => setEntrada(values.floatValue)} // Atualiza o estado da entrada com o valor monetário formatado
            />

            <label htmlFor="parcela">Número de parcelas:</label>

            <select
              name="parcela"
              id="parcela"
              className="form-control"
              value={parcela}
              onChange={(event) => setParcela(event.target.value)} // Atualiza o estado da parcela com o valor selecionado
            >

              <option value="">Selecione</option>

              {renderParcelaOptions()}

            </select>

            <button type="submit" className="btn btn-success mt-4" disabled={isSubmitting}>
              {isSubmitting ? "Aguarde..." : "Criar simulação"}
            </button>

          </form>

        </div>

      </div>

    </div>

  );

};

export default NovaSimulacao;
