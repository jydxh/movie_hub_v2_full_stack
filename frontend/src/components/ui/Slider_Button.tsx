import { SelectedOption } from "./SlidersWrapper";
interface Slider_ButtonProps {
	isLoading: boolean;
	options: SelectedOption[];
	selectedOption: SelectedOption;
	setSelectedOption: (op: SelectedOption) => void;
}

const buttonClass =
	"px-4 rounded-full py-1 transition  duration-500 ease-in-out capitalize";

function Slider_Button({
	isLoading,
	options,
	selectedOption,
	setSelectedOption,
}: Slider_ButtonProps) {
	const handleClick = (op: SelectedOption) => {
		setSelectedOption(op);
	};
	return (
		<div className="rounded-full border  ">
			{options.map(op => {
				const { title } = op;
				return (
					<button
						disabled={isLoading}
						onClick={() => handleClick(op)}
						key={title}
						className={`${buttonClass} ${
							title === selectedOption.title ? "bg-sky-600/80 " : ""
						} `}>
						{title}
					</button>
				);
			})}
		</div>
	);
}
export default Slider_Button;
