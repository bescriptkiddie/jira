import { SearchPanel } from "./search-panel"
import { List } from "./list"
import { useDebounce, useDocumentTitle } from "utils"
import styled from "@emotion/styled"
import { useProjects } from "utils/project"
import { useUsers } from "utils/user"
import { Divider, Button } from "antd"
import { useProjectModal, useProjectsParams } from "./util"
import { Row, ErrorBox } from "components/lib"

export interface Users {
  name: string
  id: number
  token: string
}

export interface Projects {
  id: number
  name: string
  personId: number
  organization: string
  created: number
  pin: boolean
}

export const ProjectList = () => {
  useDocumentTitle("项目管理")

  const [param, setParam] = useProjectsParams()
  const { isLoading, error, data: projects } = useProjects(useDebounce(param, 200))
  const { data: users } = useUsers()
  const { open } = useProjectModal()
  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <Button onClick={open}>创建项目</Button>
      </Row>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      <ErrorBox error={error} />
      <Divider />
      <List loading={isLoading} users={users || []} dataSource={projects || []} />
    </Container>
  )
}

ProjectList.whyDidYouRender = false

// class ProjectList extends React.Component {
//   static whyDidYouRender = true
// }

const Container = styled.div`
  padding: 3.2rem;
`
