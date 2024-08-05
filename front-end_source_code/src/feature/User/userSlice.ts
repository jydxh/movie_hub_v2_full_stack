import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
//import type { RootState } from "../../app/store";

interface UserState {
	username: string | null;
	exp: string | null;
}

const getUsernameFromLocalStorage = (): {
	username: string | null;
	exp: string | null;
} => {
	const user = localStorage.getItem("userInfo");
	if (user) {
		return JSON.parse(user) as { username: string; exp: string };
	}
	return { username: null, exp: null };
};

const initialState: UserState = getUsernameFromLocalStorage();

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		login(
			state,
			action: PayloadAction<{ username: string; id: string; exp: string }>
		) {
			if (action.payload.username && action.payload.exp) {
				state.username = action.payload.username;
				state.exp = action.payload.exp;
				const userInfo = {
					username: action.payload.username,
					exp: action.payload.exp,
				};
				localStorage.setItem("userInfo", JSON.stringify(userInfo));
			}
		},
		logout(state) {
			state.username = null;
			localStorage.removeItem("userInfo");
		},
	},
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
