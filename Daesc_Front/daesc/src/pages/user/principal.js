import React from 'react';

// Componente reutilizável para exibir um card explicativo
const CardExplicativo = ({ titulo, texto }) => {

  return (
    <div className="col-md-6 mb-4">
      <div className="card h-100">
        <div className="card-body">
          <h5 className="card-title">{titulo}</h5>
          <p className="card-text">{texto}</p>
        </div>
      </div>
    </div>
    
  );
};

const Principal = () => {

  return (

    <div className="container-fluid p-0">

      <div style={{ background: '#E9ECEF' }} className="p-5 rounded-lg m-3">

        <h1 className="display-4">Daesc</h1>

        <p className="lead">Água pura e refrescante ao alcance de suas mãos.</p>

        <hr className="my-4" />

        <p>
          Mantenha o controle da sua hidratação com a Daesc. Tenha acesso a água potável de qualidade e conte com nossos
          serviços para manter sua fonte de hidratação sempre abastecida.
        </p>

        <a className="btn btn-primary btn-lg" href="/abrirReclamacao" role="button">
          Saiba Mais
        </a>

      </div>

      <hr className="my-5" />

      <div className="container mt-5">

        <h2 className="mb-4">Como funciona</h2>

        <div className="row">

          {/* Card explicativo: Registre sua reclamação */}
          <CardExplicativo
            titulo="Registre sua reclamação"
            texto="Abra uma reclamação informando locais que estão sem água. Ajude a comunidade a resolver os problemas de abastecimento."
          />

          {/* Card explicativo: Simulação de Pagamento de Dívidas */}
          <CardExplicativo
            titulo="Simule quitação de dívidas"
            texto="Faça simulações de quitação de dívidas e veja se o valor é acessível para você."
          />

        </div>

      </div>

    </div>

  );

};

export default Principal;
