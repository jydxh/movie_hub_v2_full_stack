import { ActionFunction, json, redirect } from "react-router-dom";
import { store } from "@/store";
import { login } from "@/feature/User/userSlice";
import axios, { AxiosError, AxiosResponse } from "axios";
export const LoginAction: ActionFunction = async ({
	request,
}): Promise<Response> => {
	const rawData = await request.formData();
	const formData = Object.fromEntries(rawData) as {
		username: string;
		password: string;
	};
	const redirectTo = sessionStorage.getItem("redirectTo") || "/";
	sessionStorage.removeItem("redirectTo");

	try {
		const res: AxiosResponse<{ username: string; id: string; exp: string }> =
			await axios.post("/api/v1/auth/login", formData);
		const { username, exp } = res.data;
		store.dispatch(login({ username, exp }));
		return redirect(redirectTo);
	} catch (err) {
		const error = err as AxiosError<{ msg: string }>;
		console.log(error);
		return json({
			msg: error.response?.data.msg || "something wrong, please try again",
			status: 400,
		});
	}
};
