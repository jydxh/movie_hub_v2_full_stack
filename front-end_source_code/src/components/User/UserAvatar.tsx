import {
	Avatar,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Form, useActionData, useNavigation } from "react-router-dom";

function UserAvatar({
	name,
	avatar,
}: {
	name: string | null;
	avatar: string | undefined;
}) {
	const [open, setOpen] = useState(false);
	const { state } = useNavigation();
	const actionData = useActionData() as { status: number; src: string };

	useEffect(() => {
		if (actionData && actionData.status === 200) {
			handleClose();
		}
	}, [actionData]);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	return (
		<>
			<Button onClick={handleClickOpen}>
				<Avatar
					src={(actionData && actionData.src) || avatar}
					className="uppercase h-[4.8rem] w-[4.8rem]">
					{name?.substring(0, 1) || "Unknow"}
				</Avatar>
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description">
				<DialogTitle id="alert-dialog-title">
					{"Upload your avatar"}
				</DialogTitle>
				<DialogContent>
					<Form method="POST" encType="multipart/form-data">
						<div className="flex justify-center gap-4 mbb-4">
							<input type="hidden" name="actionType" value="uploadAvatar" />
							<label htmlFor="avatar"></label>
							<input required type="file" name="user_avatar" />
						</div>
						<DialogActions className="mt-12">
							<Button type="submit" size="small" variant="contained">
								{state === "idle" && "upload"}

								{state === "submitting" && (
									<CircularProgress size="1.4rem" color="inherit" />
								)}
							</Button>
							<Button onClick={handleClose} size="small" variant="outlined">
								Cancel
							</Button>
						</DialogActions>
					</Form>
				</DialogContent>
			</Dialog>

			<p className="mt-4 uppercase">{name}</p>
		</>
	);
}
export default UserAvatar;
