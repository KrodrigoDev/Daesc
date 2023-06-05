import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuths';

const LoginPage = () => {

  const { signin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [flashMessage, setFlashMessage] = useState('');

  useEffect(() => {

    if (flashMessage) {

      // Configura um timer para remover a mensagem de sucesso após 3 segundos
      const flashTimeout = setTimeout(() => {
        setFlashMessage('');
        localStorage.removeItem('flashMessage'); // Remove a mensagem do localStorage
      }, 3000);

      // Limpa o timer quando o componente é desmontado
      return () => clearTimeout(flashTimeout);
    }

  }, [flashMessage]);

  const handleLogin = () => {
    if (!email || !senha) {
      setErrorMessage('Preencha todos os campos');
      return;
    }

    const res = signin(email, senha);

    if (res) {
      setErrorMessage(res);
      return;
    }

    setFlashMessage('Usuário logado com sucesso');
    localStorage.setItem('flashMessage', 'Usuário logado com sucesso'); // Armazena a mensagem no localStorage
    navigate('/admin');

  };

  return (

    <div className="container-fluid bg-light py-5">

      <div className="row justify-content-center align-items-center">

        <div className="col-md-6">

          <h1 className="text-center mb-4">StockRotativo</h1>

          <div className="card bg-white shadow-sm p-4">

            <h2 className="mb-4">Acesse sua conta</h2>

            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            {flashMessage && <p className="text-success">{flashMessage}</p>}

            <form>

              <div className="form-group">
                <label htmlFor="email">E-mail:</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Digite seu e-mail"
                  className="form-control"
                  value={email}
                  onChange={(e) => [setEmail(e.target.value), setErrorMessage('')]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="senha">Senha:</label>
                <input
                  type="password"
                  name="senha"
                  id="senha"
                  placeholder="Digite sua senha"
                  className="form-control"
                  value={senha}
                  onChange={(e) => [setSenha(e.target.value), setErrorMessage('')]}
                />
              </div>

              <button type="button" className="btn btn-primary w-100 mb-3 mt-3" onClick={handleLogin}>
                Acessar
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>

  );

};

export default LoginPage;
