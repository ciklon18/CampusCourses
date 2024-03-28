import { createSlice } from "@reduxjs/toolkit";
import { GroupState } from "./types";



const initialState: GroupState = {
    groups: []
};

const groupsSlice = createSlice({
    name: "groups",
    initialState,
    reducers: {
        setGroups: (state, action) => {
            state.groups = action.payload;
        },
        getGroupById: (state, action) => {
            state.groups.find((group) => group.id === action.payload);
        }
    },
});

export const { setGroups, getGroupById } = groupsSlice.actions;
export default groupsSlice.reducer;