import React from "react";

function SelectableButton({
	children,
	onClick,
	id,
	genres,
}: {
	children: React.ReactNode;
	onClick: (id: number) => void;
	id: number;
	genres: number[];
}) {
	const handleClick = () => {
		onClick(id);
	};

	return (
		<button
			type="button"
			className={`${
				genres.includes(id) ? "bg-teal-500 border-teal-500" : ""
			} hover:bg-teal-500 hover:border-teal-500 rounded-full border  px-3 py-1`}
			onClick={handleClick}>
			{children}
		</button>
	);
}
export default SelectableButton;
