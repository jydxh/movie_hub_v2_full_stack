function formatDollars(number: number | string) {
	if (typeof number === "number") {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(number);
	} else {
		return "unknow";
	}
}
export default formatDollars;
