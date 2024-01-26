"use client"
import { LoginData, UserData } from "@/schemas/userSchema";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import { getCookie, setCookie } from 'cookies-next';

import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { Toast } from "@/components/toast";

interface Props {
  children: ReactNode;
}
interface IUser {
  id: number;
  name: string;
  admin: boolean;
  email: string;
}

interface AuthProviderData {
  register: (userData: UserData) => void;
  login: (loginData: LoginData) => void;
  user: IUser | null;
  setUser: Dispatch<SetStateAction<IUser | null>>;
  logout: () => void
}

const AuthContext = createContext<AuthProviderData>({} as AuthProviderData);

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<IUser | null>(null);

  const router = useRouter();

  useEffect(() => {
    const token = getCookie("aesthetics.token");
    if (token) {
      api.get("/users", { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
          const userData: IUser = response.data;
          setUser(userData);
        })
        .catch(error => {
          console.error("Erro ao buscar dados do usuário:", error);
        });
    }
  }, []);

  const register = (userData: UserData) => {
    api
      .post("/users", userData)
      .then(() => {
        Toast({ message: "Usuário cadastrado com sucesso", isSucess: true });
        router.push("/login");
      })
      .catch((error) => {
        console.log(error);
        Toast({ message: "Erro ao criar usuário, tente utilizar outro e-mail" });
      });
  };

  const login = (loginData: LoginData) => {
    api
      .post("/login", loginData)
      .then((response) => {
        setCookie("aesthetics.token", response.data.token, {
          maxAge: 60 * 30,
        });
      })
      .then(() => {
        Toast({ message: "Login realizado com sucesso", isSucess: true });
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
        Toast({ message: "Erro ao logar, verifique se o e-mail e senha estão corretos" });
      });
  };

  const logout = () => {
    setUser(null);
    setCookie("aesthetics.token", "", { expires: new Date(0), path: "/" });
  };


  return (
    <AuthContext.Provider value={{ user, setUser, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
