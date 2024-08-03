import formateDate from "@/utils/formateDate";
import { baseImgUrl } from "@/utils/types";
import LinkIcon from "@mui/icons-material/Link";

function PersonInfo({
	img,
	name,
	homepage,
	known_for,
	gender,
	birthday,
	place_of_birth,
	also_know_as,
}: {
	img: string;
	name: string;
	homepage: string;
	known_for: string;
	gender: number;
	birthday: string;
	place_of_birth: string;
	also_know_as: string[];
}) {
	const personInfo = [
		{ title: "Know For", name: known_for },
		{ title: "Known Credits", name: Math.floor(Math.random() * 100) },
		{ title: "Gender", name: gender === 1 ? "Female" : "Male" },
		{ title: "Birthday", name: formateDate(birthday) },
		{ title: "Place of Birth", name: place_of_birth },
		{ title: "Also Known As", name: also_know_as },
	];
	return (
		<section className="mx-auto w-full">
			<img
				src={`${baseImgUrl}/w600_and_h900_bestv2/${img}`}
				alt={name}
				className="w-[18rem] rounded-lg mx-auto"
			/>
			<a
				className="block my-2"
				href={homepage}
				target="_blank"
				rel="noopener noreferrer">
				<LinkIcon fontSize="large" />
			</a>
			<h3 className="font-bold text-xl">Personal Info</h3>

			{personInfo.map((info, index) => {
				if (index < personInfo.length - 2) {
					return (
						<div key={info.title} className="mt-2 mb-6">
							<p className="font-semibold ">{info.title}</p>
							<p>{info.name}</p>
						</div>
					);
				} else if (index === personInfo.length - 1) {
					return (
						<div key={info.title} className="mt-2 mb-6">
							<p className="font-semibold ">Also known as</p>
							<ul>
								{also_know_as.map((name, index) => (
									<li key={name + index} className="mb-4">
										{name}
									</li>
								))}
							</ul>
						</div>
					);
				}
			})}
		</section>
	);
}
export default PersonInfo;
