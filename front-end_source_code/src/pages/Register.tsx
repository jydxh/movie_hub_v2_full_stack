import { ActionFunction, Form, Link, redirect } from "react-router-dom";
import { Button } from "@mui/material";
import axios from "axios";

export const action: ActionFunction = async ({
	request,
}): Promise<Response> => {
	const formRawData = await request.formData();
	const formData = Object.fromEntries(formRawData);
	console.log(formData);
	const data = await axios.post("/api/v1/auth/register", formData);
	console.log(data);
	return redirect("/login");
};

function Register() {
	return (
		<div
			className="grid place-content-center h-screen"
			style={{
				background:
					"url('https://www.themoviedb.org/t/p/w1280/gPbM0MK8CP8A174rmUwGsADNYKD.jpg')",
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
			}}>
			<Form
				method="POST"
				className=" border rounded-xl p-8 md:w-[30rem] w-[24rem] bg-slate-700 ">
				<p className="text-center mx-auto text-3xl font-semibold">
					Registration
				</p>
				<div className="mt-8 flex justify-start items-center gap-x-2">
					<label htmlFor="name" className="text-xl w-[10rem]">
						name
					</label>
					<input
						required
						placeholder="name"
						id="name"
						type="text"
						name="name"
						className="bg-slate-600 rounded p-2 w-[24rem]"
					/>
				</div>
				<div className="mt-8 flex justify-start items-center gap-x-2">
					<label htmlFor="email" className="text-xl w-[10rem]">
						Email
					</label>
					<input
						required
						placeholder="username / email address"
						id="username"
						type="text"
						name="email"
						className="bg-slate-600 rounded p-2 w-[24rem]"
					/>
				</div>
				<div className="mt-8 flex justify-center items-center gap-x-2">
					<label htmlFor="password" className="text-xl w-[10rem]">
						Password
					</label>
					<input
						required
						placeholder="password"
						id="password"
						type="password"
						name="password"
						className="bg-slate-600 rounded p-2 w-[24rem]"
					/>
				</div>
				<div className="mt-8 flex justify-center items-center gap-x-2">
					<label htmlFor="repeat_password" className="text-xl w-[10rem]">
						Confirm Password
					</label>
					<input
						required
						placeholder="Confirm Your Password"
						id="repeat_password"
						type="password"
						name="repeat_password"
						className="bg-slate-600 rounded p-2 w-[24rem]"
					/>
				</div>
				<div className="mt-8 flex justify-center items-center gap-x-4">
					<Button color="primary" type="submit">
						Register
					</Button>
					<Button color="secondary" type="reset">
						Reset
					</Button>
				</div>
				<div className="flex  items-center justify-center gap-x-4">
					<p>Alreat a member? </p>
					<Button type="button">
						<Link to="/login">Login</Link>
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
export default Register;
