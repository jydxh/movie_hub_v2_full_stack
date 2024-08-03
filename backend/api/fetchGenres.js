const customFetch = require("./customFetch");

const fetchGenres = async mode => {
	const res = await customFetch(`/genre/${mode}/list?language=en`);
	//console.log(res.data.genres);
	return res.data.genres;
};

module.exports = fetchGenres;
