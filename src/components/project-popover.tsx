import styled from "@emotion/styled"
import { Popover, Typography, List, Divider } from "antd"
import { useProjects } from "utils/project"
import { ButtonNoPadding } from "./lib"
import { useDispatch } from "react-redux"
import { projectListActions } from "screens/project-list/project-list.slice"

export const ProjectPopover = () => {
  const dispatch = useDispatch()
  const { data: projects, isLoading } = useProjects()
  const pinnedProject = projects?.filter(project => project.pin)

  const content = (
    <ContentContainer>
      <Typography.Text type="secondary">收藏项目</Typography.Text>
      <List>
        {pinnedProject?.map(project => (
          <List key={project.id}>
            <List.Item>
              <List.Item.Meta title={project.name} />
            </List.Item>
          </List>
        ))}
      </List>
      <Divider />
      <ButtonNoPadding
        loading={isLoading}
        type={"link"}
        onClick={() => dispatch(projectListActions.openProjectModel())}
      >
        创建项目
      </ButtonNoPadding>
    </ContentContainer>
  )
  return (
    <Popover placement={"bottom"} content={content}>
      <h2>项目</h2>
    </Popover>
  )
}

const ContentContainer = styled.div`
  min-width: 30rem;
`
