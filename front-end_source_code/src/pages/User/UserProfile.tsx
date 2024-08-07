import { Divider, Input, Button, Alert } from "@mui/material";
import { store } from "@/store";
import { Form } from "react-router-dom";
import { useState } from "react";
import UserAvatar from "@/components/User/UserAvatar";
const formInput = ["name", "email", "city", "country"];

function UserProfile() {
	const username = store.getState().user.username;
	const [showAlert, setShowAlert] = useState(false);
	const [msg, setMsg] = useState("");
	return (
		<section className="bg-gradient-to-r from-indigo-700 from-10% via-sky-700 via-30% to-emerald-700 to-90%">
			<div
				className="flex flex-col justify-center items-center text-center
       py-8">
				<UserAvatar name={username} />
			</div>
			<Divider variant="middle" className="bg-slate-500 mb-4" />

			<h3 className="mx-auto text-center text-3xl mb-8">Profile</h3>
			<Form className="pb-4" autoComplete="off">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
					{formInput.map(name => {
						return (
							<div
								key={name}
								className="flex justify-center gap-4 items-center">
								<label htmlFor={name} className="capitalize">
									{name}:
								</label>
								<Input
									onClick={() => {
										if (name === "email") {
											setMsg("Email cannot be changed!");
											setShowAlert(true);
										} else {
											setShowAlert(false);
										}
									}}
									type="text"
									autoComplete="off"
									readOnly={name === "email"}
									name={name === "email" ? undefined : name}
									id={name === "email" ? undefined : name}
								/>
							</div>
						);
					})}
				</div>
				<div className="mt-8 w-[40%] min-w-[16rem] mx-auto text-center">
					{showAlert && (
						<Alert severity="error" className="bg-sky-600 ">
							{msg}
						</Alert>
					)}
				</div>
				<div className="flex justify-center gap-4 items-center mt-8">
					<Button variant="contained" type="submit">
						Update
					</Button>
					<Button color="warning" type="reset">
						Reset
					</Button>
				</div>
			</Form>
		</section>
	);
}
export default UserProfile;
