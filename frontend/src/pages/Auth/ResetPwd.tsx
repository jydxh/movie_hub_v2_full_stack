import { Button, Input, Alert, LinearProgress } from "@mui/material";
import { Form, useSubmit, useActionData, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

function ResetPwd() {
	const submit = useSubmit();
	const navigate = useNavigate();
	const actionData = useActionData() as { status: number; msg: string };
	const [pwd, setPwd] = useState("");
	const [rePwd, setRePwd] = useState("");
	const [msg, setMsg] = useState("");
	const [showActionData, setShowActionData] = useState(false);

	const formRef = useRef<HTMLFormElement>(null);

	const handleRest = () => {
		setPwd("");
		setRePwd("");
		setMsg("");
		setShowActionData(false);
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
				setShowActionData(false);
			}
		};

		// Attach the event listener to the document
		document.addEventListener("click", handleClickOutside);

		// Cleanup function to remove the event listener when the component unmounts
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	useEffect(() => {
		if (actionData && actionData.msg) {
			setShowActionData(true);
		}
		if (actionData && actionData.status === 200) {
			setPwd("");
			setRePwd("");
			const timer = setTimeout(() => {
				setShowActionData(false);
				navigate("/login");
			}, 2000);
			return () => {
				clearTimeout(timer);
			};
		}
	}, [actionData, navigate]);

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
							setShowActionData(false);
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
							setShowActionData(false);
							setRePwd(evt.target.value);
						}}
					/>
				</div>

				{msg && (
					<Alert severity="error" key={msg}>
						{msg}
					</Alert>
				)}

				{showActionData && actionData && (
					<Alert severity={actionData.status === 200 ? "success" : "error"}>
						{actionData.msg}
						{actionData.status === 200 && <LinearProgress color="success" />}
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
