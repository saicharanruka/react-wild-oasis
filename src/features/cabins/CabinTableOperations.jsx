import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

const filterOptions = [
	{ name: "All", params: "all" },
	{ name: "No discount", params: "no-discount" },
	{ name: "With Discount", params: "with-discount" },
];

const sortOptions = [
	{ name: "name (A-Z)", params: "name-asc" },
	{ name: "name (Z-A)", params: "name-dsc" },

	{ name: "price (low first)", params: "regularPrice-asc" },
	{ name: "price (high first)", params: "regularPrice-dsc" },

	{ name: "capacity (low first)", params: "maxCapacity-asc" },
	{ name: "capacity (high first)", params: "maxCapacity-dsc" },
];

function CabinTableOperations() {
	return (
		<TableOperations>
			<Filter filteredField="discount" options={filterOptions} />
			<SortBy options={sortOptions} />
		</TableOperations>
	);
}

export default CabinTableOperations;
