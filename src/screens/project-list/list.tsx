import { Table } from "antd"
import React from "react"
import { Users, Lists } from "screens/project-list/index"
import dayjs from "dayjs"

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
          key: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "部门",
          dataIndex: "organization",
          key: "organization",
        },
        {
          title: "负责人",
          key: "personId",
          render: (lists: Lists) => {
            return (
              <span>{users.find((user: Users) => user.id === lists.personId)?.name || "无"}</span>
            )
          },
        },
        {
          title: "创建事件",
          key: "created",
          render: (lists: Lists) => {
            return <span>{lists.created ? dayjs(lists.created).format("YYYY-MM-DD") : "无"}</span>
          },
        },
      ]}
      dataSource={lists}
    ></Table>
  )
}
