import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth"
import { useMutation } from "@tanstack/react-query";
import { loginRequest } from "@/api/authApi";


export const useLogin = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const redirectTo = location.state?.from?.pathname || '/';

    return useMutation({
        mutationFn: loginRequest,
        onSuccess: ({ data }) => {

            console.log("Redirecting to:", redirectTo);
            
            login(data?.accessToken, data?.user);
            navigate(redirectTo, { replace: true });
        }
    })


}