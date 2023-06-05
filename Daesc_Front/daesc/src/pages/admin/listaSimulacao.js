import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ListaSimulacoes = () => {

  const [simulacoes, setSimulacoes] = useState([]); // Estado para armazenar as simulações
  const [mensagem, setMensagem] = useState(''); // Estado para armazenar a mensagem de feedback
  const navigate = useNavigate(); // Hook para navegação

  useEffect(() => {

    fetchSimulacoes();

  }, []);

  const fetchSimulacoes = async () => {

    // Função para buscar as simulações
    try {
      const response = await axios.get('http://localhost:8083/admin/situacaoSimulacao');
      if (Array.isArray(response.data)) {
        setSimulacoes(response.data);
      } else {
        setSimulacoes([]);
      }
    } catch (error) {
      console.error(error);
    }

  };

  const handleDeleteSimulacao = async (id) => {

    // Função para lidar com a exclusão de simulação

    try {
      await axios.post('http://localhost:8083/admin/situacaoSimulacao/deletar', { id });
      fetchSimulacoes();
      setMensagem('Simulação excluída com sucesso!');
    } catch (error) {
      console.error(error);
    }

  };

  const handleEditSimulacao = (id) => {

    // Função para lidar com a edição de simulação
    navigate(`/admin/situacaoSimulacao/editar/${id}`);

  };

  const isAcessivelParaEmpresa = (simulacao) => {

    // Função para verificar se a simulação é acessível para a empresa
    const valorBoleto = parseFloat(simulacao.boleto);
    const valorEntrada = parseFloat(simulacao.entrada);
    const numeroParcelas = parseInt(simulacao.parcela);

    // Define a condição para acessibilidade da empresa
    return valorBoleto > 100 && valorEntrada >= 50 && numeroParcelas < 12;

  };

  return (

    <div className="container">

      {/* Exibe mensagem de feedback */}
      {mensagem && (
        <div className="alert alert-success mt-4 mb-4" role="alert">
          {mensagem}
        </div>
      )}

      <h3 className="mt-4 mb-4 h2 fw-bold">Lista de todas as simulações</h3>

      <table className="table table-striped">

        <thead>
          <tr>
            <th scope="col">Valor do Boleto</th>
            <th scope="col">Valor de entrada</th>
            <th scope="col">Número de parcelas</th>
            <th scope="col">Acessível para Empresa</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>

        <tbody>

          {Array.isArray(simulacoes) && simulacoes.length > 0 ? (
            simulacoes.map((simulacao) => (

              <tr key={simulacao.id}>

                <td>{simulacao.boleto}</td>
                <td>{simulacao.entrada}</td>
                <td>{simulacao.parcela}</td>
                <td>{isAcessivelParaEmpresa(simulacao) ? 'Sim' : 'Não'}</td>

                <td>

                  <div className="d-flex">
                    <button
                      type="button"
                      className="btn btn-danger me-2"
                      onClick={() => handleDeleteSimulacao(simulacao.id)}
                    > Deletar </button>

                    <button
                      className="btn btn-warning"
                      onClick={() => handleEditSimulacao(simulacao.id)}
                    > Editar </button>

                  </div>

                </td>

              </tr>

            ))

          ) : (

            <tr>
              <td colSpan="5">Nenhuma simulação encontrada.</td>
            </tr>

          )}

        </tbody>

      </table>

    </div>

  );

};

export default ListaSimulacoes;
