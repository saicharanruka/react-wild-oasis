import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

function CreateCabinForm({ cabinToEdit = {} }) {
	const { id: editId, ...editValues } = cabinToEdit;
	const isEditSession = Boolean(editId);

	const queryClient = useQueryClient();
	const { register, handleSubmit, reset, getValues, formState } = useForm({
		defaultValues: isEditSession ? editValues : {},
	});
	const { errors } = formState;

	const { isLoading: isCreating, mutate: createCabin } = useMutation({
		mutationFn: (data) => {
			return createEditCabin(data);
		},
		onSuccess: () => {
			toast.success("Cabin created successfully");
			queryClient.invalidateQueries({ queryKey: ["cabins"] });
			reset();
		},
		onError: (err) => toast.error(err.message),
	});

	const { isLoading: isEditing, mutate: editCabin } = useMutation({
		mutationFn: ({ newCabinData, id }) => {
			return createEditCabin(newCabinData, id);
		},
		onSuccess: () => {
			toast.success("Cabin edited successfully");
			queryClient.invalidateQueries({ queryKey: ["cabins"] });
			reset();
		},
		onError: (err) => toast.error(err.message),
	});

	const isWorking = isEditing || isCreating;

	function onSubmit(data) {
		const image = typeof data.image === "string" ? data.image : data.image[0];
		// console.log(data);
		if (isEditSession)
			editCabin({ newCabinData: { ...data, image }, id: editId });
		else createCabin({ ...data, image: image });
	}

	function onError(errors) {
		console.log(errors);
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit, onError)}>
			<FormRow label="Cabin name" error={errors?.name?.message}>
				<Input
					type="text"
					id="name"
					disabled={isWorking}
					{...register("name", {
						required: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow label="Maximum Capacity" error={errors?.maxCapacity?.message}>
				<Input
					type="number"
					id="maxCapacity"
					disabled={isWorking}
					{...register("maxCapacity", {
						required: "This field is required",
						min: { value: 1, message: "Capacity should be atleast 1" },
					})}
				/>
			</FormRow>

			<FormRow label="Regular Price" error={errors?.regularPrice?.message}>
				<Input
					type="number"
					id="regularPrice"
					disabled={isWorking}
					{...register("regularPrice", { required: "This field is required" })}
				/>
			</FormRow>

			<FormRow label="Discount" error={errors?.discount?.message}>
				<Input
					type="number"
					id="discount"
					disabled={isWorking}
					defaultValue={0}
					{...register("discount", {
						required: "This field is required",
						validate: (value) =>
							value <= getValues().regularPrice ||
							"Discount should be less than regular price",
					})}
				/>
			</FormRow>

			<FormRow
				label="Description for website"
				error={errors?.description?.message}
			>
				<Textarea
					type="number"
					id="description"
					disabled={isWorking}
					defaultValue=""
					{...register("description", { required: "This field is required" })}
				/>
			</FormRow>

			<FormRow label="Cabin photo" error={errors?.image?.message}>
				<FileInput
					id="image"
					accept="image/*"
					{...register("image", {
						required: isEditSession ? false : "This field is required",
					})}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button variation="secondary" type="reset">
					Cancel
				</Button>
				<Button disabled={isWorking}>
					{isEditSession ? "Edit cabin" : "Create new cabin"}
				</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
