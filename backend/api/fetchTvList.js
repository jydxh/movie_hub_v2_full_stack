const customFetch = require("./customFetch");

const fetchTvList = async searchParams => {
	const res = await customFetch("/discover/tv?" + searchParams);
	return res.data;
};

module.exports = fetchTvList;
