import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
//import type { RootState } from "../../app/store";

interface UserState {
	username: string | null;
}

const getUsernameFromLocalStorage = (): string | null => {
	const user = localStorage.getItem("userInfo");
	if (user) {
		return JSON.parse(user).username;
	}
	return null;
};

const initialState: UserState = {
	username: getUsernameFromLocalStorage(),
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		login(state, action: PayloadAction<{ username: string; id: string }>) {
			if (action.payload.username) {
				state.username = action.payload.username;
				const userInfo = {
					username: action.payload.username,
					id: action.payload.id,
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
