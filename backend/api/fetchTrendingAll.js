const customFetch = require("./customFetch");

const fetchTrendingAll = async param => {
	try {
		const res = await customFetch(`/trending/all/${param}?language=en-US`);
		//console.log(res.data.results);
		return res.data.results;
	} catch (error) {
		console.log(error);
		throw Error({ msg: "failed to fetch trendingAll", error });
	}
};

module.exports = fetchTrendingAll;
