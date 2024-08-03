const customFetch = require("./customFetch");

async function fetchHomePopular(params) {
	try {
		const res = await customFetch(
			`/movie/popular?language=en-US&page=${params}`
		);
		return res.data.results;
	} catch (error) {
		console.log(error);
		throw Error({ msg: "failed to fetch home popular", error });
	}
}
module.exports = fetchHomePopular;
