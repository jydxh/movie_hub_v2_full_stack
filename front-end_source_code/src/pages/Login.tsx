import { Button } from "@mui/material";
import { ActionFunction, Form, redirect } from "react-router-dom";
import { store } from "@/store";
import { login } from "@/feature/User/userSlice";
import { Link } from "react-router-dom";

export const action: ActionFunction = async ({
	request,
}): Promise<Response> => {
	const rawData = await request.formData();
	const formData = Object.fromEntries(rawData) as {
		username: string;
		password: string;
	};
	console.log(formData);
	alert(
		"sending data to back end for authentication and return the JWT, the Backend Comming soon"
	);
	store.dispatch(login(formData));
	return redirect("/");
};

function Login() {
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
				<p className="text-center mx-auto text-3xl font-semibold">Login</p>
				<div className="mt-8 flex justify-center items-center gap-x-4">
					<label htmlFor="username" className="text-xl">
						Username
					</label>
					<input
						placeholder="username / email address"
						id="username"
						type="text"
						name="username"
						className="bg-slate-600 rounded p-2"
					/>
				</div>
				<div className="mt-8 flex justify-center items-center gap-x-4">
					<label htmlFor="password" className="text-xl">
						Password
					</label>
					<input
						placeholder="password"
						id="password"
						type="password"
						name="password"
						className="bg-slate-600 rounded p-2"
					/>
				</div>
				<div className="mt-8 flex justify-center items-center gap-x-4">
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
			</Form>
		</div>
	);
}
export default Login;
