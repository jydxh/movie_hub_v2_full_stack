const customFetch = require("./customFetch");

async function fetchPeopleMulti(id) {
	const res = await customFetch(
		`/person/${id}?append_to_response=combined_credits%2Cimages&language=en-US`
	);
	return res.data;
}

module.exports = fetchPeopleMulti;
