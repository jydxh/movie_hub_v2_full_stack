import { ActionFunction, json } from "react-router";
import { customFetch } from "@/api/customFetch";
import { UserAvatarAction } from "@/utils/types";
import { store } from "@/store";
import { login } from "@/feature/User/userSlice";
import { AxiosError } from "axios";
export const UserInfoAction: ActionFunction = async ({
	request,
}): Promise<Response> => {
	const formDataRaw = await request.formData();
	const formData = Object.fromEntries(formDataRaw);
	const actionType = formDataRaw.get("actionType");
	if (actionType === "updateUserInfo") {
		try {
			const res = await customFetch.post("/user/userInfo", formData);
			//console.log(res.data);
			store.dispatch(
				login({ username: res.data.userInfo.name, exp: res.data.userInfo.exp })
			);
			return json({ status: 200, msg: "Profile updated successfully!" });
		} catch (err) {
			const error = err as AxiosError<{ msg: string }>;
			return json({ status: 400, msg: error.response?.data.msg || "" });
		}
	} else if (actionType === "uploadAvatar") {
		try {
			//console.log(formData);
			const res = await customFetch.post<UserAvatarAction>(
				"/user/uploadAvatar",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data", //this is important!
					},
				}
			);
			//console.log(res.data);
			return json({
				status: 200,
				src: res.data.image.src,
				msg: "Avatar updated successfully!",
			});
		} catch (err) {
			//console.log(err);
			return json({});
		}
	} else if (actionType === "updatePassword") {
		delete formData.actionType;
		const regExp = new RegExp("^[a-zA-Z0-9]{6,20}$");
		//console.log(formData);
		const { newPassword, repeat_password } = formData;
		let counter = 0;
		for (const i in formData) {
			if (!regExp.test(formData[i] as string)) {
				counter++;
			}
		}
		if (counter > 0) {
			return json({
				status: 401,
				msg: "passwords do not match request, should be 6 to 20 char and alphanumeric characters ",
			});
		}
		if (newPassword !== repeat_password) {
			return json({
				status: 401,
				msg: "passwords are not same, please check and try again",
			});
		}
		try {
			const res = await customFetch.post<{ msg: string }>(
				"/auth/resetPwd",
				formData
			);
			//console.log(res.data.msg);
			return json({ status: 201, msg: res.data.msg });
		} catch (err) {
			const error = err as AxiosError<{ msg: string | null }>;
			console.log(err);
			return json({ status: 401, msg: error.response?.data.msg });
		}
	}
	return json({ status: 500, msg: "server error" });
};
