import { customFetch } from "@/api/customFetch";
import { AxiosError } from "axios";
import { ActionFunction, json } from "react-router-dom";

export const ResetPwdAction: ActionFunction = async ({
	request,
}): Promise<Response> => {
	const formDataRaw = await request.formData();
	const formData = Object.fromEntries(formDataRaw);

	const urlSearchParams = Object.fromEntries(new URL(request.url).searchParams);
	const data = { ...formData, ...urlSearchParams };

	try {
		const res = await customFetch.post<{ msg: string }>(
			"/auth/verify-resetPwd",
			data
		);
		console.log(res.data);
		return json({ status: 200, msg: res.data.msg });
	} catch (err) {
		const error = err as AxiosError<{ msg: string }>;
		console.log(error);
		return json({ status: 400, msg: error.response?.data.msg });
	}
};
