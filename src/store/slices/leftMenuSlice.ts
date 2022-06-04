import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { LeftMenuState } from "../../types/leftMenu"

const initialState: LeftMenuState = {
  visibility: false,
}

export const LeftMenuSlice = createSlice({
  name: "leftMenu",
  initialState,
  reducers: {
    setMenuVisibility: (state, action: PayloadAction<boolean>) => {
      state.visibility = action.payload
    },
  },
})

export const { setMenuVisibility } = LeftMenuSlice.actions

export default LeftMenuSlice.reducer
