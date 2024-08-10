import { Button, Input, Alert } from "@mui/material";
import { ActionFunction, Form, useSubmit, json } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import { customFetch } from "@/api/customFetch";
import { AxiosError } from "axios";

export const action: ActionFunction = async ({
	request,
}): Promise<Response> => {
	const formDataRaw = await request.formData();
	const formData = Object.fromEntries(formDataRaw);

	const urlSearchParams = Object.fromEntries(new URL(request.url).searchParams);
	const data = { ...formData, ...urlSearchParams };

	try {
		const res = await customFetch.post<{ msg: string }>(
			"/auth/verify-resetPwd",
			data
		);
		console.log(res.data);
		return json({ status: 200, msg: res.data.msg });
	} catch (err) {
		const error = err as AxiosError<{ msg: string }>;
		console.log(error);
		return json({ status: 400, msg: error.response?.data.msg });
	}
};

function ResetPwd() {
	const submit = useSubmit();
	const [pwd, setPwd] = useState("");
	const [rePwd, setRePwd] = useState("");
	const [msg, setMsg] = useState("");

	const formRef = useRef<HTMLFormElement>(null);

	const handleRest = () => {
		setPwd("");
		setRePwd("");
		setMsg("");
	};
	const regExp = new RegExp("^[a-zA-Z0-9]{6,20}$");
	const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		if (pwd !== rePwd) {
			setMsg("Passwords are not same! please try again");
			setPwd("");
			setRePwd("");
		} else if (!regExp.test(pwd)) {
			setMsg("Invalid password, please try another password");
		} else {
			submit(evt.currentTarget);
		}
	};

	// Use useEffect to add an event listener for clicks outside the form
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			// Check if the click was outside the form
			if (formRef.current && !formRef.current.contains(event.target as Node)) {
				setMsg(""); // Clear the message
			}
		};

		// Attach the event listener to the document
		document.addEventListener("click", handleClickOutside);

		// Cleanup function to remove the event listener when the component unmounts
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	return (
		<div className="grid place-content-center h-[100vh] bg-slate-400">
			<Form
				ref={formRef}
				onSubmit={handleSubmit}
				method="POST"
				className="bg-gradient-to-r from-slate-300 to-slate-400 shadow border rounded p-8 flex justify-center flex-col items-center gap-4 ">
				<div>Reset Password</div>
				<div className="grid grid-cols-2 gap-x-4 ">
					<label htmlFor="password" className="text-center">
						Password
					</label>
					<Input
						type="password"
						id="password"
						name="password"
						required
						value={pwd}
						onChange={evt => {
							setMsg("");
							setPwd(evt.target.value);
						}}
					/>
				</div>
				<div className="grid grid-cols-2 gap-x-4 ">
					<label htmlFor="re_password" className="text-center">
						Repeat Password
					</label>
					<Input
						type="password"
						id="re_password"
						name="re_password"
						required
						value={rePwd}
						onChange={evt => {
							setMsg("");
							setRePwd(evt.target.value);
						}}
					/>
				</div>

				{msg && (
					<Alert severity="error" key={msg}>
						{msg}
					</Alert>
				)}

				<div className="mt-4 flex justify-center gap-x-8">
					<Button className="capitalize" variant="contained" type="submit">
						submit
					</Button>
					<Button
						className="capitalize"
						variant="outlined"
						onClick={handleRest}>
						Reset
					</Button>
				</div>
			</Form>
		</div>
	);
}

export default ResetPwd;
