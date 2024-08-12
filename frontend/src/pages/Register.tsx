import {
	Form,
	Link,
	useActionData,
	useNavigation,
	useNavigate,
} from "react-router-dom";
import { Button } from "@mui/material";

import { Alert, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

// export const action: ActionFunction = async ({
// 	request,
// }): Promise<Response> => {
// 	const formRawData = await request.formData();
// 	const formData = Object.fromEntries(formRawData);

// 	try {
// 		const res: AxiosResponse<{ name: string; id: string; email: string }> =
// 			await axios.post("/api/v1/auth/register", formData);
// 		return json({
// 			msg: `Registration success, please visit your email: ${res.data.email} to confirm your email address!`,
// 			status: 200,
// 		});
// 	} catch (err) {
// 		console.log(err);
// 		const error = err as AxiosError<{
// 			msg: string;
// 		}>;
// 		const msg = error.response?.data.msg;
// 		return json({ msg, status: 500 });
// 	}
// };

function Register() {
	const data = useActionData() as { msg: string; status: number };
	const { state } = useNavigation();
	const navigate = useNavigate();
	const [hasInteracted, setHasInteracted] = useState<boolean>(false);
	const [showAlert, setShowAlert] = useState<boolean>(true);

	const handleFocus = () => {
		setHasInteracted(true);
		setShowAlert(false);
	};
	const handleBlur = () => {
		if (hasInteracted) setShowAlert(false);
	};

	useEffect(() => {
		if (data) {
			setShowAlert(true);
		}
	}, [data]);
	return (
		<div
			className="grid place-content-center h-screen text-white"
			style={{
				background:
					"url('https://www.themoviedb.org/t/p/w1280/gPbM0MK8CP8A174rmUwGsADNYKD.jpg')",
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
			}}>
			<Form
				method="POST"
				className=" border rounded-xl p-8 md:w-[30rem] w-[24rem] bg-slate-700/60 ">
				<p className="text-center mx-auto  md:text-3xl font-semibold">
					Registration
				</p>
				<div className="mt-8 flex justify-start items-center gap-x-2">
					<label htmlFor="name" className="md:text-xl  w-[10rem]">
						name
					</label>
					<input
						onFocus={handleFocus}
						onBlur={handleBlur}
						required
						placeholder="Name"
						id="name"
						type="text"
						name="name"
						className="bg-slate-600 rounded p-2 w-[24rem]"
					/>
				</div>
				<div className="mt-8 flex justify-start items-center gap-x-2">
					<label htmlFor="email" className="md:text-xl w-[10rem]">
						Email
					</label>
					<input
						onFocus={handleFocus}
						onBlur={handleBlur}
						required
						placeholder="Email Address"
						id="username"
						type="text"
						name="email"
						className="bg-slate-600 rounded p-2 w-[24rem]"
					/>
				</div>
				<div className="mt-8 flex justify-center items-center gap-x-2">
					<label htmlFor="password" className="md:text-xl w-[10rem]">
						Password
					</label>
					<input
						onFocus={handleFocus}
						onBlur={handleBlur}
						required
						placeholder="Password"
						id="password"
						type="password"
						name="password"
						className="bg-slate-600 rounded p-2 w-[24rem]"
					/>
				</div>
				<div className="mt-8 flex justify-center items-center gap-x-2">
					<label htmlFor="repeat_password" className="md:text-xl w-[10rem]">
						Confirm Password
					</label>
					<input
						onFocus={handleFocus}
						onBlur={handleBlur}
						required
						placeholder="Confirm Your Password"
						id="repeat_password"
						type="password"
						name="repeat_password"
						className="bg-slate-600 rounded p-2 w-[24rem]"
					/>
				</div>
				{showAlert && data && data.status === 500 && (
					<Alert severity="error" className="mt-4">
						{data.msg}
					</Alert>
				)}
				{showAlert && data && data.status === 200 && (
					<Alert severity="success" className="mt-4">
						{data.msg}
					</Alert>
				)}

				{state === "idle" && (
					<>
						<div className="mt-4 flex justify-center items-center gap-x-4">
							<Button color="primary" type="submit" variant="contained">
								Register
							</Button>
							<Button
								color="secondary"
								onClick={() => {
									navigate("/register");
								}}>
								Reset
							</Button>
						</div>
						<div className="flex  items-center justify-center gap-x-4">
							<p>Alreat a member? </p>
							<Button type="button" variant="contained">
								<Link to="/login">Login</Link>
							</Button>
						</div>
						<div className="flex justify-center mt-4">
							<Button type="button" color="info" variant="contained">
								<Link to="/">Back Home</Link>
							</Button>
						</div>
					</>
				)}
				{state === "submitting" && (
					<div className="mt-4 flex justify-center items-center gap-x-4">
						<CircularProgress disableShrink />
					</div>
				)}
			</Form>
		</div>
	);
}
export default Register;
