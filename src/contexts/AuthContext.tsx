import { destroyCookie, parseCookies, setCookie } from "nookies";
import { createContext, ReactNode, useEffect, useState } from "react";
import Router from "next/router";

// api do servidor
import { api } from "../services/apiClient";
import { toast } from "react-toastify";

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SigninProps) => Promise<void>;
  signOut: () => void;
  signUp: (credentials: SignUpProps) => Promise<void>;
};

type UserProps = {
  id: string;
  name: string;
  lastname?: string;
  email: string;
};

type SigninProps = {
  email: string;
  password: string;
};

type SignUpProps = {
  name: string;
  lastname: string;
  email: string;
  password: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  try {
    destroyCookie(undefined, "@nextAuth.token");
    Router.push("/");
  } catch (error) {
    console.log("Erro ao deslogar");
  }
}

// provider => quem vai prover os dados
export function AuthProvider({ children }: AuthProviderProps) {
  // state obedece o type com seus atributos id, name, email
  const [user, setUser] = useState<UserProps>();
  const isAuthenticated = !!user; // !! converte a variavel em boleano: quando user tiver valor

  // ciclo de vida da aplicação com useEffect()
  useEffect(() => {
    // tentar pegar algo no cookie
    const { "@nextAuth.token": token } = parseCookies();

    if (token) {
      api
        .get("/me")
        .then((response) => {
          const { id, name, lastname, email } = response.data;

          setUser({
            id,
            name,
            lastname,
            email,
          });
        })
        .catch((error) => {
          // Se deu erro deslogamos o user!
          signOut();
        });
    }
  }, []);

  // recebe os dados digitados no login do pages/index
  async function signIn({ email, password }: SigninProps) {
    try {
      const response = await api.post("/session", {
        email,
        password,
      });

      const { id, name, token } = response.data;

      setCookie(undefined, "@nextAuth.token", token, {
        maxAge: 60 * 60 * 24 * 30, // expira em 30 dias
        path: "/", // quais caminhos terãoa cesso o cookie o '/ acessa em todas as paginas
      });

      setUser({ id, name, email });

      // passar para as outras requisições o token
      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      // alerta personalizado do react-toastfy
      toast.success("Logado com sucesso!");

      // redirecionar o user para /dashboard
      Router.push("/dashboard");
    } catch (error) {
      toast.error("Erro ao acessar");
      console.log("Erro ao acessar", error);
    }
  }

  async function signUp({ name, lastname, email, password }: SignUpProps) {
    try {
      const response = await api.post("/users", {
        name,
        lastname,
        email,
        password,
      });

      toast.success("Conta criada!!");

      Router.push("/");
    } catch (error) {
      toast.error("Erro ao criar conta");
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, signOut, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
}
