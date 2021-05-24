import { SearchPanel } from "./search-panel"
import { List } from "./list"
import React, { useEffect, useState } from "react"
import { useMount, useDebounce, cleanObject } from "utils"
import { useHttp } from "utils/http"
import styled from "@emotion/styled"

export interface Users {
  name: string
  id: number
  token: string
}

export interface Lists {
  id: number
  name: string
  personId: number
  organization: string
  created: number
}

export const ProjectList = () => {
  const [users, setUser] = useState<Users[]>([])
  const [lists, setList] = useState<Lists[]>([])
  const [param, setParam] = useState({
    name: "",
    personId: "",
  })
  const debounceParam: any = useDebounce(param, 2000)
  const client = useHttp()

  // 请求接口
  useMount(() => {
    client("users").then(setUser)
    // console.log(`${apiUrl}/users`)
    // fetch(`${apiUrl}/users`).then(async response => {
    //   if (response.ok) {
    //     setUser(await response.json())
    //   }
    // })
  })

  useEffect(() => {
    client("projects", { data: cleanObject(debounceParam) }).then(setList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceParam])

  return (
    <Container>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List lists={lists} users={users} />
    </Container>
  )
}

const Container = styled.div`
  padding: 3.2rem;
`
