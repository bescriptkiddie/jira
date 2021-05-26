import { Table, TableProps } from "antd"
import React from "react"
import { Users, Projects } from "screens/project-list/index"
import dayjs from "dayjs"
import { Link } from "react-router-dom"

interface ListProps extends TableProps<Projects> {
  users: Users[]
}

export const List = ({ users, ...props }: ListProps) => {
  return (
    <Table
      rowKey={"id"}
      pagination={false}
      columns={[
        {
          title: "名称",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render: (projects: Projects) => {
            return <Link to={String(projects.id)}>{projects.name}</Link>
          },
        },
        {
          title: "部门",
          key: "organization",
          dataIndex: "organization",
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
          title: "创建时间",
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
