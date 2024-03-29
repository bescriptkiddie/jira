import React from "react"
import { Button, Drawer } from "antd"
import { useProjectModal } from "screens/project-list/util"

export const ProjectModal = () => {
  const { close, projectModalOpen } = useProjectModal()
  return (
    <Drawer visible={projectModalOpen} onClose={close} width={"100%"}>
      <h1>Project Modal</h1>
      <Button onClick={close}>关闭</Button>
    </Drawer>
  )
}
