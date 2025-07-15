import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
	const queryClient = useQueryClient();

	const { isLoading, mutate: updateUser } = useMutation({
		mutationFn: updateCurrentUser,
		onSuccess: ({ user }) => {
			toast.success("User updated successfully");
			queryClient.setQueryData(["user"], user);
			queryClient.invalidateQueries({ queryKey: ["user"] });
		},
		onError: (err) => toast.error(err.message),
	});

	return { isLoading, updateUser };
}
