import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    isAuthenticated : false

}

const authSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        setAuthentication : (state, action) => {
        state.isAuthenticated = action.payload
        }
    }
})


export const {setAuthentication} = authSlice.actions
export default authSlice.reducer