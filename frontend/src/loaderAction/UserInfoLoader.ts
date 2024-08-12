import { login } from "@/feature/User/userSlice";
import { store } from "@/store";
import { LoaderFunction } from "react-router";
import { customFetch } from "@/api/customFetch";
import { UserInfoType } from "@/utils/types";
export const UserInfoLoader: LoaderFunction = async (): Promise<
	UserInfoType | null | Response
> => {
	try {
		const res = await customFetch("/user/userInfo");
		//console.log(res.data);

		store.dispatch(
			login({ username: res.data.userInfo.name, exp: res.data.userInfo.exp })
		);
		return res.data.userInfo;
	} catch (err) {
		//	console.log(err);
		return null;
	}
};
