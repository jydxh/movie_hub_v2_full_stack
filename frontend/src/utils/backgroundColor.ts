function backgroundColor(id?: string) {
	let bgColor;
	if (!id) {
		return (bgColor = "bg-gray-950");
	}
	const idReminder = Number(id) % 10;
	bgColor =
		idReminder === 0
			? "bg-blue-950"
			: idReminder === 1
			? "bg-gray-950"
			: idReminder === 2
			? "bg-orange-950"
			: idReminder === 3
			? "bg-slate-950"
			: idReminder === 4
			? "bg-amber-950"
			: idReminder === 5
			? "bg-yellow-950"
			: idReminder === 6
			? "bg-emerald-950"
			: idReminder === 7
			? "bg-teal-950"
			: idReminder === 8
			? "bg-cyan-950"
			: "bg-sky-950";
	return bgColor;
}
export default backgroundColor;
