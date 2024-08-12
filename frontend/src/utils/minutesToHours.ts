function minutesToHours(time: number) {
	const hour = Math.floor(time / 60);
	const min = time % 60;
	return `${hour}h${min}m`;
}
export default minutesToHours;
