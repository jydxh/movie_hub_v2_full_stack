const customFetch = require("./customFetch");

const fetchTvMulti = async ({ id, mode }) => {
	const params =
		"?append_to_response=aggregate_credits%2Creviews%2Crecommendations%2Cimages&language=en-US";
	try {
		const res = await customFetch(
			`/tv/${id}${mode === "multi" ? params : "/images"}`
		);
		return res.data;
	} catch (err) {
		console.log(err);
	}
};

module.exports = fetchTvMulti;
