import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
	let { data: cabins, error } = await supabase.from("cabins").select("*");

	if (error) {
		console.error(error);
		throw new Error("Cabins table could not be loaded");
	}

	return cabins;
}

// https://cvpmzukpvtoiuwvvdxtw.supabase.co/storage/v1/object/public/cabin-images//cabin-001.jpg

export async function createCabin(newCabin) {
	// 1. Generate image url
	const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
		"/",
		""
	);
	const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

	// 2. Upload data + image url
	const { data, error } = await supabase
		.from("cabins")
		.insert([{ ...newCabin, image: imagePath }])
		.select();

	if (error) {
		console.error(error);
		throw new Error("Cabins table could not be created");
	}

	// 3. Upload image to bucket
	const { error: storageError } = await supabase.storage
		.from("cabin-images")
		.upload(imageName, newCabin.image);
	if (storageError) {
		// 4. Delete cabin if there was an an error uploading image
		await supabase.from("cabins").delete().eq("id", data.id);
		console.error(storageError);
		throw new Error(
			"Cabins image could not be uploaded hence cabin was not created"
		);
	}
}

export async function deleteCabin(id) {
	const { error } = await supabase.from("cabins").delete().eq("id", id);

	if (error) {
		console.error(error);
		throw new Error("Cabins table could not be deleted");
	}
}
