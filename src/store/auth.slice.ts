import { Users } from "screens/project-list"
import { createSlice } from "@reduxjs/toolkit"
import { AppDispatch, RootState } from "store"
import { AuthForm } from "context/auth-context"
import * as auth from "auth-provider"
import { initUser } from "context/auth-context"

interface State {
  user: Users | null
}

const initialState: State = {
  user: null,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload
    },
  },
})

const { setUser } = authSlice.actions

export const selectUser = (state: RootState) => state.auth.user

// 一个 thunk 是两层函数
export const login = (from: AuthForm) => (dispatch: AppDispatch) =>
  auth.login(from).then(user => dispatch(setUser(user)))
export const register = (from: AuthForm) => (dispatch: AppDispatch) =>
  auth.register(from).then(user => dispatch(setUser(user)))
export const logout = () => (dispatch: AppDispatch) =>
  auth.logout().then(() => dispatch(setUser(null)))
export const init = () => (dispatch: AppDispatch) =>
  initUser().then(user => dispatch(setUser(user)))
