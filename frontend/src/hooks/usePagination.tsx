import { useNavigate, useLocation } from "react-router";

function usePagination() {
	const navigate = useNavigate();
	const { pathname, search } = useLocation();
	const handlePageChange = (
		_: React.ChangeEvent<unknown>,
		page: number
	): void => {
		const params = new URLSearchParams(search);

		if (params.has("page")) {
			params.set("page", page.toString());
		} else {
			params.append("page", page.toString());
		}

		navigate(pathname + "?" + params.toString());
		window.scrollTo(0, 0); // scroll to the top of the page
	};
	return { handlePageChange };
}
export default usePagination;
