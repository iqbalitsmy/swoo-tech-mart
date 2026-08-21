import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom"
import { useAuth } from "./useAuth";
import { registerRequest } from "@/api/authApi";


export const useRegister = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: registerRequest,
        onSuccess: ({data}) => {
            login(data?.accessToken, data?.user)
            navigate('/', { replace: true })
        }
    })
}