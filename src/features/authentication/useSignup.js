import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
	const { mutate: signUp, isLoading } = useMutation({
		mutationFn: signUpApi,
		onSuccess: () => {
			toast.success("Created new user!");
		},
	});

	return { signUp, isLoading };
}
