import { Dropdown, Menu, Table, TableProps } from "antd"
import { Users, Projects } from "screens/project-list/index"
import dayjs from "dayjs"
import { Link } from "react-router-dom"
import { Star } from "components/stars"
import { useEditProject } from "utils/project"
import { useProjectModal } from "./util"
import React from "react"
import { ButtonNoPadding } from "components/lib"

interface ListProps extends TableProps<Projects> {
  users: Users[]
}

export const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject()
  const starProject = (id: number) => (pin: boolean) => {
    mutate({ id, pin })
  }
  const { startEdit, open } = useProjectModal()
  return (
    <Table
      rowKey={"id"}
      pagination={false}
      columns={[
        {
          title: <Star checked={true} disabled={true} />,
          render: (projects: Projects) => {
            return <Star checked={projects.pin} onCheckChange={starProject(projects.id)} />
          },
        },
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
        {
          title: "操作",
          render: (project: Projects) => {
            return (
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key={"layout"} style={{ display: "block" }}>
                      <ButtonNoPadding onClick={() => startEdit(project.id)}>编辑</ButtonNoPadding>
                      <ButtonNoPadding onClick={open}>新增</ButtonNoPadding>
                    </Menu.Item>
                  </Menu>
                }
              >
                <span>...</span>
              </Dropdown>
            )
          },
        },
      ]}
      {...props}
    ></Table>
  )
}
