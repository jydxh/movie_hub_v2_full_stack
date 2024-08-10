import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	CircularProgress,
} from "@mui/material";
import { AxiosError } from "axios";
import { customFetch } from "@/api/customFetch";
import { store } from "@/store";
import { logout } from "@/feature/User/userSlice";

function DeleteAccount({ className }: { className: string }) {
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();
	const [deleteing, setDeleting] = useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleDelete = async () => {
		handleClose();
		setDeleting(true);
		try {
			const res = await customFetch.delete<{ msg: string }>("/user");
			console.log(res.data);
			await new Promise(resolve => setTimeout(resolve, 3000)); // make 3 seconds delay to show deleling UI
			store.dispatch(logout());
			navigate("/login");
		} catch (err) {
			const error = err as AxiosError<{ msg: string }>;
			console.log(error.response?.data);
			store.dispatch(logout());
		}
		setDeleting(false);
	};
	return (
		<>
			<Button
				variant="outlined"
				className={className}
				onClick={handleClickOpen}>
				{deleteing ? (
					<span className="flex justify-center items-center gap-x-4">
						<CircularProgress color="warning" size={20} />
						<p>Deleting...</p>
					</span>
				) : (
					"Delete Account"
				)}
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description">
				<DialogTitle id="alert-dialog-title">
					{"DELETE your current account?"}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Are you sure you want to delete your current account? This will lead
						you lose all the data, and cannot be recovered again!
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} autoFocus>
						NO
					</Button>
					<Button onClick={handleDelete}>DELETE</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
export default DeleteAccount;
