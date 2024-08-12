import Logo from "@/assets/TMDB_logo.svg";
import { Outlet, useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import NavInline from "@/components/HomeLayout/NavInline";
import NavList from "@/components/HomeLayout/NavList";
import ThemeToggle from "@/components/HomeLayout/ThemeToggle";
import Footer from "@/components/HomeLayout/Footer";
import UserMenu from "@/components/HomeLayout/UserMenu";
import { Button } from "@mui/material";
import { store } from "@/store";
import { logout } from "@/feature/User/userSlice";
import { customFetch } from "@/api/customFetch";

import { ScrollRestoration } from "react-router-dom";
import { useEffect, useCallback } from "react";

function Layout() {
	const username = store.getState().user.username;

	const { pathname } = useLocation(); // use location to get the current location url info and destruct the pathname
	const navigate = useNavigate(); // programmaly nav to the path, so to update the ui
	sessionStorage.setItem("redirectTo", pathname);

	const handlelogout = useCallback(async () => {
		store.dispatch(logout());
		try {
			await customFetch.post("/auth/logout");
		} catch (err) {
			console.log(err);
		}
		navigate("/");
	}, [navigate]);

	useEffect(() => {
		/* this is for automatically logout purpose, although user could change localStorage, 
		but the refreshJWT at cookie will expired, and user still cannot fetch protected data */

		let expiredTime = 2000;
		const userState = store.getState().user;
		if (userState.exp) {
			expiredTime = new Date(userState.exp).getTime() - Date.now();
		}

		const MAX_TIMEOUT = 2 ** 31 - 1; // MaxValue for timeout
		/* since js only allowed 2**31-1 ms time for the setTimeout, use the logic below to help fix this limit */
		/* runTimeout is a recursion, which will take reaminTime (in ms) as arg, if the arg greater than MAX_TIMEOUT,
		 the setTimeout will use the MAX_TIMEOUT as time, and at the end of the time call itself(runTimeout) again,
		 and pass the time diff between remainingTime and timeout
		 and only when the arg less than MAX_TIMEOUT, the setTimeout will use that arg as time, 
		 and in the else block we need to return that setTimeout so useEffect clean up function clearTimeout can point to,
		 finally when the remainingTime less or equal to 0, meaning it reach the timeExpired from store.user.exp, we use IIFE 
		 to call the handlelogout, since it is an async function
		 */
		const runTimeout = (remainingTime: number): NodeJS.Timeout | void => {
			if (remainingTime <= 0) {
				(async () => {
					await handlelogout();
				})();
			} else {
				const timeout = Math.min(remainingTime, MAX_TIMEOUT);
				return setTimeout(() => {
					runTimeout(remainingTime - timeout);
				}, timeout);
			}
		};

		const timer = runTimeout(expiredTime);

		return () => {
			if (timer) clearTimeout(timer);
		};
	}, [handlelogout]);

	return (
		<>
			<header
				className={`bg-gradient-to-r from-sky-950 to-slate-900 sm:px-8 px-1 text-white ${
					pathname === "/" && " min-w-[630px]"
				}  
				
				`}>
				<div
					className={`mx-auto flex justify-between items-center max-w-[1400px] py-4 ${
						pathname === "/" && " min-w-[570px]"
					}
					 
					`}>
					<nav className="py-2 h-[36px] flex gap-x-8 justify-center items-center font-semibold capitalize">
						<Link to="/" className="block">
							<img
								src={Logo}
								alt="logo"
								className={`${
									pathname.includes("movie") ||
									pathname.includes("tv_show") ||
									pathname.includes("people") ||
									pathname.includes("search")
										? " w-[4rem]"
										: " w-[10rem]"
								}`}
							/>
						</Link>
						<NavInline />
						<div className="md:hidden relative -start-8 ">
							<NavList />
						</div>
					</nav>

					<div className="flex gap-x-1 items-center">
						<ThemeToggle />
						{username ? (
							<div>
								Welcome
								<UserMenu handlelogout={handlelogout}>{username}</UserMenu>
							</div>
						) : (
							<>
								<Button>
									<Link to="/login">Login</Link>
								</Button>
								<Button>
									<Link to="/register"> Register</Link>
								</Button>
							</>
						)}
					</div>
				</div>
			</header>

			<main className="max-w-[1400px] mx-auto ">
				<Outlet />
				<ScrollRestoration
					getKey={location => {
						return location.pathname;
					}}
				/>
			</main>
			<Footer />
		</>
	);
}
export default Layout;

/* 

${
	(pathname.includes("movie") ||
		pathname.includes("tv_show") ||
		pathname.includes("people") ||
		pathname.includes("search")) &&
	" min-w-[450px]"
}

 */

/* 
${
	(pathname.includes("movie") ||
		pathname.includes("tv_show") ||
		pathname.includes("people") ||
		pathname.includes("search")) &&
	" min-w-[400px]"
}  */
