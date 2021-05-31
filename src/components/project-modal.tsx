import React from "react"
import { Button, Drawer } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { projectListActions, selectProjectModalOpen } from "screens/project-list/project-list.slice"

export const ProjectModal = () => {
  const dispatch = useDispatch()
  // useSelect 是读总的状态树的一个状态的
  const projectModalOpen = useSelector(selectProjectModalOpen)
  return (
    <Drawer
      onClose={() => dispatch(projectListActions.closeProjectModel())}
      visible={projectModalOpen}
      width={"100%"}
    >
      <h1>Project Modal</h1>
      <Button onClick={() => dispatch(projectListActions.closeProjectModel())}>关闭</Button>
    </Drawer>
  )
}
