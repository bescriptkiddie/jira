import { SearchPanel } from "./search-panel"
import { List } from "./list"
import React, { useEffect, useState } from "react"
import { cleanObject } from "utils"
import * as qs from "qs"
import { useMount, useDebounce } from "utils"

const apiUrl = process.env.REACT_APP_API_URL

export interface Users {
    name: string
    id: number
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

    // 请求接口
    useMount(() => {
        console.log(`${apiUrl}/users`)
        fetch(`${apiUrl}/users`).then(async response => {
            if (response.ok) {
                setUser(await response.json())
            }
        })
    })

    useEffect(() => {
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`).then(
            async response => {
                if (response.ok) {
                    setList(await response.json())
                }
            }
        )
    }, [debounceParam])

    return (
        <div>
            <SearchPanel param={param} setParam={setParam} users={users} />
            <List lists={lists} users={users} />
        </div>
    )
}
