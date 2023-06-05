import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Principal from '../pages/user/principal';

import ListaServicos from "../pages/user/listaServicos";
import AbrirReclamacao from "../pages/user/abrirreclamao";
import Dividas from "../pages/user/dividas";


import Admin from "../pages/admin/principalAdmin";
import ListaReclamacoes from "../pages/admin/listaReclamacoes";
import ListaSimulacoes from "../pages/admin/listaSimulacao";
import CriarAdmin from "../pages/admin/criarAdmin";


import Restrito from "../pages/user/login";

import useAuth from "../hooks/useAuths";

const Private = ({ Item }) => {
  const { signed } = useAuth();

  return signed > 0 ? <Item /> : <Restrito />;
  
};


const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Principal/>} />

        <Route path="/user/lista" element={<ListaServicos/>} />
        <Route path="/user/reclamacoes" element={<AbrirReclamacao/>} />
        <Route path="/user/servico" element={<Dividas/>} />

        <Route path="/user/restrito" element={<Restrito/>} />
       
        <Route path="/admin" element={<Private Item={Admin}  />} />
        <Route path="/admin/situacaoReclamacao" element={ <Private Item={ListaReclamacoes} /> } />
        <Route path="/admin/situacaoSimulacao" element={ <Private Item={ListaSimulacoes} /> } />
        <Route path="/admin/criarAdmin" element={< Private Item={ CriarAdmin }/>} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;