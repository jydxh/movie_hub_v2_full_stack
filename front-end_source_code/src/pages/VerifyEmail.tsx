import CircularProgress from "@mui/material/CircularProgress";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";

function VerifyEmail() {
	const navigate = useNavigate();
	const verifyEmail = async () => {
		const url = new URL(window.location.href);
		const searchParams = new URLSearchParams(url.search);
		const searchParamsObj = Object.fromEntries(searchParams);
		const res = await axios.post("/api/v1/auth/verify-email", searchParamsObj);
		return res.data;
	};

	const { isLoading, data, isError } = useQuery({
		queryKey: ["verifyEmail"],
		queryFn: verifyEmail,
		staleTime: 0,
	});

	useEffect(() => {
		if (data) {
			const timer = setTimeout(() => {
				navigate("/login");
			}, 2000);
			return () => clearTimeout(timer);
		}
	}, [data, navigate]);

	if (isLoading) {
		return (
			<main className="bg-slate-500 h-[100vh] grid place-content-center">
				<div className="flex gap-x-8">
					<CircularProgress />
					<div className="text-3xl">Verifying Email ...</div>
				</div>
			</main>
		);
	}

	if (isError) {
		return (
			<main className="bg-slate-500 h-[100vh] grid place-content-center">
				<div className="flex gap-x-8">
					<div className="text-3xl text-red-500">
						Failed to verify email, please try again!
					</div>
				</div>
			</main>
		);
	}
	if (data) {
		return (
			<main className="bg-slate-500 h-[100vh] grid place-content-center">
				<p className="text-3xl text-green-500">Success to verify email</p>
				<p className="text-3xl text-green-500">
					This page will be redirected to login page soon
				</p>
			</main>
		);
	}
}
export default VerifyEmail;
