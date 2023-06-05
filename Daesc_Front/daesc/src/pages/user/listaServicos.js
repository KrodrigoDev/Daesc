import React from 'react';

const ListaServicos = () => {

  return (

    <div className="card">

      <div className="card-body">

        <h2 className="card-title">Daesc: serviços disponíveis</h2>

        <hr />

        <ul className="list-group list-group-flush">

          <li className="list-group-item">
            <a href="./reclamacoes" className="text-decoration-none">
              <h5 className="card-title">Abrir uma reclamação</h5>
            </a>
            <p className="card-text">Registre uma reclamação caso seu local tenha ficado sem água.</p>
          </li>

          <li className="list-group-item">
            <a href="./servico" className="text-decoration-none">
              <h5 className="card-title">Simular quitação de dívida</h5>
            </a>
            <p className="card-text">Simule a quitação de sua dívida relacionada ao fornecimento de água.</p>
          </li>

        </ul>

      </div>

    </div>

  );

};

export default ListaServicos;


