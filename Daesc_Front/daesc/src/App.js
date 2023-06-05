import React from "react";
import Routes from "./routes/routes";

import { AuthProvider } from "./contexts/auth";

// Componente principal da aplicação

const App = () => {

  return (

    <div>
      
      <AuthProvider>    {/* Provedor de autenticação */}

        <Routes />      {/* Rotas da aplicação */}

      </AuthProvider>
    </div>

  );
  
};

export default App;

