import React from "react"
import { ProjectList } from "screens/project-list"
import { useAuth } from "context/auth-context"
import styled from "@emotion/styled"
import { Row } from "components/lib"

export const AuthenticationApp = () => {
  const { logout } = useAuth()
  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <h2>Logo</h2>
          <h2>项目</h2>
          <h2>用户</h2>
        </HeaderLeft>
        <HeaderRight>
          <button onClick={logout}>登出</button>
        </HeaderRight>
      </Header>

      <Main>
        <ProjectList />
      </Main>
    </Container>
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
const Header = styled(Row)``
const HeaderLeft = styled(Row)``
const HeaderRight = styled.div`
  display: flex;
  align-items: center;
`
