import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
//import type { RootState } from "../../app/store";

interface UserState {
	username: string | null;
}

const initialState: UserState = {
	username: null,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		login(
			state,
			action: PayloadAction<{ username: string; password: string }>
		) {
			if (action.payload.username) state.username = action.payload.username;
		},
		logout(state) {
			state.username = null;
		},
	},
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
