import axios from "axios";
//import "dotenv/config";

//const baseURL = "https://api.themoviedb.org/3";
const baseURL = "/api/v1";
export const customFetch = axios.create({
	baseURL,
	headers: {
		accept: "application/json",
	},
});
