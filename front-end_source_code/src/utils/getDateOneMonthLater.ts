function getDateOneMonthLater() {
	const now = new Date();
	const nextMonth = new Date(
		now.getFullYear(),
		now.getMonth() + 1,
		now.getDate()
	);

	const year = nextMonth.getFullYear();
	const month = String(nextMonth.getMonth() + 1).padStart(2, "0"); // getMonth() is zero-based
	const day = String(nextMonth.getDate()).padStart(2, "0");

	return `${year}-${month}-${day}`;
}
export default getDateOneMonthLater;
