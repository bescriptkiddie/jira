import { Table, TableProps } from "antd"
import React from "react"
import { Users, Projects } from "screens/project-list/index"
import dayjs from "dayjs"

interface ListProps extends TableProps<Projects> {
  users: Users[]
}

export const List = ({ users, ...props }: ListProps) => {
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
          render: (projects: Projects) => {
            return (
              <span>
                {users.find((user: Users) => user.id === projects.personId)?.name || "无"}
              </span>
            )
          },
        },
        {
          title: "创建事件",
          key: "created",
          render: (projects: Projects) => {
            return (
              <span>{projects.created ? dayjs(projects.created).format("YYYY-MM-DD") : "无"}</span>
            )
          },
        },
      ]}
      {...props}
    ></Table>
  )
}
