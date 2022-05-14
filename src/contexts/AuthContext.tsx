import { createContext, ReactNode, useState } from "react";

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signin: (credentials: SigninProps) => Promise<void>;
};

type UserProps = {
  id: string;
  name: string;
  email: string;
};

type SigninProps = {
  email: string;
  password: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

// provider => quem vai prover os dados
export function AuthProvider({ children }: AuthProviderProps) {
  // state obedece o type com seus atributos id, name, email
  const [user, setUser] = useState<UserProps>();
  const isAuthenticated = !!user; // !! converte a variavel em boleano: quando user tiver valor

  // recebe os dados digitados no login do pages/index
  async function signin({ email, password }: SigninProps) {
    console.log("Email: ", email);
    console.log("password: ", password);
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signin }}>
      {children}
    </AuthContext.Provider>
  );
}
