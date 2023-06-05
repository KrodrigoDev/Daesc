import { useContext } from "react";
import { AuthContext } from "../contexts/auth";

// Hook personalizado para acessar o contexto de autenticação
const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};

export default useAuth;

/* 
Neste código, importamos o hook `useContext` do React e o contexto `AuthContext` de um arquivo externo.

A função `useAuth` é um hook personalizado que retorna o valor do contexto `AuthContext`.

O hook `useContext` é utilizado para obter o valor do contexto `AuthContext` e o retornamos.

Este hook personalizado `useAuth` pode ser utilizado em outros componentes para acessar as propriedades e métodos do contexto de autenticação de forma simplificada.
*/