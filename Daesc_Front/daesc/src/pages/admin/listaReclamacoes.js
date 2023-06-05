import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ListaReclamacoes = () => {

  const [reclamacoes, setReclamacoes] = useState([]); // Estado para armazenar as reclamações
  const [mensagem, setMensagem] = useState(''); // Estado para armazenar a mensagem de feedback
  const navigate = useNavigate(); // Hook para navegação

  useEffect(() => {

    fetchReclamacoes();

  }, []);

  const fetchReclamacoes = async () => {

    // Função para buscar as reclamações
    try {
      const response = await axios.get('http://localhost:8083/admin/situacaoReclamacao');
      if (Array.isArray(response.data)) {
        setReclamacoes(response.data);
      } else {
        setReclamacoes([]);
      }
    } catch (error) {
      console.error(error);
    }

  };

  const formatarData = (data) => {

    // Função para formatar a data
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(data).toLocaleString('pt-BR', options);

  };

  const handleDeleteReclamacao = async (id) => {

    // Função para lidar com a exclusão de reclamação
    try {
      await axios.post('http://localhost:8083/admin/situacaoReclamacao/deletar', { id });
      fetchReclamacoes();
      setMensagem('Reclamação excluída com sucesso!');
    } catch (error) {
      console.error(error);
    }

  };

  const handleEditReclamacao = (id) => {

    // Função para lidar com a edição de reclamação
    navigate(`/admin/situacaoReclamacao/editar/${id}`);

  };

  return (

    <div className="container">

      {/* Exibe mensagem de feedback */}
      {mensagem && (
        <div className="alert alert-success mt-4 mb-4" role="alert">
          {mensagem}
        </div>
      )}

      <h3 className="mt-4 mb-4 h2 fw-bold">Lista dos Lugares Sem Água</h3>

      <table className="table table-striped">

        <thead>
          <tr>
            <th scope="col">Rua</th>
            <th scope="col">Bairro</th>
            <th scope="col">Descrição</th>
            <th scope="col">Data de Criação</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>

        <tbody>

          {Array.isArray(reclamacoes) && reclamacoes.length > 0 ? (
            reclamacoes.map((reclamacao) => (

              <tr key={reclamacao.id}>

                <td>{reclamacao.rua}</td>
                <td>{reclamacao.bairro}</td>
                <td>{reclamacao.descricao}</td>
                <td>{formatarData(reclamacao.createdAt)}</td>

                <td>

                  <div className="d-flex">

                    <button
                      type="button"
                      className="btn btn-danger me-2"
                      onClick={() => handleDeleteReclamacao(reclamacao.id)}
                    > Deletar</button>

                    <button
                      className="btn btn-warning"
                      onClick={() => handleEditReclamacao(reclamacao.id)}
                    >Editar</button>

                  </div>

                </td>

              </tr>

            ))

          ) : (

            <tr>
              <td colSpan="5">Nenhuma reclamação encontrada.</td>
            </tr>

          )}

        </tbody>

      </table>

    </div>

  );

};

export default ListaReclamacoes;
