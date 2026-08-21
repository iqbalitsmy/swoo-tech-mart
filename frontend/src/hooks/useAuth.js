import { changePasswordRequest } from "@/api/authApi";
import { AuthContext } from "@/context/AuthContext"
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react"
import { toast } from "sonner";


export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be user inside an <AuthProvider>")
    }

    return context;
}

export const useChangePassword = ({ onSuccess } = {}) => {
    return useMutation({
        mutationFn: changePasswordRequest,
        onSuccess: (data) => {
            toast.success('Password updated successfully');
            onSuccess?.(data);
        },
        onError: (err, _variables, _context) => {
            console.log(err)
            const status = err?.response?.status;
            const message = err?.response?.data?.message || 'Failed to update password';

            toast.error(message);

            // Surface "current password incorrect" on the right field via the caller's setError
            if (status === 400 || status === 401) {
                return { field: 'currentPassword', message };
            }
        },
    });
};