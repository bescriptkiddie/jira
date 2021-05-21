import { SearchPanel } from "./search-panel"
import { List } from "./list"
import React, { useEffect, useState } from "react"
import { useMount, useDebounce, cleanObject } from "utils"
import { useHttp } from "utils/http"

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
  const debounceParam = useDebounce(param, 2000)
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
    client("projects", { data: cleanObject(debounceParam as object) }).then(setList)
  }, [debounceParam])

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List lists={lists} users={users} />
    </div>
  )
}
