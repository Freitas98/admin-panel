import { useState } from "react";
import AuthInput from "../components/auth/AuthInput";
import { GoogleIcon, WarningIcon } from "../components/icons";
import useAuth from "../data/hook/useAuth";

export default function Authentication() {
    
    const { signup, loginWithGoogle, login } = useAuth();

    const [error, setError] = useState(null)
    const [mode, setMode] = useState<"login" | "signup">("login")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    async function submit() {
        try {
            if(mode === "login"){
                await login(email, password);
            } else {
                await signup(email, password);
            }
        } catch (error) {
            showError(error?.message ?? "Ocorreu um erro desconhecido")
        }
    }

    async function submitWithGoogle() {
        try {
            await loginWithGoogle()
        } catch (error) {
            showError(error?.message ?? "Ocorreu um erro desconhecido")
        }
    }

    function showError(msg, timeInSecs = 5) {
        setError(msg)
        setTimeout(() => setError(null), timeInSecs * 1000)
    }

    return (
        <div className="flex h-screen items-center justify-center">
            <div className={`hidden md:block md:w-1/2 lg:w-2/3`}>
                <img 
                    src="https://source.unsplash.com/random" 
                    alt="Imagem da tela de autenticação"
                    className="h-screen w-full object-cover"
                />
            </div>
            <div className={`m-10 w-full md:w-1/2 lg:w-1/3`}>
                <h1 className={`
                    text-3xl font-bold mb-5 leading-10
                `}>
                    {mode === "login" ? "Entre com a sua conta" : "Registe-se na Plataforma"}
                </h1>

                {error ? (
                    <div className={`
                        flex items-center justify-center
                        bg-red-400 text-white py-7 px-5 my-2
                        border border-red-700
                        rounded-lg
                    `}>
                        {WarningIcon(8)}
                        <span className="ml-4 text-center">{error}</span>
                    </div>
                ) : false }

                <AuthInput 
                    label="Email"
                    type="email"
                    value={email}
                    onChange={setEmail}
                    required
                />
                <AuthInput 
                    label="Senha"
                    type="password"
                    value={password}
                    onChange={setPassword}
                    required
                />

                <button onClick={submit} className={`
                    w-full bg-indigo-500 hover:bg-indigo-400
                    text-white rounded-lg px-4 py-3 mt-6
                `}>
                    {mode === "login" ? "Login" : "Registar"}
                </button>

                <hr className="my-6 border-gray-300 w-full"/>
            
                <button onClick={submitWithGoogle} className={`
                    w-full bg-red-500 hover:bg-red-400
                    text-white rounded-lg px-4 py-3
                `}>
                    <div className="flex justify-center items-center gap-3">
                        <div className="bg-white rounded-full">
                            {GoogleIcon(7)}
                        </div> 
                        <span>Entrar com Conta Google</span> 
                    </div>
                </button>

                {mode === "login" ? (
                    <p className="mt-8">
                        Novo por aqui?
                        <a onClick={() => setMode("signup")} className={`
                            text-blue-500 hover:text-blue-700 font-semibold
                            cursor-pointer
                        `}> Criar conta gratuitamente
                        </a>
                    </p>
                ) : (
                    <p className="mt-8">
                        Já tem conta?
                        <a onClick={() => setMode("login")} className={`
                            text-blue-500 hover:text-blue-700 font-semibold
                            cursor-pointer
                        `}> Faça aqui o seu login
                        </a>
                    </p>
                )}
            </div>
        </div>
    )
}