import footerLogo from "@/assets/TMDB_footer_logo.svg";
import { Link, useLocation } from "react-router-dom";

function Footer() {
	const { pathname } = useLocation();
	return (
		<footer
			className={`bg-gradient-to-r from-sky-950 to-slate-900 p-10 mx-auto text-white ${
				pathname === "/" && " min-w-[630px] px-0"
			} `}>
			<div className="flex justify-center md:justify-between items-center p-4 mx-auto max-w-[1280px] gap-x-10">
				<Link to="/">
					<img src={footerLogo} alt="footerLogo" className="w-[10rem]" />
				</Link>
				<p className="md:text-2xl font-light">Modifed By Haocheng</p>
				<a
					className="md:text-2xl font-light hover:bg-slate-300/5 px-4 py-2 rounded"
					target="_blank"
					href="https://github.com/jydxh">
					github: jydxh
				</a>
			</div>
		</footer>
	);
}
export default Footer;

/* 
${
	(pathname.includes("movie") ||
		pathname.includes("tv_show") ||
		pathname.includes("people") ||
		pathname.includes("search")) &&
	" min-w-[450px] px-0"
} 
 */
