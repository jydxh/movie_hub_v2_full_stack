import Logo from "@/assets/TMDB_logo.svg";
import { Outlet, useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import NavInline from "@/components/HomeLayout/NavInline";
import NavList from "@/components/HomeLayout/NavList";
import ThemeToggle from "@/components/HomeLayout/ThemeToggle";
import Footer from "@/components/HomeLayout/Footer";
import { Button } from "@mui/material";
import { store } from "@/store";
import { logout } from "@/feature/User/userSlice";

import { ScrollRestoration } from "react-router-dom";

function Layout() {
	const username = store.getState().user.username;

	const { pathname } = useLocation(); // use location to get the current location url info and destruct the pathname
	const navigate = useNavigate(); // programmaly nav to the path, so to update the ui

	const handlelogout = () => {
		store.dispatch(logout());
		navigate("/");
	};
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
							<>
								<p>Welcome {username}</p>
								<Button className="capitalize" onClick={handlelogout}>
									Logout
								</Button>
							</>
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
