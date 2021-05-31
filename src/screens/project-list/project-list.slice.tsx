import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "store"
interface State {
  projectModalOpen: boolean
}

const initialState: State = {
  projectModalOpen: false,
}

export const projectListSlice = createSlice({
  name: "projectListSlice",
  initialState,
  reducers: {
    // 这里可以这样写是因为 toolkit 底层用了 immer 对不可变数据进行了封装
    // 可是在原则上是不允许这样写的, redux需要是一个纯函数
    openProjectModel(state) {
      state.projectModalOpen = true
    },
    closeProjectModel(state) {
      state.projectModalOpen = false
    },
  },
})

export const projectListActions = projectListSlice.actions

export const selectProjectModalOpen = (state: RootState) => state.boardList.projectModalOpen
