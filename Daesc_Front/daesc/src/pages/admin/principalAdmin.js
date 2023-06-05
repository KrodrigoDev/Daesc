import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuths';
import React, { useEffect, useState } from 'react';

const AdminArea = () => {

  const [flashMessage, setFlashMessage] = useState('');

  const navigate = useNavigate();
  const { signout } = useAuth();

  const handleSignOut = () => {

    signout();
    navigate('/');

  };

  useEffect(() => {
    const storedFlashMessage = localStorage.getItem('flashMessage');

    if (storedFlashMessage) {
      setFlashMessage(storedFlashMessage);

      const timeout = setTimeout(() => {
        setFlashMessage('');
        localStorage.removeItem('flashMessage');
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, []);


  return (



    <div>

      {/* Exiba a mensagem de sucesso */}
      {flashMessage && (
        <p className="text-success" style={{ marginBottom: '10px' }}>
          {flashMessage}
        </p>
      )}

      {/* Card com informações da área administrativa */}

      <div className="card">

        <div className="card-body">

          <h2 className="card-title">Daesc: Área Administrativa</h2>

          <hr />

          <ul className="list-group list-group-flush">

            {/* Item de listagem de áreas sem água */}
            <li className="list-group-item">
              <a href="/admin/situacaoReclamacao" className="text-decoration-none">
                <h5 className="card-title">Listagem de áreas sem água</h5>
              </a>
              <p className="card-text">Visualize todas as áreas que ficaram sem água.</p>
            </li>

            {/* Item de listagem de simulações de quitação */}
            <li className="list-group-item">
              <a href="/admin/situacaoSimulacao" className="text-decoration-none">
                <h5 className="card-title">Listagem de simulações de quitação</h5>
              </a>
              <p className="card-text">Visualize todas as tentativas de quitação de dívidas.</p>
            </li>

            {/* Item de criação de nova conta de administrador */}
            <li className="list-group-item">
              <a href="/admin/criarAdmin" className="text-decoration-none">
                <h5 className="card-title">Criar uma nova conta de administrador</h5>
              </a>
              <p className="card-text">Crie contas somente para funcionários de confiança.</p>
            </li>

          </ul>

        </div>

      </div>

      {/* Botão de sair */}
      <div className="d-flex flex-column align-items-end mt-4">

        <button className="btn btn-primary" onClick={handleSignOut}> Sair </button>

      </div>

    </div>

  );

};

export default AdminArea;
