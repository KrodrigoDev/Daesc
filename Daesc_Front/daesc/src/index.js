import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { createRoot } from 'react-dom/client';

import Layout from './pages/layouts/Main';
import App from './App';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <Layout>{/* Componente de layout principal */}

     
      <App />  {/* Componente principal da aplicação */}

    </Layout>

  </React.StrictMode>
  
);
