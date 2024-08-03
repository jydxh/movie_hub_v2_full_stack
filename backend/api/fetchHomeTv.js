const customFetch = require("./customFetch");

async function fetchHomeTV(param) {
	const res = await customFetch(`/trending/tv/${param}?language=en-US`);
	return res.data.results;
}

module.exports = fetchHomeTV;
