import PersonKnowfor from "@/components/People/PersonKnowfor";
import PersonBio from "@/components/People/PersonBio";
import PersonInfo from "@/components/People/PersonInfo";

import { LoaderFunction, useLoaderData } from "react-router";
import { PersonMultiFetchResponse, baseImgUrl } from "@/utils/types";
import fetchPeopleMulti from "@/api/fetchPeopleMulti";
import { Divider } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export const loader: LoaderFunction = async ({
	params,
}): Promise<PersonMultiFetchResponse | null> => {
	const { id } = params;
	try {
		const res = await fetchPeopleMulti({ id });
		return res;
	} catch (error) {
		console.log(error);
		return null;
	}
};

function SinglePerson() {
	const data = useLoaderData() as PersonMultiFetchResponse;
	//	console.log(data);
	const {
		name,
		profile_path,
		homepage,
		known_for_department: known_for,
		gender,
		birthday,
		place_of_birth,
		also_known_as,
		biography,
		combined_credits: credits,
		images,
	} = data;
	return (
		<div className="p-8 text-center mx-auto ">
			<h1 className="font-bold text-3xl mb-8">{name}</h1>
			<Divider className="mb-4" />
			<div className="grid grid-cols-1 md:grid-cols-3 gap-x-4">
				<div className="mt-8 md:col-span-1 ">
					<PersonInfo
						img={profile_path}
						name={name}
						homepage={homepage}
						known_for={known_for}
						gender={gender}
						birthday={birthday}
						place_of_birth={place_of_birth}
						also_know_as={also_known_as}
					/>
				</div>
				<Divider className="sm:hidden my-8" />
				<div className="md:col-span-2">
					<PersonBio biography={biography} />
					<Divider className="sm:hidden my-8" />
					<PersonKnowfor known_for={known_for} credits={credits} />
					<Divider className=" my-8" />
					<h2 className="font-semibold text-2xl">Personal Images</h2>
					{images.profiles.length > 0 ? (
						<ImageList
							cols={3}
							rowHeight={220}
							className="mx-auto mt-8 lg:w-[500px] md:w-[470px] h-[500px] sm:w-[500px] w-[300px]">
							{images.profiles.map(item => {
								const { file_path } = item;
								return (
									<ImageListItem key={file_path}>
										<a
											href={`${baseImgUrl}/original/${file_path}`}
											className="block"
											target="_blank">
											<img
												srcSet={`${baseImgUrl}/original/${file_path}`}
												src={`${baseImgUrl}/original/${file_path}`}
												alt={name}
												loading="lazy"
											/>
										</a>
									</ImageListItem>
								);
							})}
						</ImageList>
					) : (
						<p className="mt-4">None Images Available Yet</p>
					)}
				</div>
			</div>
		</div>
	);
}
export default SinglePerson;
