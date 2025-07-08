import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
// import Button from "../../ui/Button";
// import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import {
	HiArrowDownOnSquareStack,
	HiArrowUpOnSquareStack,
	HiTrash,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";

const HeadingGroup = styled.div`
	display: flex;
	gap: 2.4rem;
	align-items: center;
`;

function BookingDetail() {
	const { booking, isLoading } = useBooking();
	const { deleteBooking, isDeleting } = useDeleteBooking();

	const { checkout, isCheckingOut } = useCheckout();

	const navigate = useNavigate();
	const moveBack = useMoveBack();

	const statusToTagName = {
		unconfirmed: "blue",
		"checked-in": "green",
		"checked-out": "silver",
	};

	if (isLoading || isCheckingOut) return <Spinner />;
	const { status, id } = booking;

	return (
		<>
			<Row type="horizontal">
				<HeadingGroup>
					<Heading as="h1">Booking #{id}</Heading>
					<Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
				</HeadingGroup>
				{/* <ButtonText onClick={moveBack}>&larr; Back</ButtonText> */}
			</Row>
			<BookingDataBox booking={booking} />
			<ButtonGroup>
				{status.toLowerCase() === "unconfirmed" && (
					<Button
						onClick={() => navigate(`/checkin/${id}`)}
						icon={<HiArrowDownOnSquareStack />}
					>
						Check In
					</Button>
				)}
				{status.toLowerCase() === "checked-in" && (
					<Button
						onClick={() => {
							checkout(id);
						}}
						icon={<HiArrowUpOnSquareStack />}
						disabled={isCheckingOut}
					>
						Check Out
					</Button>
				)}
				{status.toLowerCase() === "checked-out" && (
					<Button
						onClick={() => {
							deleteBooking(id);
							navigate("/bookings");
						}}
						icon={<HiTrash />}
						disabled={isDeleting}
						variation="danger"
					>
						Delete
					</Button>
				)}
				<Button variation="secondary" onClick={moveBack}>
					Back
				</Button>
			</ButtonGroup>
		</>
	);
}

export default BookingDetail;
