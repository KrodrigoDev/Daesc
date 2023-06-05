import React from 'react';
import Headers from './Cabecalho';
import Footer from './Rodape';

const Layout = ({ error, children }) => {
  
  const containerStyle = {
    flex: '1 0 auto',
  };

  const bodyStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  };

  const footerStyle = {
    marginTop: '20px',
    flexShrink: 0,
  };

  return (

    <html lang="pt-br">

      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/png" href="https://github.com/Turma-Nassau/Kakau007_Daesc/blob/main/pingo-dagua.png?raw=true" />
        <meta name="author" content="kauã Rodrigo de Lima Barbosa" />
        <link rel="stylesheet" href="/css/bootstrap.css" />
        <title>Daesc</title>
      </head>

      <body style={bodyStyle}>

        {/* Componente de cabeçalho */}
        <Headers />

        <div className="container mt-4" style={containerStyle}>

          {/* Exibe um alerta de erro, se houver */}
          {error && <div className="alert alert-danger">{error}</div>}

          {/* Conteúdo principal, passado como prop "children" */}
          {children}

        </div>

        {/* Componente de rodapé */}
        <footer className="footer navbar-relative-bottom" style={footerStyle}>
          <Footer />
        </footer>

        {/* Scripts do Bootstrap */}
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js" integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossOrigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha2/dist/js/bootstrap.min.js" integrity="sha384-heAjqF+bCxXpCWLa6Zhcp4fu20XoNIA98ecBC1YkdXhszjoejr5y9Q77hIrv8R9i" crossOrigin="anonymous"></script>
        <script src="/js/bootstrap.js"></script>

      </body>

    </html>

  );
};

export default Layout;