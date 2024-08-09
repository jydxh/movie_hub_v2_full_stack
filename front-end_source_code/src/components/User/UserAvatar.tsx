import {
	Avatar,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
} from "@mui/material";
import { useState } from "react";
import { Form } from "react-router-dom";
function UserAvatar({ name }: { name: string | null }) {
	const [open, setOpen] = useState(false);

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
					src="https://lumiere-a.akamaihd.net/v1/images/a_avatarpandorapedia_kiri_16x9_1098_04_39d940d1.jpeg?region=0%2C0%2C1920%2C1080"
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
							<input type="file" name="user_avatar" />
						</div>
						<DialogActions className="mt-12">
							<Button type="submit" size="small" variant="contained">
								upload
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
