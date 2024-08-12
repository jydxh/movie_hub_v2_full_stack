function getDateOneMonthAgo() {
	const now = new Date();
	const lastMonth = new Date(
		now.getFullYear(),
		now.getMonth() - 1,
		now.getDate()
	);

	const year = lastMonth.getFullYear();
	const month = String(lastMonth.getMonth() + 1).padStart(2, "0");
	const day = String(lastMonth.getDate()).padStart(2, "0");

	return `${year}-${month}-${day}`;
}
export default getDateOneMonthAgo;
