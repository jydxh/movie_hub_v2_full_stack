import { Button } from "@mui/material";
import {
	ActionFunction,
	Form,
	json,
	redirect,
	useActionData,
	useNavigation,
} from "react-router-dom";
import { store } from "@/store";
import { login } from "@/feature/User/userSlice";
import { Link } from "react-router-dom";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Alert, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

export const action: ActionFunction = async ({
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
		const res: AxiosResponse<{ username: string; id: string }> =
			await axios.post("/api/v1/auth/login", formData);
		const { username, id } = res.data;
		store.dispatch(login({ username, id }));
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

function Login() {
	const { state } = useNavigation();
	const data = useActionData() as { msg: string; status: number };
	const [showAlert, setShowAlert] = useState<boolean>(true);
	const [interacted, setInteracted] = useState<boolean>(false);
	const handleFocus = () => {
		setInteracted(true);
	};
	const handleBlur = () => {
		if (interacted) setShowAlert(false);
	};
	useEffect(() => {
		if (data) {
			setShowAlert(true);
		}
	}, [data]);
	return (
		<div
			className="grid place-content-center h-screen"
			style={{
				background:
					"url('https://www.themoviedb.org/t/p/w1280/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg')",
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
			}}>
			<Form
				method="POST"
				className=" border rounded-xl p-8 md:w-[30rem] w-[24rem] bg-slate-700">
				<p className="text-center mx-auto md:text-2xl text-lg font-semibold">
					Login
				</p>
				<div className="mt-8 flex justify-center items-center ">
					<label htmlFor="email" className="text-sm md:text-base w-[8rem] ">
						Email
					</label>
					<input
						onFocus={handleFocus}
						onBlur={handleBlur}
						placeholder="email address"
						id="email"
						type="email"
						name="email"
						className="bg-slate-600  rounded p-2 text-sm md:text-base"
					/>
				</div>
				<div className="mt-8 flex justify-center items-center ">
					<label htmlFor="password" className="text-sm md:text-base w-[8rem]">
						Password
					</label>
					<input
						onFocus={handleFocus}
						onBlur={handleBlur}
						placeholder="password"
						id="password"
						type="password"
						name="password"
						className="bg-slate-600 rounded p-2 text-sm md:text-base"
					/>
				</div>

				{showAlert && data && data.status && (
					<Alert severity="error" className="mt-4">
						{data.msg}
					</Alert>
				)}

				{state === "idle" && (
					<>
						<div className="mt-4 flex justify-center items-center gap-x-4">
							<Button color="primary" type="submit">
								Login
							</Button>
							<Button color="secondary" type="reset">
								Reset
							</Button>
						</div>
						<div className="flex  items-center justify-center gap-x-4">
							<p>Not a member yet? </p>
							<Button type="button">
								<Link to="/register">Register</Link>
							</Button>
						</div>
						<div className="flex justify-center mt-4">
							<Button type="button" color="info">
								<Link to="/">Back Home</Link>
							</Button>
						</div>
					</>
				)}
				{state === "submitting" && (
					<div className="mt-8 flex justify-center items-center gap-x-4">
						<CircularProgress /> <p>Submitting...</p>
					</div>
				)}
			</Form>
		</div>
	);
}
export default Login;
