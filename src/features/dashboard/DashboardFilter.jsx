import Filter from "../../ui/Filter";

function DashboardFilter() {
	return (
		<Filter
			filteredField="last"
			options={[
				{ params: "7", name: "Last 7 days" },
				{ params: "30", name: "Last 30 days" },
				{ params: "90", name: "Last 90 days" },
			]}
		/>
	);
}

export default DashboardFilter;
