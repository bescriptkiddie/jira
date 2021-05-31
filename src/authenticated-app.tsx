import { ProjectList } from "screens/project-list"
import { Projects } from "screens/project"
import { useAuth } from "context/auth-context"
import styled from "@emotion/styled"
import { Row } from "components/lib"
import { ReactComponent as SoftWareLogo } from "assets/software-logo.svg"
import { Button, Dropdown, Menu } from "antd"
import { BrowserRouter as Router } from "react-router-dom"
import { Navigate, Route, Routes } from "react-router"
import { resetRoute } from "utils"
import { ProjectModal } from "components/project-modal"
import { ProjectPopover } from "components/project-popover"

export const AuthenticationApp = () => {
  // const [projectModalOpen, setProjectModalOpen] = useState(false)
  return (
    <Container>
      <HeaderPage />
      <Main>
        <Router>
          <Routes>
            <Route path="/projects" element={<ProjectList />} />
            <Route path="/projects/:projectId/*" element={<Projects />} />
            <Navigate to={`/projects`} />
          </Routes>
        </Router>
      </Main>
      <ProjectModal />
    </Container>
  )
}

const HeaderPage = () => {
  const { logout, user } = useAuth()
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <Button type="link" onClick={resetRoute}>
          <SoftWareLogo width="18rem" color="rgb(38,132,255)" />
        </Button>
        <ProjectPopover />
        <h2>用户</h2>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key={"layout"}>
                <span onClick={logout}>登出</span>
              </Menu.Item>
            </Menu>
          }
        >
          <span onClick={e => e.preventDefault()}>Hi,{user?.name}</span>
        </Dropdown>
        {/* <button onClick={logout}>登出</button> */}
      </HeaderRight>
    </Header>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`

const Main = styled.main`
  height: calc(100vh - 6rem);
`
// const Header = styled.header`
//   display: flex;
//   justify-content: space-between;
// `
const Header = styled(Row)`
  padding: 3.2rem;
`
const HeaderLeft = styled(Row)``
const HeaderRight = styled.div`
  display: flex;
  align-items: center;
`
