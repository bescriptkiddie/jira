import React from "react"
import { Routes, Route, Navigate } from "react-router"
import { Link } from "react-router-dom"
import { Board } from "screens/board"
import { Group } from "screens/group"

export const Projects = () => {
  return (
    <div>
      <h1>Project</h1>
      <Link to="board">看板</Link>
      <Link to="group">任务组</Link>
      <Routes>
        <Route path="/board" element={<Board />} />
        <Route path="/group" element={<Group />} />
        <Navigate to={window.location.pathname + `/board`} />
      </Routes>
    </div>
  )
}
