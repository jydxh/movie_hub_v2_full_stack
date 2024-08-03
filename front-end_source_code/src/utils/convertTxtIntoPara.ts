function convertTxtIntoPara(text: string) {
	const paragraphs = text
		.split("\n")
		.map(para => para.trim())
		.filter(para => para.length > 0);

	// Wrap each paragraph in <p> tags
	const wrappedParagraphs = paragraphs.map(
		para => `<p class='my-4'>${para}</p>`
	);

	// Join all the wrapped paragraphs into a single string
	return wrappedParagraphs.join("").substring(0, 665) + " ...";
}
export default convertTxtIntoPara;
