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

    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-xl border min-w-48 p-8">
            <Input reference={usernameRef} placeholder="Username" />
            <Input reference={passwordRef} placeholder="Password" />
            <div className="flex justify-center pt-4">
                <Button onClick={signin} fullW={true} loading={false} variant="primary" text="Signin" />
            </div>
        </div>
    </div>
}