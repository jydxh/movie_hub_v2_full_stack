import { Button, Input } from "@mui/material";
import { useState } from "react";
import { Form } from "react-router-dom";

const formInput = [
	{ name: "oldPassword", label: "Old Password" },
	{ name: "newPassword", label: "New Password" },
	{ name: "repeat_password", label: "Repeat Password" },
];

function UserAccount() {
	const [showForm, setShowForm] = useState(false);
	const [showPwd, setShowPwd] = useState(false);

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
			{showForm && (
				<div className="grid place-content-center">
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
							<Button type="reset" className="text-orange-500 capitalize ">
								Reset
							</Button>
						</div>
					</Form>
					<Button
						className="text-black capitalize"
						onClick={() => {
							setShowPwd(prev => !prev);
						}}>
						{showPwd ? "hide password" : "show password"}
					</Button>
				</div>
			)}
		</>
	);
}
export default UserAccount;
