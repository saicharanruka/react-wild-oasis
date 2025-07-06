import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function BookingTableOperations() {
	return (
		<TableOperations>
			<Filter
				filteredField="status"
				options={[
					{ params: "all", name: "All" },
					{ params: "checked-out", name: "Checked out" },
					{ params: "checked-in", name: "Checked in" },
					{ params: "unconfirmed", name: "Unconfirmed" },
				]}
			/>

			<SortBy
				options={[
					{ params: "startDate-desc", name: "Sort by date (recent first)" },
					{ params: "startDate-asc", name: "Sort by date (earlier first)" },
					{
						params: "totalPrice-desc",
						name: "Sort by amount (high first)",
					},
					{ params: "totalPrice-asc", name: "Sort by amount (low first)" },
				]}
			/>
		</TableOperations>
	);
}

export default BookingTableOperations;
