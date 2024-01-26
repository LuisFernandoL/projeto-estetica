import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { getCookie, setCookie } from "cookies-next";
import api from "@/services/api";

interface Props {
    children: ReactNode;
}

interface IUser {
    id: number;
    name: string;
    admin: boolean;
    email: string;
}

interface IUserLogin {
    token: string;
    user: IUser;
}

interface UserProviderData {
    user: IUser | null;
    setUser: Dispatch<SetStateAction<IUser | null>>;
    login: (formData: any) => Promise<void>;
    logout: () => void;
}

const UserContext = createContext<UserProviderData>({} as UserProviderData);

export function useUser() {
    return useContext(UserContext);
}

export const UserProvider = ({ children }: Props) => {
    const [user, setUser] = useState<IUser | null>(null);

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

    const login = async (formData: any) => {
        try {
            const response = await api.post("/login", formData);

            const userData: IUserLogin = response.data;
            setUser(userData.user);
            localStorage.setItem("@TOKEN", userData.token);
            localStorage.setItem("@USERID", JSON.stringify(userData.user.admin));

            // setCookie("aesthetics.token", userData.token, {
            //     maxAge: 60 * 60 * 24,
            //     path: "/",
            // });

            // setCookie("aesthetics.admin", userData.user.admin, {
            //     maxAge: 60 * 60 * 24,
            //     path: "/",
            // });

        } catch (error) {
            console.error("Erro ao fazer login", error);
        }
    };

    const logout = () => {
        setUser(null);
        setCookie("aesthetics.token", "", { expires: new Date(0), path: "/" });
    };

    return (
        <UserContext.Provider value={{ user, setUser, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}



