import { Alert, Button, Input, LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { Form, useActionData } from "react-router-dom";

const formInput = [
	{ name: "oldPassword", label: "Old Password" },
	{ name: "newPassword", label: "New Password" },
	{ name: "repeat_password", label: "Repeat Password" },
];

function UserAccount() {
	const [showForm, setShowForm] = useState(false);
	const [showPwd, setShowPwd] = useState(false);
	const [showAlert, setShowAlert] = useState(false);

	const actionData = useActionData() as { msg: string; status: number };

	useEffect(() => {
		if (actionData && actionData.msg) {
			setShowAlert(true);
		}
	}, [actionData]);

	useEffect(() => {
		if (actionData && actionData.status === 201) {
			const timer = setTimeout(() => {
				setShowAlert(false);
			}, 2000);
			return () => clearTimeout(timer);
		}
	}, [actionData]);

	return (
		<>
			<h3 className="mx-auto text-center text-3xl mb-8">
				Account Modification
			</h3>
			<div className="flex justify-center items-center gap-x-8">
				<Button
					variant="contained"
					className="capitalize"
					onClick={() => setShowForm(prev => !prev)}>
					Update Password
				</Button>
				<Button
					variant="contained"
					className="capitalize text-orange-500 bg-sky-600 hover:bg-red-800 hover:text-black">
					Delete Account
				</Button>
			</div>

			<div
				style={{
					overflow: "hidden",
					height: showForm ? "auto" : "0",
					transition:
						"height 0.3s ease, opacity 0.3s ease, transform 0.3s ease",
				}}
				className={`grid place-content-center transition-opacity pb-4 duration-300 ease-in-out ${
					showForm ? "opacity-100 scale-100" : "opacity-0 scale-95"
				}`}>
				<Form
					method="POST"
					className="mx-auto mt-8 border-sky-700/90 rounded bg-gradient-to-r from-sky-700/60 to-bg-sky-600/60 p-4 border">
					<input type="hidden" name="actionType" value="updatePassword" />
					{formInput.map(item => {
						const { label, name } = item;
						return (
							<div className="grid grid-cols-2 mb-4" key={name}>
								<label htmlFor={name} className="text-center">
									{label}:
								</label>
								<Input
									onChange={() => {
										setShowAlert(false);
									}}
									required
									id={name}
									name={name}
									type={showPwd ? "text" : "password"}
								/>
							</div>
						);
					})}
					<div className="flex justify-center gap-x-8 ">
						<Button type="submit" variant="contained" className="capitalize">
							Submit
						</Button>
						<Button
							type="reset"
							onClick={() => {
								setShowAlert(false);
							}}
							className="text-orange-500 capitalize ">
							Reset
						</Button>
					</div>
					<div className="w-full flex justify-center">
						<Button
							className="text-black capitalize mt-4 mx-auto"
							onClick={() => {
								setShowPwd(prev => !prev);
							}}>
							{showPwd ? "hide password" : "show password"}
						</Button>
					</div>
					{showAlert &&
						actionData &&
						(actionData.status === 401 || actionData.status === 201) && (
							<Alert
								className="mt-4 max-w-[24rem] flex justify-center"
								severity={
									actionData.status === 401
										? "error"
										: actionData.status === 201
										? "success"
										: undefined
								}>
								{actionData.msg}
								{actionData.status === 201 && (
									<LinearProgress color="success" />
								)}
							</Alert>
						)}
				</Form>
			</div>
		</>
	);
}
export default UserAccount;
