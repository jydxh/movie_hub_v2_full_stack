function RatingCircle({
	value,
	className,
	fontSize = "small",
}: {
	value: number;
	className?: string;
	fontSize?: "small" | "medium" | "large";
}) {
	const percentage = Math.floor(value * 10);
	const degree = (percentage / 100) * 360;
	return (
		<>
			<div
				style={{
					background: `conic-gradient(${
						percentage > 70
							? "#10B981"
							: percentage >= 60
							? " orange"
							: "#EF4444 "
					} ${degree}deg, gray ${degree}deg 360deg)`,
				}}
				className={`${className} border-2 border-gray-500 grid place-items-center rounded-full w-[2.4rem] h-[2.4rem] relative -top-[1rem] left-[1rem] z-10  `}>
				<div
					className={`${fontSize === "small" ? "text-xs " : ""} ${
						fontSize === "medium" ? "text-sm " : ""
					} ${
						fontSize === "large" ? "text-lg " : ""
					} z-20  bg-gray-500 w-[80%] h-[80%] rounded-full flex justify-center items-center`}>
					{percentage}
					<span style={{ fontSize: "6px" }}>%</span>
				</div>
			</div>
		</>
	);
}
export default RatingCircle;
