"use client"

import { useAuth } from "@/contexts/authContext";
import { UserData, UserSchema } from "@/schemas/userSchema";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

const RegisterForm = () => {
    const { register, handleSubmit } = useForm<UserData>({
        resolver: zodResolver(UserSchema)
    });

    const { register: registerUser } = useAuth();

    const onFormSubmit = (formData: UserData) => {
        registerUser(formData);
    };
    return (
        <div className="bg-gray-800 w-4/5 md:w-1/4 min-h-[550px] h-auto flex flex-col items-center justify-center gap-7 py-12 shadow-inner rounded-lg shadow-blue-800">
            <p className="sm:text-3xl md:text-4xl mt-6 font-semibold">Fazer cadastro</p>
            <form className="space-y-6 w-4/5" onSubmit={handleSubmit(onFormSubmit)}>
                <div>
                    <label htmlFor="name" className="user-form-label">
                        Nome
                    </label>
                    <div className="mt-2  text-gray-950">
                        <input
                            type="text"
                            placeholder="Seu Nome"
                            className="w-full h-7"
                            {...register("name")}
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="email" className="user-form-label">
                        E-mail
                    </label>
                    <div className="mt-2  text-gray-950">
                        <input
                            type="email"
                            placeholder="example@.com"
                            className="w-full h-7"
                            {...register("email")}
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="password" className="user-form-label">
                        Password
                    </label>
                    <div className="mt-2  text-gray-950">
                        <input
                            type="password"
                            placeholder="Sua senha"
                            className="w-full h-7"
                            {...register("password")}
                        />
                    </div>
                </div>
                <div>
                    <button type="submit" className="user-form-button">
                        Cadastrar
                    </button>
                </div>

                <Link href={"/login"} className="user-form-link  text-gray-950">
                    Ir para o login
                </Link>
            </form>
        </div>
    );
};

export default RegisterForm;
