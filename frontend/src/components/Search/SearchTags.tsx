import { Link, NavLink, useLocation } from "react-router-dom";

const tags = ["movies", "tvShow", "people", "collections"];
const navLinkClass =
	"flex items-center justify-between p-2 hover:bg-gray-200 hover:text-black";
function SearchTags() {
	const { search } = useLocation();
	//console.log(search);
	const searchParams = new URLSearchParams(search);
	searchParams.delete("page");
	return (
		<div className="grid md:w-[16rem]  text-center border border-gray-300 rounded">
			<h3 className="bg-blue-400 rounded p-4">
				<Link to={`/search?${searchParams}`}>Search Results</Link>
			</h3>
			<div className="mt-2">
				{tags.map(tag => {
					return (
						<NavLink
							key={tag}
							to={`${tag}?${searchParams}`}
							className={({ isActive }) =>
								`${
									isActive ? "bg-gray-200 text-black font-semibold" : ""
								} ${navLinkClass}`
							}>
							<p className="mx-auto capitalize">
								{tag === "tvShow" ? "tv Shows" : tag}
							</p>
						</NavLink>
					);
				})}
			</div>
		</div>
	);
}
export default SearchTags;
