import { Divider } from "@mui/material";
import { store } from "@/store";
import UserAvatar from "@/components/User/UserAvatar";
import UserInfo from "@/components/User/UserInfo";
import { ActionFunction, LoaderFunction, useLoaderData } from "react-router";
import { customFetch } from "@/api/customFetch";
import { UserInfoType } from "@/utils/types";
const formInput = ["name", "email", "city", "country"];

export const loader: LoaderFunction =
	async (): Promise<UserInfoType | null> => {
		try {
			const res = await customFetch("/user/userInfo");
			//console.log(res.data);

			return res.data.userInfo;
		} catch (err) {
			console.log(err);
			return null;
		}
	};
export const action: ActionFunction = async ({ request }) => {
	const formDataRaw = await request.formData();
	const formData = Object.fromEntries(formDataRaw);
	console.log(formData);
	return null;
};
function UserProfile() {
	const username = store.getState().user.username;
	const data = useLoaderData() as UserInfoType;
	return (
		<section className="bg-gradient-to-r from-indigo-700 from-10% via-sky-700 via-30% to-emerald-700 to-90%">
			<div
				className="flex flex-col justify-center items-center text-center
       py-8">
				<UserAvatar name={username} />
			</div>
			<Divider variant="middle" className="bg-slate-500 mb-4" />
			<UserInfo formInput={formInput} data={data} />
		</section>
	);
}
export default UserProfile;
