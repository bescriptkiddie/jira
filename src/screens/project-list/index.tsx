import { SearchPanel } from "./search-panel"
import { List } from "./list"
import React, { useState } from "react"
import { useDebounce } from "utils"
import styled from "@emotion/styled"
import { useProjects } from "utils/project"
import { useUsers } from "utils/user"
import { Typography } from "antd"

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
}

export const ProjectList = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  })
  const debounceParam: any = useDebounce(param, 200)
  const { isLoading, error, data: projects } = useProjects(debounceParam)
  const { data: users } = useUsers()

  return (
    <Container>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? <Typography.Text type="danger">{error.message}</Typography.Text> : null}
      <List loading={isLoading} users={users || []} dataSource={projects || []} />
    </Container>
  )
}

const Container = styled.div`
  padding: 3.2rem;
`
