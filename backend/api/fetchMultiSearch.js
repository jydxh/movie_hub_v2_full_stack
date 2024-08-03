const customFetch = require("./customFetch");

async function fetchMultiSearch({ query, page, mode }) {
	const res = await customFetch.get(
		`/search/${mode}?query=${query}&include_adult=false&language=en-US&page=${page}`
	);

	return res.data;
}

module.exports = fetchMultiSearch;
