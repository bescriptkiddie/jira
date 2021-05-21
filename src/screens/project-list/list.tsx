import { Table } from "antd"
import React from "react"
import { Users, Lists } from "screens/project-list/index"

interface ListProps {
  lists: Lists[]
  users: Users[]
}

export const List = (props: ListProps) => {
  const { users, lists } = props
  console.log("users", users, "lists", lists)
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: "名称",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "负责人",
          render: (lists: Lists) => {
            return (
              <span>{users.find((user: Users) => user.id === lists.personId)?.name || "没有"}</span>
            )
          },
        },
      ]}
      dataSource={lists}
    ></Table>
  )
}
