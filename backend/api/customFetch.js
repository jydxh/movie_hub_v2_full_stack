const axios = require("axios");
require("dotenv").config();

const baseURL = "https://api.themoviedb.org/3";
//const baseURL = "/api/v1";
const customFetch = axios.create({
	baseURL,
	headers: {
		accept: "application/json",
		"Content-Type": "application/json",
		Authorization: `Bearer ${process.env.VITE_TMDB_TOKEN}`,
	},
});

module.exports = customFetch;
