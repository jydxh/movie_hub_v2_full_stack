import { Button, Alert, CircularProgress, Input } from "@mui/material";
import {
	Form,
	useActionData,
	useNavigation,
	useSubmit,
} from "react-router-dom";

import { Link } from "react-router-dom";
import { AxiosError } from "axios";

import { useEffect, useState } from "react";
import { customFetch } from "@/api/customFetch";

// export const action: ActionFunction = async ({
// 	request,
// }): Promise<Response> => {
// 	const rawData = await request.formData();
// 	const formData = Object.fromEntries(rawData) as {
// 		username: string;
// 		password: string;
// 	};
// 	const redirectTo = sessionStorage.getItem("redirectTo") || "/";
// 	sessionStorage.removeItem("redirectTo");

// 	try {
// 		const res: AxiosResponse<{ username: string; id: string; exp: string }> =
// 			await axios.post("/api/v1/auth/login", formData);
// 		const { username, exp } = res.data;
// 		store.dispatch(login({ username, exp }));
// 		return redirect(redirectTo);
// 	} catch (err) {
// 		const error = err as AxiosError<{ msg: string }>;
// 		console.log(error);
// 		return json({
// 			msg: error.response?.data.msg || "something wrong, please try again",
// 			status: 400,
// 		});
// 	}
// };

function Login() {
	const submit = useSubmit();
	const { state } = useNavigation();
	const [email, setEmail] = useState("");
	const [pwd, setPwd] = useState("");
	const [msg, setMsg] = useState<string | undefined>("");
	const [status, setStatus] = useState<number>();
	const data = useActionData() as { msg: string; status: number };
	const [showAlert, setShowAlert] = useState<boolean>(true);
	const [interacted, setInteracted] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState(false);
	const [couter, setCouter] = useState<number>(0);

	const handleResetPwd = async () => {
		if (!email) {
			setMsg("please enter email first!");
		} else {
			setIsLoading(true);
			try {
				const res = await customFetch.post<{ msg: string }>("/auth/reset-pwd", {
					email,
				});
				console.log(res.data);
				setMsg(res.data.msg);
				setStatus(200);
			} catch (err) {
				console.log(err);
				const error = err as AxiosError<{ msg: string }>;
				setMsg(error.response?.data.msg);
				setStatus(400);
			}
			setIsLoading(false);
			setCouter(60);
		}
	};
	const handleFocus = () => {
		setInteracted(true);
	};
	const handleBlur = () => {
		if (interacted) {
			setShowAlert(false);
			setMsg("");
		}
	};

	const handleDemoUser = () => {
		setEmail("demoUser@gmail.com");
		setPwd("qwer123");
		const formData = new FormData();
		formData.append("email", "demoUser@gmail.com");
		formData.append("password", "qwer123");
		submit(formData, { method: "POST", action: "/login" });
	};

	useEffect(() => {
		if (data) {
			setShowAlert(true);
		}
	}, [data]);

	useEffect(() => {
		if (couter > 0) {
			const timer = setTimeout(() => {
				setCouter(prev => prev - 1);
			}, 1000);
			return () => clearTimeout(timer);
		}
	}, [couter]);
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
				className=" text-white border rounded-xl p-8 md:w-[30rem] w-[24rem] bg-neutral-500/60 ">
				<p className="text-center mx-auto md:text-2xl text-lg font-semibold">
					Login
				</p>
				<div className="mt-8 flex justify-center items-center ">
					<label htmlFor="email" className="text-sm md:text-base w-[8rem] ">
						Email
					</label>
					<Input
						required
						onChange={evt => {
							setEmail(evt.target.value);
						}}
						value={email}
						onFocus={handleFocus}
						onBlur={handleBlur}
						placeholder="email address"
						id="email"
						type="email"
						name="email"
						className="p-1 text-sm md:text-base"
					/>
				</div>
				<div className="mt-8 flex justify-center items-center ">
					<label htmlFor="password" className="text-sm md:text-base w-[8rem]">
						Password
					</label>
					<Input
						required
						value={pwd}
						onChange={evt => {
							setPwd(evt.target.value);
						}}
						onFocus={handleFocus}
						onBlur={handleBlur}
						placeholder="password"
						id="password"
						type="password"
						name="password"
						className=" p-1 text-sm md:text-base"
					/>
				</div>

				{showAlert && data && data.status && (
					<Alert severity="error" className="mt-4">
						{data.msg}
					</Alert>
				)}

				{msg && (
					<Alert
						severity={status === 200 ? "success" : "error"}
						className="mt-4">
						{msg}
					</Alert>
				)}

				{state === "idle" && (
					<>
						<div className="mt-4 flex justify-center items-center gap-x-4">
							<Button
								className="capitalize"
								color="primary"
								variant="contained"
								type="submit"
								size="small">
								Login
							</Button>
							<Button
								className="capitalize"
								color="secondary"
								type="reset"
								size="small">
								Reset
							</Button>
							<Button
								className="capitalize"
								color="primary"
								variant="contained"
								type="submit"
								onClick={handleDemoUser}
								size="small">
								Demp User
							</Button>
						</div>
						<div className="flex justify-center">
							<Button
								disabled={email === "" || isLoading || couter > 0}
								onClick={handleResetPwd}
								className="text-white my-4 text-center capitalize disabled:bg-slate-500/60"
								color="info"
								size="small"
								variant="contained"
								type="button">
								{isLoading ? (
									<span className="flex items-center gap-x-4">
										<CircularProgress size={20} /> <p>Submitting...</p>
									</span>
								) : couter > 0 ? (
									couter + " seconds left"
								) : (
									"Forget Passsword"
								)}
							</Button>
						</div>

						<div className="flex  items-center justify-center gap-x-4">
							<p>Not a member yet? </p>
							<Button
								className=" text-center capitalize"
								type="button"
								size="small">
								<Link to="/register">Register</Link>
							</Button>
						</div>
						<div className="flex justify-center mt-4">
							<Button
								className="text-center capitalize"
								type="button"
								color="info"
								size="small">
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
