import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";

function AddCabin() {
	return (
		<div>
			<Modal>
				<Modal.Open opens="cabin-form">
					<Button>Add new cabin</Button>
				</Modal.Open>
				<Modal.Window name="cabin-form">
					<CreateCabinForm />
				</Modal.Window>
			</Modal>
		</div>
		// 		<Modal opens="table">
		// 	<Modal.Open>
		// 		<Button>Add new cabin</Button>
		// 	</Modal.Open>
		// 	<Modal.Window name="table">
		// 		<CreateCabinForm />
		// 	</Modal.Window>
		// </Modal>
	);
}

// function AddCabin() {
// 	const [isOpenModal, setIsOpenModal] = useState(false);

// 	return (
// 		<div>
// 			<Button onClick={() => setIsOpenModal((s) => !s)}>Add new cabin</Button>
// 			{isOpenModal && (
// 				<Modal onClose={() => setIsOpenModal(false)}>
// 					<CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
// 				</Modal>
// 			)}
// 		</div>
// 	);
// }

export default AddCabin;
