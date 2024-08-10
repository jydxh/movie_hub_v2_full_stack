import { AxiosError } from "axios";
import { customFetch } from "./customFetch";

async function deleteAccount(): Promise<{ msg: string }> {
	try {
		const res = await customFetch.delete<{ msg: string }>("/user");
		console.log(res.data);
		return res.data;
	} catch (err) {
		const error = err as AxiosError<{ msg: string }>;
		return error.response!.data;
	}
}
export default deleteAccount;
