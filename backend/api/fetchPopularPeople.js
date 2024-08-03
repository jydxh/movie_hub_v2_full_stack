const customFetch = require("./customFetch");

async function fetchPopularPeople(searchParam) {
	const res = await customFetch(`/person/popular?${searchParam}`);
	return res.data;
}

module.exports = fetchPopularPeople;
