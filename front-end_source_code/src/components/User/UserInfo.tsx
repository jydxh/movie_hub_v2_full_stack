import { Form } from "react-router-dom";
import { Input, Button, Alert } from "@mui/material";
import { useState } from "react";
import { UserInfoType } from "@/utils/types";

function UserInfo({
	formInput,
	data,
}: {
	formInput: string[];
	data: UserInfoType;
}) {
	const [showAlert, setShowAlert] = useState(false);
	const [msg, setMsg] = useState("");
	const [formValue, setFormValue] = useState<UserInfoType>(data);
	return (
		<>
			<h3 className="mx-auto text-center text-3xl mb-8">Profile</h3>
			<Form method="POST" className="pb-4" autoComplete="off">
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
									value={formValue[name as keyof UserInfoType]}
									onChange={evt => {
										setFormValue({ ...formValue, [name]: evt.target.value });
									}}
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
		</>
	);
}
export default UserInfo;
