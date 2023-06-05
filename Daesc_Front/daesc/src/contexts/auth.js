import { createContext, useEffect, useState } from "react";
export const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {

  // Estado para armazenar as informações do usuário autenticado
  const [user, setUser] = useState();

  useEffect(() => {
    // Verifica se existem informações de token de usuário e dados de usuários armazenados no localStorage

    const userToken = localStorage.getItem("user_token");
    const usersStorage = localStorage.getItem("users_bd");

    if (userToken && usersStorage) {

      // Busca pelo usuário correspondente nos dados armazenados
      const hasUser = JSON.parse(usersStorage)?.filter(
        (user) => user.email === JSON.parse(userToken).email
      );

      if (hasUser) setUser(hasUser[0]);

    }

  }, []);

  // Função para autenticar um usuário com base em email e senha
  const signin = (email, password) => {
    const usersStorage = JSON.parse(localStorage.getItem("users_bd"));

    // Verifica se o usuário existe nos dados armazenados
    const hasUser = usersStorage?.filter((user) => user.email === email);

    if (hasUser?.length) {

      // Verifica se as credenciais estão corretas
      if (hasUser[0].email === email && hasUser[0].password === password) {

        // Gera um token de usuário e o armazena no localStorage
        const token = Math.random().toString(36).substring(2);
        localStorage.setItem("user_token", JSON.stringify({ email, token }));
        setUser({ email, password });

        return;

      } else {

        return "E-mail ou senha incorretos";

      }

    } else {

      return "Usuário não cadastrado";

    }

  };

  // Função para cadastrar um novo usuário
  const signup = (email, password) => {

    const usersStorage = JSON.parse(localStorage.getItem("users_bd"));

    // Verifica se já existe um usuário com o mesmo email nos dados armazenados
    const hasUser = usersStorage?.filter((user) => user.email === email);

    if (hasUser?.length) {

      return "Já tem uma conta com esse E-mail";

    }

    let newUser;

    if (usersStorage) {

      newUser = [...usersStorage, { email, password }];

    } else {

      newUser = [{ email, password }];

    }

    // Adiciona o novo usuário aos dados armazenados
    localStorage.setItem("users_bd", JSON.stringify(newUser));

    return;

  };

  // Função para fazer logout do usuário
  const signout = () => {

    // Define o usuário como null e remove o token de usuário do localStorage
    setUser(null);

    localStorage.removeItem("user_token");

  };

  return (

    <AuthContext.Provider value={{ user, signed: !!user, signin, signup, signout }} >
      {children}
    </AuthContext.Provider>

  );
};
