import React from "react"
import { Users, Lists } from "screens/project-list/index"

interface ListProps {
    lists: Lists[]
    users: Users[]
}
export const List = (props: ListProps) => {
    const { users, lists } = props
    return (
        <table>
            <thead>
                <tr>
                    <th>名称</th>
                    <th>负责人</th>
                </tr>
            </thead>
            <tbody>
                {lists?.map((project: any) => (
                    <tr key={project.id}>
                        <td>{project.name}</td>
                        <td>
                            {users.find((user: any) => user.id === project.personId)?.name ||
                                "没有"}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
