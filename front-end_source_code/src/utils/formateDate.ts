export default function formateDate(
	inputdate: string | undefined
): string | undefined {
	if (!inputdate) return;
	const date = new Date(inputdate as string);

	return date.toLocaleDateString("en-CA", {
		year: "numeric",
		month: "short",
		day: "2-digit",
	});
}
