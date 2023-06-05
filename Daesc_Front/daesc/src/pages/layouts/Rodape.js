import React from 'react';

// Estilos CSS para o rodapé
const footerStyle = {
  color: 'white',
  textAlign: 'center',
  flexShrink: 0,
};

// Estilos CSS para o autor
const autorStyle = {
  color: '#FFFFFF6A',
  textDecoration: 'none',
};



// Componente Footer que representa o rodapé da página
const Footer = () => {
  return (
    <footer style={footerStyle} className="bg-dark text-center text-lg-start mt-4" data-bs-theme="dark">

      <div style={{ color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="text-center p-3">

        {/* Texto de direitos autorais */}
        <span style={{ verticalAlign: 'middle', marginRight: '5px' }}>© 2023 Todos os direitos reservados:</span>

        {/* Link para o perfil do autor */}
        <a style={autorStyle} target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/kau%C3%A3-rodrigo-16535725b/">
          kauaa_rodrigoo
        </a>
        
      </div>

    </footer>
  );
};

export default Footer;


