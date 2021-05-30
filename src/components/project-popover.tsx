import styled from "@emotion/styled"
import { Popover, Typography, List, Divider } from "antd"
import { useProjects } from "utils/project"
import { ButtonNoPadding } from "./lib"

export const ProjectPopover = (props: { setProjectModalOpen: (isOpen: boolean) => void }) => {
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
      <ButtonNoPadding type={"link"} onClick={() => props.setProjectModalOpen(true)}>
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
