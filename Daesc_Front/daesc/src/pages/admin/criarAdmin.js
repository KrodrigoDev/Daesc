import React, { useState } from 'react';
import useAuth from '../../hooks/useAuths';

const CriarAdmin = () => {

    // Estados para armazenar os valores dos campos e mensagens de feedback
    
    const [email, setEmail] = useState(''); // Estado para armazenar o valor do campo de e-mail
    const [emailConf, setEmailConf] = useState(''); // Estado para armazenar o valor do campo de confirmação de e-mail
    const [senha, setSenha] = useState(''); // Estado para armazenar o valor do campo de senha
    const [flashMessages, setFlashMessages] = useState([]); // Estado para armazenar mensagens de feedback

    const { signup } = useAuth(); // Utiliza o hook personalizado de autenticação

    const handleCadastrar = () => { // Função para tratar o evento de cadastro

        if (!email || !emailConf || !senha) {
            setFlashMessages([{ text: 'Por favor, preencha todos os campos.', type: 'error' }]);
            return;
        } else if (email !== emailConf) {
            setFlashMessages([{ text: 'Os e-mails não são iguais.', type: 'error' }]);
            return;
        }

        const res = signup(email, senha);

        if (res) {
            setFlashMessages([{ text: res, type: 'error' }]);
            return;
        }

        setFlashMessages([{ text: 'Admin cadastrado com sucesso!', type: 'success' }]);
        setEmail('');
        setEmailConf('');
        setSenha('');
    };

    return (

        <div>

            {/* Exibe mensagens de feedback */}
            {flashMessages.length > 0 && (
                <div>
                    {flashMessages.map((message, index) => (
                        <div
                            key={index}
                            className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'}`}
                            role="alert"
                        >
                            {message.text}
                        </div>
                    ))}
                </div>
            )}

            <h3>Criar uma nova conta administrativa</h3>

            <div className="card">

                <div className="card-body">

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
                                onChange={(e) => [setEmail(e.target.value), setFlashMessages([])]}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="senha">Confirme seu e-mail:</label>
                            <input
                                type="email"
                                name="emailConf"
                                id="emailConf"
                                placeholder="Confirme seu e-mail"
                                className="form-control"
                                value={emailConf}
                                onChange={(e) => [setEmailConf(e.target.value), setFlashMessages([])]}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="senha">Senha:</label>
                            <input
                                type="password"
                                name="senha"
                                id="senha"
                                placeholder="Crie uma senha"
                                className="form-control"
                                value={senha}
                                onChange={(e) => [setSenha(e.target.value), setFlashMessages([])]}
                            />
                        </div>

                        <button type="button" className="btn btn-success mt-4" onClick={handleCadastrar}>
                            Criar Conta
                        </button>
                        
                    </form>
                </div>

            </div>

        </div>
    );
};

export default CriarAdmin;
