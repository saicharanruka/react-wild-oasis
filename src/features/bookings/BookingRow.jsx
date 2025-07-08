import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import Menus from "../../ui/Menus";
import {
	HiArrowDownOnSquareStack,
	HiArrowUpOnSquareStack,
	HiEye,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";
import { HiTrash } from "react-icons/hi";

const Cabin = styled.div`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--color-grey-600);
	font-family: "Sono";
`;

const Stacked = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.2rem;

	& span:first-child {
		font-weight: 500;
	}

	& span:last-child {
		color: var(--color-grey-500);
		font-size: 1.2rem;
	}
`;

const Amount = styled.div`
	font-family: "Sono";
	font-weight: 500;
`;

function BookingRow({
	booking: {
		id: bookingId,
		created_at,
		startDate,
		endDate,
		numNights,
		numGuests,
		totalPrice,
		status,
		guests: { fullName: guestName, email },
		cabins: { name: cabinName },
	},
}) {
	const statusToTagName = {
		unconfirmed: "blue",
		"checked-in": "green",
		"checked-out": "silver",
	};

	const navigate = useNavigate();
	const { checkout, isCheckingOut } = useCheckout();
	const { deleteBooking, isDeleting } = useDeleteBooking();

	return (
		<Table.Row>
			<Cabin>{cabinName}</Cabin>
			<Stacked>
				<span>{guestName}</span>
				<span>{email}</span>
			</Stacked>
			<Stacked>
				<span>
					{isToday(new Date(startDate))
						? "Today"
						: formatDistanceFromNow(startDate)}{" "}
					&rarr; {numNights} night stay
				</span>
				<span>
					{format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
					{format(new Date(endDate), "MMM dd yyyy")}
				</span>
			</Stacked>
			<Tag type={statusToTagName[status.toLowerCase()]}>
				{status.replace("-", " ")}
			</Tag>
			<Amount>{formatCurrency(totalPrice)}</Amount>
			<Menus.Menu>
				<Menus.Toggle id={bookingId} />
				<Menus.List id={bookingId}>
					<Menus.Button
						onClick={() => navigate(`/bookings/${bookingId}`)}
						icon={<HiEye />}
					>
						See Details
					</Menus.Button>
					{status.toLowerCase() === "unconfirmed" && (
						<Menus.Button
							onClick={() => navigate(`/checkin/${bookingId}`)}
							icon={<HiArrowDownOnSquareStack />}
						>
							Check In
						</Menus.Button>
					)}
					{status.toLowerCase() === "checked-in" && (
						<Menus.Button
							onClick={() => {
								checkout(bookingId);
							}}
							icon={<HiArrowUpOnSquareStack />}
							disabled={isCheckingOut}
						>
							Check Out
						</Menus.Button>
					)}
					{status.toLowerCase() === "checked-out" && (
						<Menus.Button
							onClick={() => {
								deleteBooking(bookingId);
							}}
							icon={<HiTrash />}
							disabled={isDeleting}
							variation="danger"
						>
							Delete
						</Menus.Button>
					)}
				</Menus.List>
			</Menus.Menu>
		</Table.Row>
	);
}

export default BookingRow;
