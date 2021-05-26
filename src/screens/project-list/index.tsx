import { SearchPanel } from "./search-panel"
import { List } from "./list"
import React, { useState } from "react"
import { useDebounce, useDocumentTitle } from "utils"
import styled from "@emotion/styled"
import { useProjects } from "utils/project"
import { useUsers } from "utils/user"
import { Typography } from "antd"
import { useUrlQueryParams } from "utils/url"

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
  const [param, setParam] = useUrlQueryParams(["name", "personId"])
  // 这里的时候,更多地希望,传入的是固定的键值  -> 所以需要对 useUrlQueryParams 进行约束
  // setParam({ username: "pika" })
  const debounceParam: any = useDebounce(param, 200)
  const { isLoading, error, data: projects } = useProjects(debounceParam)
  const { data: users } = useUsers()

  useDocumentTitle("项目管理")
  return (
    <Container>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? <Typography.Text type="danger">{error.message}</Typography.Text> : null}
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
