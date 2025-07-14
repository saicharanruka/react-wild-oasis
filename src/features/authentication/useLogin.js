import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { mutate: login, isPending: isLoading } = useMutation({
		mutationFn: ({ email, password }) => loginApi({ email, password }),
		onSuccess: () => {
			queryClient.invalidateQueries(["user"]);
			navigate("/dashboard");
		},
		onError: (err) => {
			console.error("ERROR:", err);
			toast.error("Provided email/password are incorrect");
		},
	});

	return { login, isLoading };
}
