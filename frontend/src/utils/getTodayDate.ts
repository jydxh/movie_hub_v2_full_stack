function getTodayDate() {
	const now = new Date();

	const year = now.getFullYear();
	const month = String(now.getMonth() + 1).padStart(2, "0"); // getMonth() is zero-based
	const day = String(now.getDate()).padStart(2, "0");

	return `${year}-${month}-${day}`;
}
export default getTodayDate;
