import { SearchPanel } from "./search-panel"
import { List } from "./list"
import { useDebounce, useDocumentTitle } from "utils"
import styled from "@emotion/styled"
import { useProjects } from "utils/project"
import { useUsers } from "utils/user"
import { Typography, Divider, Button } from "antd"
import { useProjectsParams } from "./util"
import { Row } from "components/lib"
import { useDispatch } from "react-redux"
import { projectListActions } from "screens/project-list/project-list.slice"

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

  const dispatch = useDispatch()
  const [param, setParam] = useProjectsParams()
  const { isLoading, error, data: projects } = useProjects(useDebounce(param, 200))
  const { data: users } = useUsers()

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <Button onClick={() => dispatch(projectListActions.openProjectModel())}>创建项目</Button>
      </Row>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? <Typography.Text type="danger">{error.message}</Typography.Text> : null}
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
