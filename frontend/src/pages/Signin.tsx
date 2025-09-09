import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function Signin() {
    const navigate = useNavigate();
    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    async function signin(){
        const username = usernameRef.current?.value
        const password = passwordRef.current?.value

        const response = await axios.post(BACKEND_URL + "/api/v1/signin",
            {
                username,
                password
            }
        )
        localStorage.setItem("token",response.data.token)
        navigate("/dashboard")
    }

    return <div className="relative h-screen w-screen flex justify-center items-center overflow-hidden bg-gradient-to-br from-purple-200 to-gray-200">
        {/* animated background blobs */}
        <div className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 bg-purple-200 rounded-full blur-3xl opacity-70 animate-[float_12s_ease-in-out_infinite]" />
        <div className="pointer-events-none absolute top-1/2 -translate-y-1/2 -right-24 w-80 h-80 bg-purple-500/40 rounded-full blur-3xl animate-[float_14s_ease-in-out_infinite]" />
        <div className="pointer-events-none absolute -bottom-24 left-1/3 w-72 h-72 bg-purple-600/30 rounded-full blur-3xl animate-[float_16s_ease-in-out_infinite]" />

        <div className="bg-white rounded-xl border w-full max-w-md p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
            <div className="space-y-3">
                <Input reference={usernameRef} placeholder="Username" />
                <Input reference={passwordRef} placeholder="Password" />
                <div className="flex justify-center pt-2">
                    <Button onClick={signin} loading={false} variant="primary" text="Signin" className="px-6 py-2.5 text-base font-medium" />
                </div>
            </div>
        </div>
    </div>
}
