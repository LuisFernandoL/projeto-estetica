"use client"


import { useAuth } from "@/contexts/authContext";
import { LoginData, loginSchema } from "@/schemas/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const { register, handleSubmit } = useForm<LoginData>({
    resolver: zodResolver(loginSchema)
  });
  const { login } = useAuth();

  const onFormSubmit = (formData: LoginData) => {
    login(formData);
  };
  return (
    <div className="bg-gray-800 w-4/5 md:w-1/4 min-h-[550px] h-auto flex flex-col items-center justify-center gap-7 py-12 shadow-inner rounded-lg shadow-blue-800">
      <p className="sm:text-3xl md:text-3xl  mt-6 font-semibold">Login</p>
      <form className="space-y-6 w-4/5" onSubmit={handleSubmit(onFormSubmit)}>
        <div>
          <label htmlFor="email" className="user-form-label">
            E-mail
          </label>
          <div className="mt-2 w-full  text-gray-950">
            <input
              type="email"
              placeholder="example@.com"
              className="w-full h-7"
              {...register("email")}
            />
          </div>
        </div>
        <div>
          <label htmlFor="password" className="md:text-2xl sm:text-xl font-medium leading-6 text-gray-100">
            Password
          </label>
          <div className="mt-2 text-gray-950">
            <input 
              type="password"
              placeholder="Sua senha"
              className="w-full h-7 "
              {...register("password")}
            />
          </div>
          <Link href={"/resetPassword"} className="user-form-link">
            Esqueceu a senha ? Clique aqui
          </Link>
        </div>
        <div>
          <button type="submit" className="user-form-button  text-gray-950">
            Entrar
          </button>
        </div>

        <Link href={"/register"} className="user-form-link text-blue-300">
          Não é cadastrado ainda? Clique aqui
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
