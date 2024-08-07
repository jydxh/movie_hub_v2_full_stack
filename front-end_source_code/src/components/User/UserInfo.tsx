import { Form, useActionData, useSubmit } from "react-router-dom";
import { Input, Button, Alert, LinearProgress } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useEffect, useState } from "react";
import { UserInfoType } from "@/utils/types";

function UserInfo({
	formInput,
	data,
}: {
	formInput: string[];
	data: UserInfoType;
}) {
	const actionData = useActionData() as { msg: string; status: number };
	const [showAlert, setShowAlert] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);
	const [msg, setMsg] = useState("");
	const [formValue, setFormValue] = useState<UserInfoType>(data);
	const submit = useSubmit();
	const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		// check for update the input
		const hasChanged = Object.keys(data).some(
			key =>
				data[key as keyof UserInfoType] !== formValue[key as keyof UserInfoType]
		);
		if (!hasChanged) {
			setMsg("No changed detected, cannot updated!");
			setShowAlert(true);
			return;
		}
		submit(evt.currentTarget);
	};
	useEffect(() => {
		const timer = setTimeout(() => {
			setShowSuccess(false);
		}, 2000);
		return () => {
			clearTimeout(timer);
		};
	}, [showSuccess]);
	useEffect(() => {
		if (actionData && actionData.status === 400) {
			setMsg(actionData.msg || "");
			setShowAlert(true);
		}
		if (actionData && actionData.status === 200) {
			setMsg(actionData.msg || "");
			setShowSuccess(true);
		}
	}, [actionData]);
	return (
		<>
			<h3 className="mx-auto text-center text-3xl mb-8">Profile</h3>
			<Form
				method="POST"
				className="pb-4"
				autoComplete="off"
				onSubmit={handleSubmit}>
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
									required
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
					{showSuccess && (
						<Alert
							className="flex justify-center items-center"
							icon={<CheckIcon fontSize="inherit" />}
							severity="success">
							{msg}
							<LinearProgress color="success" />
						</Alert>
					)}
				</div>
				<div className="flex justify-center gap-4 items-center mt-8">
					<Button variant="contained" type="submit">
						Update
					</Button>
					<Button
						color="warning"
						onClick={() => {
							setFormValue(data);
							setShowAlert(false);
						}}>
						Reset
					</Button>
				</div>
			</Form>
		</>
	);
}
export default UserInfo;
