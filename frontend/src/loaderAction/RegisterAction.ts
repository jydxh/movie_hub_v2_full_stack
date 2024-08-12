import { ActionFunction, json } from "react-router-dom";
import axios from "axios";
import { AxiosError, AxiosResponse } from "axios";

export const RegisterAction: ActionFunction = async ({
	request,
}): Promise<Response> => {
	const formRawData = await request.formData();
	const formData = Object.fromEntries(formRawData);

	try {
		const res: AxiosResponse<{ name: string; id: string; email: string }> =
			await axios.post("/api/v1/auth/register", formData);
		return json({
			msg: `Registration success, please visit your email: ${res.data.email} to confirm your email address!`,
			status: 200,
		});
	} catch (err) {
		console.log(err);
		const error = err as AxiosError<{
			msg: string;
		}>;
		const msg = error.response?.data.msg;
		return json({ msg, status: 500 });
	}
};
