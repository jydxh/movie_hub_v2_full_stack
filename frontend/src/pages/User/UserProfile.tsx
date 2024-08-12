import { Divider } from "@mui/material";
import { store } from "@/store";

import UserAvatar from "@/components/User/UserAvatar";
import UserInfo from "@/components/User/UserInfo";
import UserAccount from "@/components/User/UserAccount";

import { useLoaderData } from "react-router";

import { UserInfoType } from "@/utils/types";

const formInput = ["name", "email", "city", "country"];

function UserProfile() {
	const username = store.getState().user.username;
	const data = useLoaderData() as UserInfoType;
	return (
		<section className="bg-gradient-to-r from-indigo-700 from-10% via-sky-700 via-30% to-emerald-700 to-90% pb-2">
			<div
				className="flex flex-col justify-center items-center text-center
       py-8">
				<UserAvatar name={username} avatar={data.avatar} />
			</div>
			<Divider variant="middle" className="bg-slate-500 mb-4" />
			<UserInfo formInput={formInput} data={data} />
			<Divider variant="middle" className="bg-slate-500 mb-4" />
			<UserAccount />
		</section>
	);
}
export default UserProfile;
